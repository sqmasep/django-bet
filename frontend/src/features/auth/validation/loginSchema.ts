import * as v from "valibot";
import { passwordSchema, usernameSchema } from "./common";

const loginSchema = v.object({
  username: usernameSchema,
  password: passwordSchema,
});

export default loginSchema;

export type LoginSchemaInput = v.Input<typeof loginSchema>;
