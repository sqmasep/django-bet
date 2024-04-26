import * as v from "valibot";
import { confirmPasswordSchema, emailSchema, passwordSchema, usernameSchema } from "./common";

const registerSchema = v.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export default registerSchema;

export type RegisterSchemaInputs = v.Input<typeof registerSchema>;
