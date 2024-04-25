import * as v from "valibot";
import { confirmPasswordSchema, emailSchema, passwordSchema } from "./common";

const registerSchema = v.object({
  name: v.string("Veuillez donner votre nom", [
    v.minLength(3, "Votre nom doit contenir au moins 3 caractères"),
    v.maxLength(50, "Votre nom doit contenir au plus 50 caractères"),
  ]),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export default registerSchema;

export type RegisterSchemaInputs = v.Input<typeof registerSchema>;
