import { SubmitHandler, useForm } from "react-hook-form";
import loginSchema, { LoginSchemaInputs } from "../validation/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";

export default function useLoginForm() {
  const form = useForm<LoginSchemaInputs>({
    resolver: valibotResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaInputs> = data => {
    console.log("submit");
  };

  return {
    form,
    onSubmit,
  };
}
