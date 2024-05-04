import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type {
  AddToBalanceSchemaInput,
  AddToBalanceSchemaOutput,
} from "../validation/addToBalanceSchema";
import addToBalanceSchema from "../validation/addToBalanceSchema";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import { useMutation } from "@tanstack/react-query";

export default function useAddToBalanceForm() {
  const { token } = useAuth();
  const { invalidateUser } = useAuth();

  const form = useForm<AddToBalanceSchemaInput>({
    resolver: valibotResolver(addToBalanceSchema),
  });

  const {
    mutate: addToBalance,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["profile", "addToBalance"],
    mutationFn: async (data: AddToBalanceSchemaOutput) =>
      fetch("http://localhost:8000/api/add-to-balance/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }),
    onSuccess: invalidateUser,
  });

  const onSubmit: SubmitHandler<AddToBalanceSchemaOutput> = data => {
    addToBalance(data);
  };

  return { form, onSubmit, isPending, isError };
}
