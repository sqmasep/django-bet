import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { BetSchemaInput, BetSchemaOutput } from "../validation/betSchema";
import betSchema from "../validation/betSchema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import useBetDetails from "./useBetDetails";

export default function useBetForm(optionId: number, betId: number, code: string) {
  const { token, invalidateUser } = useAuth();
  const { invalidateBetDetails } = useBetDetails(code);

  const form = useForm<BetSchemaInput>({
    resolver: valibotResolver(betSchema),
  });

  const {
    mutate: vote,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["bets", "vote", betId, optionId],
    mutationFn: async (data: BetSchemaOutput & { option: number; bet: number }) =>
      fetch("http://localhost:8000/api/bets/cast-userbet/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }),

    onSuccess: async () => {
      invalidateBetDetails();
      invalidateUser();
    },
  });

  const onSubmit: SubmitHandler<BetSchemaInput> = data => {
    vote({
      amount: data.amount,
      option: optionId,
      bet: betId,
    });
  };

  return { form, onSubmit, isPending, isError };
}
