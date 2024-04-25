import { SubmitHandler, useForm } from "react-hook-form";
import registerSchema, {
  RegisterSchemaInputs,
} from "../validation/registerSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";

export default function useRegisterForm() {
  const form = useForm<RegisterSchemaInputs>({
    resolver: valibotResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaInputs> = data => {
    console.log("submit");
  };

  return {
    form,
    onSubmit,
  };
}
