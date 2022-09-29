import * as yup from "yup";

const requiredMsg = "* campo obligatorio";
export const registerFormSchema = yup.object().shape({
  userName: yup.string().required(requiredMsg).min(4),
  password: yup
    .string()
    .required(requiredMsg)
    .matches(
      /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$)/,
      "Mínimo ocho caracteres, al menos una letra en mayúscula (A-Z), una en minúscula (a-z) y un número (0-9)"
    ),
  email: yup.string().email("Debe ser un email válido").required(requiredMsg),
  teamID: yup.string(),
  role: yup.string().required(requiredMsg), // ==> ["Team Member","Team Leader"]
  continent: yup.string().required(requiredMsg), // ==> ["America","Europa","Otro"]
  region: yup.string().required(requiredMsg),
});
