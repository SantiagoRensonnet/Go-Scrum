import * as yup from "yup";

const requiredMsg = "* campo obligatorio";
export const loginFormSchema = yup.object().shape({
  userName: yup.string().required(requiredMsg).min(4),
  password: yup.string().required(requiredMsg),
});
