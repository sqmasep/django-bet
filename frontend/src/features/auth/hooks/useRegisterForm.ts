import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { RegisterSchemaInputs } from "../validation/registerSchema";
import registerSchema from "../validation/registerSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAuth } from "../contexts/AuthProvider";

export default function useRegisterForm() {
  const auth = useAuth();

  const form = useForm<RegisterSchemaInputs>({
    resolver: valibotResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaInputs> = data => {
    fetch("http://localhost:8000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async response => {
        if (!response.ok) throw new Error("Une erreur s'est produite");
        return response.json();
      })
      .then(data => {
        console.log("register", data);
        // auth.setToken(data.token);
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
