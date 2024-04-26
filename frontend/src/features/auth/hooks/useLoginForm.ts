import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { LoginSchemaInputs } from "../validation/loginSchema";
import loginSchema from "../validation/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAuth } from "../contexts/AuthProvider";
import * as v from "valibot";

export default function useLoginForm() {
  const auth = useAuth();

  const form = useForm<LoginSchemaInputs>({
    resolver: valibotResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaInputs> = data => {
    console.log(data);

    fetch("http://localhost:8000/api/token/obtain/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async response => {
        if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

        const schema = v.object({
          access: v.string("La donnée reçue n'est pas du texte"),
          refresh: v.string("La donnée reçue n'est pas du texte"),
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
