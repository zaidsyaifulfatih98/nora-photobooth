import { create } from 'zustand';

type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: string;
};

interface UseAuthStore {
  user: User;
  isChecked: boolean;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  setChecked: (checked: boolean) => void;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
  user: {
    firstName: '',
    lastName: '',
    role: '',
  },
  isChecked: false,
  setAuth: (user) => {
    set({ user });
  },
  clearAuth: () => {
    set({
      user: { firstName: '', lastName: '', role: '' },
    });
  },
  setChecked: (checked) => {
    set({ isChecked: checked });
  },
}));
