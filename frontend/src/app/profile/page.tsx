"use client";

import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import NewBetForm from "~/features/bet/components/NewBetForm";
import AddToBalanceForm from "~/features/profile/components/AddToBalanceForm";
import useUserBets from "~/features/profile/hooks/useUserBets";

export default function Profile() {
  const { user } = useAuth();
  const { data: bets } = useUserBets();

  return (
    <section className="container">
      <div className="mt-8 rounded-xl border border-border bg-zinc-100 p-16">
        <h1 className="text-5xl">
          Bienvenue, <span className="font-bold">{user?.username}</span>!
        </h1>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-zinc-100 p-8">
          <div className="">
            <p className="text-lg text-zinc-600">Balance</p>
            <p className="text-4xl font-black">{user?.balance}€</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4" size="sm">
                Ajouter de l'argent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddToBalanceForm />
            </DialogContent>
          </Dialog>
        </div>
        {/* <pre>{JSON.stringify(bets, null, 2)}</pre> */}

        {bets?.length > 0 && (
          <div className="flex flex-col gap-1 rounded-xl border border-border bg-zinc-100 p-8 md:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <h2 className="mb-2 text-lg font-bold">Paris récents</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Créer un pari
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <NewBetForm />
                </DialogContent>
              </Dialog>
            </div>

            {bets?.map(bet => (
              <Link
                data-ended={bet.is_ended}
                className="group inline-flex items-center justify-between gap-4 rounded-lg bg-zinc-50 p-4 text-zinc-600  data-[ended=true]:bg-amber-50"
                key={bet.signup_code}
                href={`/bet/${bet.signup_code}`}
              >
                <span className="inline-flex items-center gap-2">
                  {/* {!!bet.is_ended && <Trophy size={16} className="text-amber-500" />} */}
                  <span className="font-semibold">{bet.name}</span>
                  {!!bet.is_ended && <Badge variant="outline">Terminé</Badge>}
                </span>
                <ArrowRight className="opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
