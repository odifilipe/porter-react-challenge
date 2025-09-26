import React, { useEffect } from 'react';
import { useUI } from '../../hooks/useUserHooks';

const UserDetailModal = () => {
    const { selectedUser, closeUserDetail } = useUI();
    console.log(selectedUser);
    
    // Fechar o modal com a tecla ESC
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeUserDetail();
            }
        };
    
        // Salvar o estilo original antes de modificar
        const originalOverflow = document.body.style.overflow || '';
        
        window.addEventListener('keydown', handleEscKey);
        
        // Desabilitar o scroll do body quando o modal estiver aberto
        document.body.style.overflow = 'hidden';
        
        return () => {
            window.removeEventListener('keydown', handleEscKey);
            
            // Restaurar o estilo original ou definir como 'auto' se não havia estilo antes
            document.body.style.overflow = originalOverflow || 'auto';
            
            // Garantir que o scroll seja restaurado após um pequeno delay
            // Isso é importante para casos onde o componente é desmontado de forma inesperada
            setTimeout(() => {
                if (document.body.style.overflow === 'hidden') {
                    document.body.style.overflow = 'auto';
                }
            }, 100);
        };
    }, [closeUserDetail]);

    // Se não houver usuário selecionado, não renderiza nada
    if (!selectedUser) return null;

    // Formatar a data de registro
    const registeredDate = selectedUser.registered 
        ? new Date(selectedUser.registered).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        : 'N/A';

    // Formatar a data de nascimento (se disponível)
    const birthDate = selectedUser.dob?.date
        ? new Date(selectedUser.dob.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        : 'N/A';

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay de fundo escuro */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={closeUserDetail}
                aria-hidden="true"
            ></div>
            
            {/* Container do modal */}
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Conteúdo do modal */}
                <div 
                    className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto z-10 overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header do modal */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white relative">
                        <button 
                            onClick={closeUserDetail}
                            className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors"
                            aria-label="Fechar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold">Detalhes do Usuário</h2>
                    </div>
                    
                    {/* Corpo do modal */}
                    <div className="p-6">
                        {/* Informações do perfil */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                            {/* Foto do usuário */}
                            <div className="mb-4 sm:mb-0 sm:mr-6">
                                <img 
                                    src={selectedUser.picture?.large || selectedUser.picture?.medium} 
                                    alt={selectedUser.name?.full || "Usuário"}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                                />
                            </div>
                            
                            {/* Informações básicas */}
                            <div>
                                <div className='flex items-center gap-2 mb-1'>
                                    {selectedUser?.isFavorite && (
                                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                    )}                                    
                                    <h3 className="text-2xl font-bold text-gray-800">                                    
                                        {selectedUser.name?.full || "Nome não disponível"}
                                    </h3>
                                </div>                                

                                <p className="text-gray-600 mb-2">
                                    {selectedUser.email || "Email não disponível"}
                                </p>
                                <p className="text-gray-500 mb-4">
                                    ID: {selectedUser.id}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">                                    
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {selectedUser.gender === 'male' ? 'Masculino' : selectedUser.gender === 'female' ? 'Feminino' : 'Outro'}
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Cadastrado em {registeredDate}
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
                        
                        {/* Detalhes em grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Contato */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Informações de Contato</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">📱</span>
                                        <div>
                                            <p className="font-medium">Telefone:</p>
                                            <p className="text-gray-700">{selectedUser.phone || "Não informado"}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">📧</span>
                                        <div>
                                            <p className="font-medium">Email:</p>
                                            <p className="text-gray-700">{selectedUser.email || "Não informado"}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Localização */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Localização</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">🏠</span>
                                        <div>
                                            <p className="font-medium">Endereço:</p>
                                            <p className="text-gray-700">
                                                {selectedUser.location?.street?.name && selectedUser.location?.street?.number
                                                    ? `${selectedUser.location.street.name}, ${selectedUser.location.street.number}`
                                                    : "Endereço não informado"}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">🌆</span>
                                        <div>
                                            <p className="font-medium">Cidade/Estado:</p>
                                            <p className="text-gray-700">
                                                {selectedUser.location?.city && selectedUser.location?.state
                                                    ? `${selectedUser.location.city}, ${selectedUser.location.state}`
                                                    : "Não informado"}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">🌎</span>
                                        <div>
                                            <p className="font-medium">País:</p>
                                            <p className="text-gray-700">
                                                {selectedUser.location?.country || "Não informado"}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Informações Pessoais */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Informações Pessoais</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">🎂</span>
                                        <div>
                                            <p className="font-medium">Data de Nascimento:</p>
                                            <p className="text-gray-700">{birthDate}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">👤</span>
                                        <div>
                                            <p className="font-medium">Nacionalidade:</p>
                                            <p className="text-gray-700">{selectedUser.nat || "Não informado"}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Conta */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Informações da Conta</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">🔑</span>
                                        <div>
                                            <p className="font-medium">Nome de Usuário:</p>
                                            <p className="text-gray-700">{selectedUser.login?.username || "Não informado"}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-600 mr-2">📅</span>
                                        <div>
                                            <p className="font-medium">Registrado em:</p>
                                            <p className="text-gray-700">{registeredDate}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer do modal */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
                        <button
                            onClick={closeUserDetail}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;
