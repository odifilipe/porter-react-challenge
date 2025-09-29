import useUserStore from '../../store/useUserStore';

// Mock do serviço para evitar chamadas reais à API durante os testes
jest.mock('../../services/useService', () => ({
  userService: {
    getUsers: jest.fn()
  }
}));

describe('useUserStore - Favoritos', () => {;  
  beforeEach(() => { // Limpa o estado do store antes de cada teste
    useUserStore.setState({
      users: [
        { id: '1', name: { full: 'Usuário 1' }, isFavorite: false },
        { id: '2', name: { full: 'Usuário 2' }, isFavorite: false },
        { id: '3', name: { full: 'Usuário 3' }, isFavorite: true }
      ],
      filteredUsers: [
        { id: '1', name: { full: 'Usuário 1' }, isFavorite: false },
        { id: '2', name: { full: 'Usuário 2' }, isFavorite: false },
        { id: '3', name: { full: 'Usuário 3' }, isFavorite: true }
      ],
      favorites: ['3'],
      searchTerm: '',
      showFavoritesOnly: false
    });
  });

  test('deve adicionar um usuário aos favoritos', () => {
    // Arrange
    const initialState = useUserStore.getState();
    const userId = '1';

    // Act
    initialState.toggleFavorite(userId);
    const newState = useUserStore.getState();

    // Assert
    expect(newState.favorites).toContain(userId);
    expect(newState.favorites.length).toBe(2);
    expect(newState.users.find(user => user.id === userId).isFavorite).toBe(true);
  });

  test('deve remover um usuário dos favoritos', () => {
    // Arrange
    const initialState = useUserStore.getState();
    const userId = '3';

    // Act
    initialState.toggleFavorite(userId);
    const newState = useUserStore.getState();

    // Assert
    expect(newState.favorites).not.toContain(userId);
    expect(newState.favorites.length).toBe(0);
    expect(newState.users.find(user => user.id === userId).isFavorite).toBe(false);
  });

  test('deve atualizar o status isFavorite nos objetos de usuário', () => {
    // Arrange
    const initialState = useUserStore.getState();
    const userId = '2';

    // Act
    initialState.toggleFavorite(userId);
    const newState = useUserStore.getState();
    const user = newState.users.find(u => u.id === userId);

    // Assert
    expect(user.isFavorite).toBe(true);
  });
});
