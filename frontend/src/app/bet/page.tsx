"use client";

import { useQuery } from "@tanstack/react-query";
import BetTable from "~/features/bet/components/BetTable";
import NewBetForm from "~/features/bet/components/NewBetForm";

export default function Bet() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () =>
      new Promise<{ name: string; odds: number }[]>(resolve => {
        setTimeout(
          () =>
            resolve([
              { name: "ahah", odds: 13 },
              { name: "bahah", odds: 14 },
              { name: "cahah", odds: 15 },
              { name: "dahah", odds: 16 },
              { name: "eahah", odds: 17 },
              { name: "fahah", odds: 18 },
              { name: "gahah", odds: 19 },
              { name: "gahah", odds: 20 },
              { name: "gahah", odds: 21 },
              { name: "gahah", odds: 22 },
              { name: "gahah", odds: 23 },
              { name: "gahah", odds: 24 },
              { name: "gahah", odds: 25 },
              { name: "gahah", odds: 26 },
              { name: "gahah", odds: 27 },
              { name: "gahah", odds: 28 },
              { name: "gahah", odds: 29 },
              { name: "gahah", odds: 30 },
              { name: "gahah", odds: 31 },
              { name: "gahah", odds: 32 },
              { name: "gahah", odds: 33 },
              { name: "gahah", odds: 34 },
              { name: "gahah", odds: 35 },
              { name: "gahah", odds: 36 },
              { name: "gahah", odds: 37 },
              { name: "gahah", odds: 38 },
              { name: "gahah", odds: 39 },
              { name: "gahah", odds: 40 },
              { name: "gahah", odds: 41 },
              { name: "gahah", odds: 42 },
              { name: "gahah", odds: 43 },
              { name: "gahah", odds: 44 },
              { name: "gahah", odds: 45 },
            ]),
          1000,
        );
      }),
  });

  return (
    <section className="container mt-12">
      <BetTable array={data} isLoading={isLoading} />
    </section>
  );
}
