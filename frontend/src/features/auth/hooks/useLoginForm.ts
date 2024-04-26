import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { LoginSchemaInput } from "../validation/loginSchema";
import loginSchema from "../validation/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAuth } from "../contexts/AuthProvider";
import * as v from "valibot";
import userSchema from "../validation/userSchema";
import { useRouter } from "next/navigation";

export default function useLoginForm() {
  const router = useRouter();
  const auth = useAuth();

  const form = useForm<LoginSchemaInput>({
    resolver: valibotResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaInput> = data => {
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
          user: userSchema,
        });

        const json = v.parse(schema, await response.json());

        return json;
      })
      .then(data => {
        // console.log("login", data);
        auth.setToken(data.access);
        router.push("/bet");
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
