import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { NewBetSchemaInput } from "../validation/newBetSchema";
import newBetSchema from "../validation/newBetSchema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "~/features/auth/contexts/AuthProvider";

export default function useNewBetForm() {
  const { token } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ["newBet"],
    mutationFn: async (data: Omit<NewBetSchemaInput, "options"> & { options: string[] }) =>
      fetch("http://localhost:8000/api/bet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }),
  });

  const form = useForm<NewBetSchemaInput>({
    resolver: valibotResolver(newBetSchema),
    defaultValues: {
      maxDate: undefined,
      name: "",
      options: [],
    },
  });

  const onSubmit: SubmitHandler<NewBetSchemaInput> = data => {
    const optionsValues = data.options.map(option => option.value.trim()).filter(Boolean);

    mutate({
      ...data,
      options: optionsValues,
    });
  };

  return { form, onSubmit };
}
