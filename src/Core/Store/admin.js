import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAdminStore = create(
  persist(
    (set) => ({
      user: {
        login: '',
        password: '',
        auth: false,
      },
      setUser: (user) =>
        set((state) => ({
          user: {
            ...state.user,
            ...user,
          },
        })),
      deleteUser: () =>
        set({
          user: {
            login: '',
            password: '',
            auth: false,
          },
        }),
    }),
    {
      name: 'admin-store',
    }
  )
);

export default useAdminStore;
