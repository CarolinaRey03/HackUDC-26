import { Toaster } from "sonner";

function ToastProvider() {
  return <Toaster theme="system" position="bottom-right" className="toast-msg__toaster" />;
}

export default ToastProvider;
