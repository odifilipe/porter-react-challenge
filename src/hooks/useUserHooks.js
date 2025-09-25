import useUserStore from '../store/useUserStore';

/**
 * Hook para gerenciar os favoritos
 * @returns {Object} - Métodos e estados dos favoritos
 * **/
export const useFavorites = () => {
    const favorites = useUserStore(state => state.favorites);
    const toggleFavorite = useUserStore(state => state.toggleFavorite);

    return {
        favorites,
        favoritesCount: favorites.length,
        isFavorite: (userId) => favorites.includes(userId), //Verifica se o usuário é favorito
        toggleFavorite, // Alterna o status de favorito
        addToFavorites: (userId) => { // Adiciona um usuário aos favoritos
            if (!favorites.includes(userId)) {
                toggleFavorite(userId);
            }
        },
        removeFromFavorites: (userId) => { // Remove um usuário dos favoritos
            if (favorites.includes(userId)) {
                toggleFavorite(userId);
            }
        }
    };
};

/**
 * Hook para funcionalidade de busca
 * @returns {Object} - Métodos e estados da busca
 * **/
export const useSearch = () => {
    const searchTerm = useUserStore(state => state.searchTerm);
    const setSearchTerm = useUserStore(state => state.setSearchTerm);
    const clearSearch = useUserStore(state => state.clearSearch);
    const showFavoritesOnly = useUserStore(state => state.showFavoritesOnly);
    const toggleFavoritesFilter = useUserStore(state => state.toggleFavoritesFilter);

    return {
        searchTerm,
        setSearchTerm,
        clearSearch,
        showFavoritesOnly,
        toggleFavoritesFilter,
        hasActiveFilters: (searchTerm?.trim() ?? '') !== '' || showFavoritesOnly //verificar se há filtros ativos
    };
};

/**
 * Hook para loading e estados da UI
 * @returns {Object} - Estados de loading e UI
 * **/
export const useUI = () => {
    const loading = useUserStore(state => state.loading);
    const error = useUserStore(state => state.error);
    const clearError = useUserStore(state => state.clearError);
    const selectedUser = useUserStore(state => state.selectedUser);
    const setSelectedUser = useUserStore(state => state.setSelectedUser);

    return {
        loading,
        error,
        clearError,
        selectedUser,
        setSelectedUser,
        hasError: Boolean(error), // Verifica se há erro
        openUserDetail: (user) => setSelectedUser(user), // Abre o modal de detalhes do usuário
        closeUserDetail: () => setSelectedUser(null), // Fecha o modal de detalhes do usuário
        retry: (action) => { // Função para tentar novamente uma ação, com clearError
            clearError();
            if (typeof action === 'function') {
                action();
            }
        }
    };
};

/**
 * Hook para carregar e gerenciar usuários
 * @returns {Object} - Métodos e estados dos usuários
 * **/
export const useUsers = () => {
    const users = useUserStore(state => state.users);
    const filteredUsers = useUserStore(state => state.filteredUsers);
    const currentPage = useUserStore(state => state.currentPage);
    const hasMore = useUserStore(state => state.hasMore);
    const fetchUsers = useUserStore(state => state.fetchUsers);
    const loadMore = useUserStore(state => state.loadMore);

    return {
        users,
        filteredUsers,
        currentPage,
        hasMore,
        fetchUsers,
        loadMore,
        loadInitial: () => fetchUsers(1, true), // Carrega a primeira página, substituindo os usuários atuais
        reload: () => fetchUsers(currentPage, true), // Recarrega a primeira página, substituindo os usuários atuais
        totalUsers: users.length, // Total de usuários carregados
        visibleUsers: filteredUsers.length // Total de usuários visíveis após filtros
    };
};