import { $user, type AuthDataProps } from '@/stores/users';
import { useEffect } from 'react';
import { setLocalStorage } from '@/modules/chore/utils/handleLocalStorage';
import { logoutService } from '../services/authService';
import { ErrorCode } from '@/modules/chore/utils/ErrorMsgFormat';
import { ghostToast } from '@/modules/chore/components/ghostToast';
export const useIsLoggedInHandle = ({ user }: { user: AuthDataProps }) => {
  const { data, error, status, mutate, isPending } = logoutService();

  useEffect(() => {
    if (status === 'success') {
      $user.set(data);
      setLocalStorage('user', data);
      ghostToast({ message: `Nos vemos pronto ${user.name}` });
    } else if (status === 'error') {
      if (ErrorCode(error.message) === 403) {
        ghostToast({ message: `Nos vemos pronto ${user.name}` });
        $user.set({ ...user, isLoggedIn: false });
        setLocalStorage('user', { ...user, isLoggedIn: false });
        return;
      }

      ghostToast({ message: 'ha ocurrido un error', type: 'error' });
    }
  }, [user, status, error]);

  const handleLogout = () => {
    mutate({});
  };

  return {
    handleLogout,
    isPending,
  };
};
