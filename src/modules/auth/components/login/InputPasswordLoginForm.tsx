import { KeyIcon } from '@icons/KeyIcon';
import { Input } from '@nextui-org/react';
import { EndContentInputPassword } from './EndContentInputPassword';

export const InputPasswordLoginForm = ({ handle }: any) => {
  const {
    handleOnChange,
    isVisible,
    toggleVisibility,
    isInvalidPass = false,
    password,
    confirmPassword = false,
  } = handle;

  return (
    <div>
      <Input
        size="lg"
        label={confirmPassword ? 'Confirmar contraseña' : 'Contraseña'}
        placeholder="Ingresa tu contraseña"
        variant="underlined"
        endContent={
          <EndContentInputPassword
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
          />
        }
        type={isVisible ? 'text' : 'password'}
        className="max-w-xs"
        startContent={
          <KeyIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        autoComplete="current-password"
        isInvalid={isInvalidPass}
        errorMessage={isInvalidPass && 'Contraseña Incorrecta'}
        value={password}
        onChange={handleOnChange}
        name={confirmPassword ? 'password2' : 'password'}
      />
    </div>
  );
};
