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
                        
                        {/* Informações extras */}
                        <div className="mt-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2 text-blue-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    Informações Extras
                                </h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <span className="text-blue-600 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>                                            
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-600 text-sm">Telefone</p>
                                            <p className="text-gray-800 text-sm">{selectedUser.phone || "Não informado"}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <span className="text-blue-600 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-600 text-sm">Email</p>
                                            <p className="text-gray-800 text-sm">{selectedUser.email || "Não informado"}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-3">
                                    <div className="flex items-center">
                                        <span className="text-blue-600 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-600 text-sm">Nacionalidade</p>
                                            <p className="text-gray-800 text-sm">{selectedUser.nat || "Não informado"}</p>
                                        </div>
                                    </div>
                                </div>
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
