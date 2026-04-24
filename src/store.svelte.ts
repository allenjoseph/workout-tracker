import dayjs from 'dayjs';
import type { User } from './common/types';

interface Store {
  user?: User;
  currentPage: 'home' | 'workout' | 'training';
  currentWorkout?: string;
  currentDate: string;
  currentWorkoutMuscle?: string;
  saveUser: (user?: User) => void;
}

export const store = $state<Store>({
  currentPage: 'home',
  currentDate: dayjs().format('YYYY-MM-DD'),
  saveUser: (user?: User) => {
    store.user = user;
    user
      ? localStorage.setItem('user', JSON.stringify(store.user))
      : localStorage.removeItem('user');
  },
});
