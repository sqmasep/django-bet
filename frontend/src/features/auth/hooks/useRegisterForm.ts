import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { RegisterSchemaInput } from "../validation/registerSchema";
import registerSchema from "../validation/registerSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAuth } from "../contexts/AuthProvider";
import * as v from "valibot";
import userSchema from "../validation/userSchema";

export default function useRegisterForm() {
  const auth = useAuth();

  const form = useForm<RegisterSchemaInput>({
    resolver: valibotResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaInput> = data => {
    fetch("http://localhost:8000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async response => {
        if (!response.ok) throw new Error("Une erreur s'est produite");
        const schema = v.object({
          access: v.string("La donnée reçue n'est pas du texte"),
          refresh: v.string("La donnée reçue n'est pas du texte"),
          user: userSchema,
        });

        const json = v.parse(schema, await response.json());

        return json;
      })
      .then(data => {
        auth.setToken(data.access);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return {
    form,
    onSubmit,
  };
}
