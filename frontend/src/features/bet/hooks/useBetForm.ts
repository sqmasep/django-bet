import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { BetSchemaInput } from "../validation/betSchema";
import betSchema from "../validation/betSchema";

export default function useBetForm() {
  const form = useForm<BetSchemaInput>({
    resolver: valibotResolver(betSchema),
  });

  const onSubmit: SubmitHandler<BetSchemaInput> = data => {};

  return { form, onSubmit };
}
