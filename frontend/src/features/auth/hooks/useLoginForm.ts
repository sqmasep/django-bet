import { SubmitHandler, useForm } from "react-hook-form";
import loginSchema, { LoginSchemaInputs } from "../validation/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAuth } from "../contexts/AuthProvider";

export default function useLoginForm() {
  const auth = useAuth();

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
        if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        console.log("login", data);
        // auth?.setToken(data.token);
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
