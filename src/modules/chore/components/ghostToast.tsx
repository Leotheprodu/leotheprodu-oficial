import toast from 'react-hot-toast';

export const ghostToast = ({
  message,
  type = 'ok',
  duration = 3000,
}: {
  message: string;
  type?: 'ok' | 'error';
  duration?: number;
}) => {
  if (type === 'ok') {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } font-code bg-slate-900 text-secundario border-1 border-secundario rounded-md p-2`}
        >
          <h1 className="text-base">{message}</h1>
        </div>
      ),
      {
        duration: 3000,
        id: 'logout-toast',
        position: 'top-center',
      }
    );
  } else {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } font-code bg-danger text-slate-100 border-1 border-slate-100 rounded-md p-2`}
        >
          <h1 className="text-base">{message}</h1>
        </div>
      ),
      {
        duration,
        id: 'logout-toast',
        position: 'top-center',
      }
    );
  }
};
