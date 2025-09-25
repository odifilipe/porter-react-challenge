import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { userService } from "../services/useService";
import { formatUser, filterUsersBySearch, filterFavoriteUsers } from "../utils/userUtils";

const useUserStore = create()(
    devtools(
        persist(
            (set, get) => ({
                // Estado inicial
                users: [],
                filteredUsers: [],
                favorites: [],
                loading: false,
                error: null,
                searchTerm: '',
                showFavoritesOnly: false,
                currentPage: 1,
                selectedUser: null,
                hasMore: true,

                // ------- Ações Principais ------- //
                /**
                 * Buscar usuários da API
                 * @param {number} page - Página a carregar
                 * @param {boolean} replace - substituir dados existentes?
                 * **/
                fetchUsers: async (page = 1, replace = false) => {
                    const { users, favorites } = get();

                    set({ loading: true, error: null });

                    try {
                        const result = await userService.getUsers(page);

                        if (result.success) {
                            //Formatar usuários e marcar favoritos
                            const formattedUsers = result.users.map(user => {
                                const formatted = formatUser(user);
                                return { ...formatted, isFavorite: favorites.includes(formatted.id) }
                            });                            

                            // Nova lista de usuários
                            const newUsers = replace || page === 1
                                ? formattedUsers
                                : [...users, ...formattedUsers];

                            set({
                                users: newUsers,
                                currentPage: page,
                                loading: false,
                                hasMore: result.info.page < result.info.results // Simular hasMore
                            });

                            // Aplicar filtros automaticamente
                            get().applyFilters();
                        } else {
                            set({ error: result.error, loading: false });
                        }
                    } catch (error) {
                        console.error('Erro no store:', error);

                        set({ error: 'Erro inesperado ao carregar usuários', loading: false });
                    }
                },

                /**
                 * Aplicar filtros aos usuários
                 */
                applyFilters: () => {
                    const { users, searchTerm, showFavoritesOnly } = get();
                    let filtered = users;

                    // Aplicar filtro de busca
                    if (searchTerm.trim()) {
                        filtered = filterUsersBySearch(filtered, searchTerm);
                    }

                    // Aplicar filtro de favoritos
                    if (showFavoritesOnly) {
                        filtered = filterFavoriteUsers(filtered);
                    }

                    set({ filteredUsers: filtered });
                },

                // Ações de busca
                /**
                 * Define o termo da busca
                 * @param {string} term - Termo da busca
                 * **/
                setSearchTerm: (term) => {
                    set({ searchTerm: term });
                    get().applyFilters();
                },

                /**
                 * Limpar Busca
                 * **/
                clearSearch: () => {
                    set({ searchTerm: '' });
                    get().applyFilters();
                },

                // ------- Ações de Favoritos ------- //
                /**
                 * Alternar filtro de favoritos
                 * **/
                toggleFavoritesFilter: () => {
                    set({ showFavoritesOnly: !get().showFavoritesOnly });
                    get().applyFilters();
                },
                /**
                 * Alternar status de favorito
                 * @param {string} userId - ID do usuário
                 * **/
                toggleFavorite: (userId) => {
                    const { favorites, users } = get();

                    // Atualizar a lista de favoritos
                    const newFavorites = favorites.includes(userId)
                        ? favorites.filter(id => id !== userId)
                        : [...favorites, userId];

                    // Atualizar status nos usuários
                    const updatedUsers = users.map(user =>
                        user.id === userId
                            ? { ...user, isFavorite: !user.isFavorite }
                            : user
                    );

                    set({ favorites: newFavorites, users: updatedUsers });

                    // Aplicar filtros após mudança
                    get().applyFilters();
                },

                // ------- Ações de UI ------- //
                /**
                 * Selecionar usuário para modal de detalhes
                 * @param {Object|null} user - Usuário selecionado
                 * **/
                setSelectedUser: (user) => {
                    set({ selectedUser: user });
                },

                /**
                 * Limpar mensagem de erro
                 * **/
                clearError: () => {
                    set({ error: null });
                },

                // ------- Ações Utilitárias ------- //
                /** 
                 * Reset completo do estado
                 * **/
                reset: () => {
                    set({
                        users: [],
                        filteredUsers: [],
                        loading: false,
                        error: null,
                        searchTerm: '',
                        showFavoritesOnly: false,
                        currentPage: 1,
                        selectedUser: null,
                        hasMore: true
                    });
                },

                /**
                 * Carregar próxima página
                 * **/
                loadMore: () => {
                    const { currentPage, loading, hasMore } = get();
                    if (!loading && hasMore) {
                        get().fetchUsers(currentPage + 1, false);
                    }
                }
            }),
            {
                name: 'user-store', // Nome da  localStorage
                // Persistir apenas favoritos para manter entre sessões
                partialize: (state) => ({
                    favorites: state.favorites
                })
            }
        ),
        {
            name: 'user-store', //Nome do DevTools
            enabled: process.env.NODE_ENV === 'development', // DevTools só em dev
        }
    )
);

export default useUserStore;