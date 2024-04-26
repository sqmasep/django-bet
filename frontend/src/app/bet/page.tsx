"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
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
            ]),
          1000,
        );
      }),
  });

  return (
    <section className="container mt-12">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="my-12">Créer un nouveau pari</Button>
        </DialogTrigger>

        <DialogContent>
          <NewBetForm />
        </DialogContent>
      </Dialog>
      <BetTable array={data} isLoading={isLoading} />
    </section>
  );
}
