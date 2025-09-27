import React, { useEffect } from 'react';
import { useUsers, useSearch, useUI } from '../../hooks/useUserHooks';
import UserTable from '../UserTable/UserTable';
// import { LoadingSpinner } from '../LoadingState/LoadingState';

const EmptyState = ({ message, icon = "👤" }) => (
    <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ops!</h3>
        <p className="text-gray-600">{message}</p>
    </div>
);

const ErrorState = ({ error, onRetry }) => (
    <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Oops! Algo deu errado</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
            Tentar novamente
        </button>
    </div>
);

const LoadingTableSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header skeleton */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mt-2 animate-pulse"></div>
        </div>

        {/* Desktop table skeleton */}
        <div className="hidden md:block">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {['Usuário', 'E-mail', 'Telefone', 'Cadastro', 'Favorito', 'Ações'].map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left">
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6)].map((_, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                        <div className="h-3 bg-gray-200 rounded w-24 mt-1 animate-pulse"></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse mx-auto"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-48 mt-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-28 mt-1 animate-pulse"></div>
                        </div>
                        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const UserList = () => {
    const { users, loading, error, currentPage, totalPages, itemsPerPage, hasPrevPage, hasNextPage, prevPage, nextPage, setItemsPerPage, loadInitial, filteredUsers } = useUsers();
    const { searchTerm, showFavoritesOnly } = useSearch();
    const { hasError } = useUI();
    // console.log(users);
    // console.log(filteredUsers);

    // Carregar dados iniciais
    useEffect(() => {
        if (users.length === 0) {
            loadInitial();
        }
    }, [users.length, loadInitial]);

    const handleRetry = () => {
        loadInitial();
    };

    // Loading inicial
    if (loading && users.length === 0) {
        return <LoadingTableSkeleton />;
    }
    // Estado de erro (sem dados)
    if (hasError && users.length === 0) {
        return <ErrorState error={error} onRetry={handleRetry} />;
    }
    // Estado vazio baseado no contexto
    if (filteredUsers?.length === 0) {
        if (showFavoritesOnly) {
            return (
                <EmptyState
                    message="Você ainda não tem usuários favoritos. Adicione alguns usuários aos favoritos para vê-los aqui!"
                    icon="⭐"
                />
            );
        }

        if (searchTerm) {
            return (
                <EmptyState
                    message={`Nenhum resultado encontrado para "${searchTerm}". Tente buscar por outro termo.`}
                    icon="🔍"
                />
            );
        }

        return <EmptyState message="Nenhum usuário disponível. Carregue alguns usuários para começar!" />;
    }

    return (
        <div className="space-y-6">
            {/* Tabela de usuários */}
            <UserTable users={filteredUsers} />

            {/* Loading adicional (paginação) */}
            {loading && filteredUsers?.length > 0 && (
                <div className="flex justify-center py-4">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">Carregando mais usuários...</span>
                    </div>
                </div>
            )}

            {/* Botão carregar mais */}
            {/* {!loading && !showFavoritesOnly && !searchTerm && hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                        Carregar mais usuários
                    </button>
                </div>
            )} */}
            {/* Controle de paginação */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-center">
                    {/* <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                        Página {currentPage} de {totalPages} • Mostrando {itemsPerPage} por página
                    </div> */}
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            Página {currentPage} de {totalPages} • Mostrando {itemsPerPage} por página
                        </div>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
                                Itens:
                            </label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
                                className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={prevPage}
                            disabled={!hasPrevPage}
                            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md ${
                                hasPrevPage 
                                    ? 'bg-white text-gray-700 hover:bg-gray-50' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={!hasNextPage}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md ${
                                hasNextPage 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                    : 'bg-blue-300 text-white cursor-not-allowed'
                            }`}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>

            {/* Informações de paginação */}
            {filteredUsers?.length > 0 && (
                <div className="text-center text-sm text-gray-500">
                    Exibindo {filteredUsers?.length} usuário{filteredUsers?.length !== 1 ? 's' : ''}
                    {!showFavoritesOnly && !searchTerm && ` de ${users?.length} carregado${users?.length !== 1 ? 's' : ''}`}
                    {/* {hasMore && !showFavoritesOnly && !searchTerm && ' (mais disponíveis)'} */}
                </div>
            )}

            {/* Mensagem de erro no rodapé (se houver dados) */}
            {hasError && filteredUsers?.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-700 mb-2">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="text-red-600 hover:text-red-700 underline text-sm"
                    >
                        Tentar carregar mais usuários
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserList;