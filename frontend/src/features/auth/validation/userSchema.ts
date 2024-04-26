import * as v from "valibot";
import { emailSchema, usernameSchema } from "./common";

const userSchema = v.object({
  // id: v.number("L'identifiant de l'utilisateur n'est pas un nombre"),
  username: usernameSchema,
  email: emailSchema,
});

export default userSchema;

export type UserSchemaInput = v.Input<typeof userSchema>;
export type UserSchemaOutput = v.Output<typeof userSchema>;
