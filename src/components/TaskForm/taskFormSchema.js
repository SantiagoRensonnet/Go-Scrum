import * as yup from "yup";

const requiredMsg = "* campo obligatorio";
export const taskFormSchema = yup.object().shape({
  title: yup.string().required(requiredMsg).min(6),
  status: yup.string().required(requiredMsg),
  importance: yup.string().required(requiredMsg),
  description: yup.string().required(requiredMsg),
});
