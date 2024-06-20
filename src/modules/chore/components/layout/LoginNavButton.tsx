import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';

export const LoginNavButton = ({ pathName }: { pathName: string }) => {
  const user = useStore($user);
  return (
    <li>
      <a
        href={'/login'}
        className={`linkNav relative font-code ${
          pathName.includes('/login') &&
          'border-l-2 border-primario dark:border-secundario '
        }`}
      >
        {user.isLoggedIn ? 'Logout' : 'Login'}
        <span className="absolute bottom-0 left-0 w-0 h-0 border-t-2 border-primario dark:border-secundario transition-all duration-300" />
      </a>
    </li>
  );
};
