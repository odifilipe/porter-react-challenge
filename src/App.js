import React from 'react';
// import useUserStore from './store/useUserStore';
import UserList from './components/UserList/UserList';
import UserDetailModal from './components/UserDetailModal/UserDetailModal';
import { useSearch, useFavorites } from './hooks/useUserHooks';
import './App.css';

function App() {
  const { searchTerm, showFavoritesOnly, hasActiveFilters } = useSearch();
  const { favoritesCount } = useFavorites();  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gerenciador de Usuários
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Desafio Técnico - React com Zustand
              </p>
            </div>
            
            {/* Badge de favoritos */}
            {favoritesCount > 0 && (
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {favoritesCount} favorito{favoritesCount !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar para implementar */}
        {/* <div className="mb-8">
          <SearchInput />
        </div> */}

        {/* Status dos filtros */}
        {hasActiveFilters && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-700 text-sm font-medium">Filtros aplicados:</span>
              <div className="ml-2 flex items-center space-x-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                    Busca: "{searchTerm}"
                  </span>
                )}
                {showFavoritesOnly && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                    Apenas favoritos
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lista/Tabela de usuários */}
        <UserList />

        {/* Modal de detalhes do usuário */}
        <UserDetailModal />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Desafio Técnico - Frontend React</p>
            <p className="mt-1">Implementado com Zustand + Random User API + Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
