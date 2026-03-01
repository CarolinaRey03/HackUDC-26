import { toast } from "sonner";

function success(message: string) {
  toast.success(message);
}

function info(message: string) {
  toast.info(message);
}

// TODO: define custom style for toasts
function error(message: string, infinite?: boolean) {
  toast.error(message, {
    duration: infinite ? Infinity : undefined,
    className: "toast-msg__error",
  });
}

export const toastMsg = {
  success,
  info,
  error,
};
