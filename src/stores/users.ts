import { atom } from 'nanostores';
interface LoginDataResponse {
  id: number;
  name: string;
  email: string;
  active: boolean;
  isLoggedIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthDataProps = LoginDataResponse;
export const $user = atom<AuthDataProps>({
  isLoggedIn: false,
  id: 0,
  name: '',
  email: '',
  active: false,
  createdAt: '',
  updatedAt: '',
});

export const $sourseAudio = atom();
