import { postData } from '@/modules/chore/services/HandleAPI';
import { Server1API } from '@/modules/chore/config/constants';

export const logoutService = () => {
  return postData({
    key: 'logout',
    url: `${Server1API}/auth/logout`,
    method: 'GET',
  });
};
export const loginService = () => {
  return postData({
    key: 'login',
    url: `${Server1API}/auth/login`,
    method: 'POST',
  });
};
