import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const showSuccessToast = (msg) => {
  toast.success(msg, toastConfig);
};

export const showErrorToast = (msg) => {
  toast.error(msg, toastConfig);
};

export const showInfoToast = (msg) => {
  toast.info(msg, toastConfig);
};

export const showWarningToast = (msg) => {
  toast.warn(msg, toastConfig);
};

export const ToastProvider = () => {
  return <ToastContainer {...toastConfig} />;
};
