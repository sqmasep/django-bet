import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as v from "valibot";
import betDetailsSchema from "../validation/betDetailsSchema";
import { useAuth } from "~/features/auth/contexts/AuthProvider";

export default function useBetDetails(code: string) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["bets", code],
    queryFn: async () =>
      fetch(`http://localhost:8000/api/bets/${code}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }).then(async res => {
        const betDetails = await res.json();
        return betDetails;
        return v.parse(betDetailsSchema, betDetails);
      }),
    enabled: !!code,
  });

  async function invalidateBetDetails() {
    return queryClient.invalidateQueries({
      queryKey: ["bets", code],
    });
  }

  return { ...query, invalidateBetDetails };
}
