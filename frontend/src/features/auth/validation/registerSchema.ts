import * as v from "valibot";
import { confirmPasswordSchema, emailSchema, passwordSchema, usernameSchema } from "./common";

const registerSchema = v.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export default registerSchema;

export type RegisterSchemaInput = v.Input<typeof registerSchema>;
