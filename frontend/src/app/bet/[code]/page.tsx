"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "~/components/ui/button";
import { DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import BetForm from "~/features/bet/components/BetForm";
import BetTable from "~/features/bet/components/BetTable";
import useBetDetails from "~/features/bet/hooks/useBetDetails";

export default function BetDetails({ params }: { params: { code: string } }) {
  const { token } = useAuth();
  const { data, isLoading, isError } = useBetDetails(params.code, token);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur</div>;
  }

  return (
    <div className="container">
      <h1 className="my-8 text-2xl font-bold">{data?.name}</h1>

      <div className="flex flex-col">
        {data?.options.map(option => (
          <Dialog key={option.id.toString()}>
            <DialogTrigger asChild>
              <div
                className="group flex cursor-pointer items-center justify-between rounded-xl bg-zinc-100 px-4 py-2 hover:bg-zinc-200"
                key={option.id}
              >
                <span className="font-semibold">{option.text}</span>
                <div className="flex items-center gap-8">
                  <span>
                    {option.number_of_bets} vote{option.number_of_bets > 1 && "s"}
                  </span>
                  <span>{option.total_amount}</span>

                  <Button variant="outline">Parier</Button>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent>
              <BetForm
                betId={data.id}
                name={data.name}
                id={data.id}
                optionId={option.id}
                optionName={option.text}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* <BetTable array={[{ name: "jar", odds: "" }]} /> */}
    </div>
  );
}
