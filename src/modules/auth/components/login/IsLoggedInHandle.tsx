import { Button } from '@nextui-org/react';
import { useIsLoggedInHandle } from '@modules/auth/hooks/useIsLoggedInHandle';
import type { AuthDataProps } from '@/stores/users';

export const IsLoggedInHandle = ({ user }: { user: AuthDataProps }) => {
  const { handleLogout, isPending } = useIsLoggedInHandle({ user });
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Hola {user.name}</h1>
      <p>Ya has iniciado sesión, ¿Quieres cerrarla?</p>
      <div className="flex justify-center items-center gap-4">
        <Button
          isLoading={isPending}
          onClick={handleLogout}
          className="uppercase"
          color="danger"
        >
          Cerrar Sesion
        </Button>
      </div>
    </div>
  );
};
