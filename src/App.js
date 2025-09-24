import React from 'react';
import useUserStore from './store/useUserStore';
import './App.css';

function App() {
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  // Carregar a primeira página de usuários ao montar o componente
  React.useEffect(() => {
    fetchUsers(1, true);
  }, [fetchUsers]);
  console.log(users);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">
            Desafio Técnico - Porter
          </h1>
          <p className="text-blue-100 mt-2">
            Listagem de usuários com funcionalidades de busca, filtro e favoritos.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800"> Informações gerais </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Usuários carregados: <strong>{users.length}</strong></li>
                  <li>• Loading: <strong>{loading ? 'Ativo' : 'Inativo'}</strong></li>
                  <li>• Erro: <strong>{error || 'Nenhum'}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
