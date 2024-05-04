import { useQuery } from "@tanstack/react-query";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import * as v from "valibot";
import betDetailsSchema from "~/features/bet/validation/betDetailsSchema";

export default function useUserBets() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user", "bets"],
    queryFn: async () =>
      fetch("http://localhost:8000/api/bets/user-bets/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }).then(async res => {
        const data = await res.json();
        return v.parse(v.array(betDetailsSchema), data);
      }),
  });
}
