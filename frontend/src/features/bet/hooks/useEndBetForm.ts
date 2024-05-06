import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { EndBetSchemaInput, EndBetSchemaOutput } from "../validation/endBetSchema";
import endBetSchema from "../validation/endBetSchema";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import useBetDetails from "./useBetDetails";

export default function useEndBetForm(signupCode: string, code: string) {
  const { token } = useAuth();
  const { invalidateBetDetails } = useBetDetails(code);

  const form = useForm<EndBetSchemaInput>({
    resolver: valibotResolver(endBetSchema),
  });

  const {
    mutate: endBet,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["bets", "end", signupCode],
    mutationFn: async (data: EndBetSchemaOutput) =>
      fetch(`http://localhost:8000/api/bets/end/${signupCode}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }),
    onSuccess: invalidateBetDetails,
  });

  const onSubmit: SubmitHandler<EndBetSchemaOutput> = data => {
    endBet({
      winning_option_id: data.winning_option_id,
    });
  };

  return { form, onSubmit, isPending, isError };
}
