import { $user } from '@/stores/users';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { Toaster } from 'react-hot-toast';

export const CheckIsLoggedIn = () => {
  const checkLocalData = getLocalStorage('user');

  if (checkLocalData) {
    $user.set(checkLocalData);
  }

  return (
    <div>
      <Toaster />
    </div>
  );
};
