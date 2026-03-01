import { toast } from "sonner";

function success(message: string) {
  toast.success(message, {
    className: "toast-msg__success",
  });
}

function info(message: string) {
  toast.info(message, {
    className: "toast-msg__info",
  });
}

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
