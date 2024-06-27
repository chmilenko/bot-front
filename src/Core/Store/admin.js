import { create } from 'zustand';

const useAdminStore = create((set) => ({
  user: {
    login: '',
    password: '',
    auth: false,
  },
  setUser: (user) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        ...user,
        auth: true,
      },
    })),
  deleteUser: () =>
    set((state) => ({
      ...state,
      user: {
        login: '',
        password: '',
        auth: false,
      },
    })),
}));

export default useAdminStore;