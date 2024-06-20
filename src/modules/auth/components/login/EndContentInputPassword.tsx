import { EyeFilledIcon } from '@icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@icons/EyeSlashFilledIcon';

export const EndContentInputPassword = ({
  toggleVisibility,
  isVisible,
}: any) => {
  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );
};
