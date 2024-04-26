import * as v from "valibot";
import { emailSchema, usernameSchema } from "./common";

const userSchema = v.object({
  username: usernameSchema,
  email: emailSchema,
});

export default userSchema;

export type UserSchemaInputs = v.Input<typeof userSchema>;
