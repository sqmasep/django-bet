import * as v from "valibot";
import { emailSchema, passwordSchema } from "./common";

const loginSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
});

export default loginSchema;

export type LoginSchemaInputs = v.Input<typeof loginSchema>;
