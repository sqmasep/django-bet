import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { NewBetSchemaInput } from "../validation/newBetSchema";
import newBetSchema from "../validation/newBetSchema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function useNewBetForm() {
  const { token } = useAuth();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["newBet"],
    mutationFn: async (
      data: Omit<NewBetSchemaInput, "options"> & { options: { text: string }[] },
    ) =>
      fetch("http://localhost:8000/api/bets/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(data),
      }).then<{ signup_code: string }>(async res => res.json()),
    onSuccess: data => {
      console.log("new bet form", data);
      router.push(`/bet/${data.signup_code}`);
    },
  });

  const form = useForm<NewBetSchemaInput>({
    resolver: valibotResolver(newBetSchema),
    defaultValues: {
      maxDate: undefined,
      name: "",
      options: [
        { _id: "1", value: "" },
        { _id: "2", value: "" },
      ],
    },
  });

  const onSubmit: SubmitHandler<NewBetSchemaInput> = data => {
    console.log("submit new bet form");
    const optionsValues = data.options
      .map(option => ({ text: option.value.trim() }))
      .filter(el => Boolean(el.text));

    mutate({
      ...data,
      options: optionsValues,
    });
  };

  return { form, onSubmit };
}
