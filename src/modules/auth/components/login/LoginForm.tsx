import { Button, Link } from '@nextui-org/react';
import { IsLoggedInHandle } from './IsLoggedInHandle';
import { useLoginForm } from '@modules/auth/hooks/useLoginForm';
import { InputEmailLoginForm } from './InputEmailLoginForm';
import { InputPasswordLoginForm } from './InputPasswordLoginForm';

export const LoginForm = () => {
  const {
    isVisible,
    handleOnChange,
    handleOnClear,
    toggleVisibility,
    handleLogin,
    isInvalidPass,
    email,
    password,
    user,
    isPending,
  } = useLoginForm({ email: '', password: '' });
  if (user.isLoggedIn) {
    return <IsLoggedInHandle user={user} />;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold">Iniciar sesión</h1>
      <p className="text-center  text-primario mb-4">
        Inicia sesión para acceder a tu cuenta
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <InputEmailLoginForm
            handle={{ handleOnClear, email, handleOnChange }}
          />
          <InputPasswordLoginForm
            handle={{
              handleOnChange,
              isVisible,
              toggleVisibility,
              isInvalidPass,
              password,
            }}
          />
        </div>
        <Button
          isLoading={isPending}
          type="submit"
          className="uppercase"
          color="primary"
        >
          Entrar
        </Button>
      </form>
      <div className="mt-4">
        <p className="text-center text-sm text-gray-400">
          ¿No tienes cuenta?{' '}
          <Link href={'/registro'} className="text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
