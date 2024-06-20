import { MailIcon } from '@icons/MailIcon';
import { Input } from '@nextui-org/react';

export const InputEmailLoginForm = ({ handle }: any) => {
  const { handleOnClear, email, handleOnChange, noFormValue } = handle;
  return (
    <div>
      <Input
        size="lg"
        type="email"
        isClearable
        onClear={() => handleOnClear('email')}
        label="Correo Electrónico"
        placeholder="Ingresa tu correo electrónico"
        variant="underlined"
        startContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        autoComplete="username"
        value={email}
        onChange={handleOnChange}
        name="email"
        required
        isInvalid={noFormValue?.email}
      />
    </div>
  );
};
