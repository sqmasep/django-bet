import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { NewBetInputs } from "../validation/newBetSchema";
import newBetSchema from "../validation/newBetSchema";

export default function useNewBetForm() {
  const form = useForm<NewBetInputs>({
    resolver: valibotResolver(newBetSchema),
  });

  const onSubmit: SubmitHandler<NewBetInputs> = data => {};

  return { form, onSubmit };
}
