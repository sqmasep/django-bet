import * as v from "valibot";
import { passwordSchema, usernameSchema } from "./common";

const loginSchema = v.object({
  username: usernameSchema,
  password: passwordSchema,
});

export default loginSchema;

export type LoginSchemaInputs = v.Input<typeof loginSchema>;
