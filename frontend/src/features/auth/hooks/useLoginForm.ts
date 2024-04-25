import { SubmitHandler, useForm } from "react-hook-form";
import loginSchema, { LoginSchemaInputs } from "../validation/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";

export default function useLoginForm() {
  const form = useForm<LoginSchemaInputs>({
    resolver: valibotResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaInputs> = data => {
    console.log(data);

    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) throw new Error("Une erreur s'est produite");
        return response.json();
      })
      .then(data => {
        console.log(data);
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
