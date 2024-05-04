import { useQuery } from "@tanstack/react-query";
import * as v from "valibot";
import betDetailsSchema from "../validation/betDetailsSchema";

export default function useBetDetails(code: string, token: string) {
  return useQuery({
    queryKey: ["bets", code],
    queryFn: async () =>
      fetch(`http://localhost:8000/api/bets/${code}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }).then(async res => {
        const betDetails = await res.json();
        return v.parse(betDetailsSchema, betDetails);
      }),
    enabled: !!code,
  });
}
