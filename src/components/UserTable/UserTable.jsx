import React from 'react';
import { useFavorites, useUI } from '../../hooks/useUserHooks';

const UserTable = ({ users = [] }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { openUserDetail } = useUI();

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 text-5xl mb-4">👤</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário encontrado</h3>
                <p className="text-gray-600">Tente ajustar seus filtros ou carregar mais usuários.</p>
            </div>
        );
    }

    const handleRowClick = (user) => {
        openUserDetail(user);
    };

    const handleFavoriteClick = (e, userId) => {
        e.stopPropagation(); // Evitar abrir detalhes
        toggleFavorite(userId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header da tabela */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Lista de Usuários</h2>
                <p className="text-sm text-gray-600 mt-1">{users.length} usuário{users.length !== 1 ? 's' : ''} encontrado{users.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Tabela - Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usuário
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                E-mail
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Telefone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cadastro
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Favorito
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => {
                            const isUserFavorite = isFavorite(user.id);
                            const registeredDate = user.registered ? new Date(user.registered).toLocaleDateString('pt-BR') : 'N/A';

                            return (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                    onClick={() => handleRowClick(user)}
                                >
                                    {/* Coluna do Usuário (foto + nome) */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={user.picture?.medium || user.picture?.thumbnail}
                                                alt={user.name?.full}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 mr-4"
                                                loading="lazy"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name?.full || 'Nome não informado'}
                                                </div>                                                
                                            </div>
                                        </div>
                                    </td>

                                    {/* Coluna do E-mail */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                    </td>

                                    {/* Coluna do Telefone */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.phone || 'N/A'}</div>
                                    </td>

                                    {/* Coluna da Data de Cadastro */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{registeredDate}</div>
                                    </td>

                                    {/* Coluna do Favorito */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={(e) => handleFavoriteClick(e, user.id)}
                                            className={`p-2 rounded-full transition-colors duration-200 ${isUserFavorite
                                                ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50'
                                                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'
                                                }`}
                                            aria-label={isUserFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                        </button>
                                    </td>

                                    {/* Coluna de Ações */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRowClick(user);
                                            }}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                                        >
                                            Ver detalhes
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Lista Responsiva - Mobile */}
            <div className="md:hidden">
                {users.map((user) => {
                    const isUserFavorite = isFavorite(user.id);
                    const registeredDate = user.registered ? new Date(user.registered).toLocaleDateString('pt-BR') : 'N/A';

                    return (
                        <div
                            key={user.id}
                            className="px-6 py-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                            onClick={() => handleRowClick(user)}
                        >
                            <div className="flex items-start justify-between">
                                {/* Informações principais */}
                                <div className="flex items-center flex-1">
                                    <img
                                        src={user.picture?.medium || user.picture?.thumbnail}
                                        alt={user.name?.full}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mr-4"
                                        loading="lazy"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {user.name?.full || 'Nome não informado'}
                                            </h3>
                                            {isUserFavorite && (
                                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    ❤️
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">{user.email}</p>
                                        {user.phone && (
                                            <p className="text-xs text-gray-500 mt-0.5">{user.phone}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-0.5">Cadastro: {registeredDate}</p>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="flex items-center space-x-2 ml-4">
                                    <button
                                        onClick={(e) => handleFavoriteClick(e, user.id)}
                                        className={`p-2 rounded-full transition-colors duration-200 ${isUserFavorite
                                            ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                                            : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                                            }`}
                                        aria-label={isUserFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRowClick(user);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                                    >
                                        Ver detalhes →
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserTable;