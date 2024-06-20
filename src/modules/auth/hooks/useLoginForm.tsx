import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { handleOnChange, handleOnClear } from '@chore/utils/formUtils';
import { $user } from '@/stores/users';
import { setLocalStorage } from '@/modules/chore/utils/handleLocalStorage';
import { loginService } from '../services/authService';
import { ErrorCode, ErrorMessage } from '@/modules/chore/utils/ErrorMsgFormat';
import { ghostToast } from '@/modules/chore/components/ghostToast';

export const useLoginForm = (formInit: { email: string; password: string }) => {
  const user = useStore($user);
  const [form, setForm] = useState(formInit);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const { data, error, status, mutate, isPending } = loginService();

  useEffect(() => {
    if (status === 'success') {
      $user.set(data);
      setLocalStorage('user', data);
      ghostToast({ message: `Bienvenido ${data.name}` });
      setForm(formInit);
      setIsInvalidPass(false);
      setIsVisible(false);
    } else if (status === 'error') {
      if (ErrorCode(error.message) === 403) {
        ghostToast({ message: `${user.name}, ya has iniciado sesión` });
        $user.set({ ...user, isLoggedIn: true });
        setLocalStorage('user', { ...user, isLoggedIn: true });
        return;
      }
      if (ErrorMessage(error.message) === 'Invalid Password') {
        ghostToast({ message: 'Contraseña Incorrecta', type: 'error' });
        setIsInvalidPass(true);
        return;
      }
      if (ErrorMessage(error.message) === 'User not found') {
        ghostToast({ message: 'El usuario no existe', type: 'error' });
        return;
      }

      ghostToast({ message: 'Ha ocurrido un error', type: 'error' });
    }
  }, [data, error, status]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(setForm, e);
    setIsInvalidPass(false);
  };
  return {
    ...form,
    toggleVisibility,
    handleOnChange: handleChange,
    handleOnClear: (name: string) => handleOnClear(name, setForm),
    handleLogin,
    isVisible,
    isInvalidPass,
    user,
    isPending,
  };
};
