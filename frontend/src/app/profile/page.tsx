"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import AddToBalanceForm from "~/features/profile/components/AddToBalanceForm";
import useUserBets from "~/features/profile/hooks/useUserBets";

export default function Profile() {
  const { user } = useAuth();
  const { data: bets } = useUserBets();

  return (
    <section className="container">
      <div className="mt-8 rounded-xl bg-zinc-100 p-16">
        <h1 className="text-5xl">
          Bienvenue, <span className="font-bold">{user?.username}</span>!
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-zinc-100 p-8">
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

        {bets?.length > 0 && (
          <div className="flex flex-col gap-1 rounded-xl bg-zinc-100 p-8">
            <h2 className="mb-2 text-lg font-bold">Paris récents</h2>
            {bets?.map(bet => (
              <Link
                className="rounded-lg bg-zinc-50 p-4"
                key={bet.signup_code}
                href={`/bet/${bet.signup_code}`}
              >
                <p className="font-semibold text-zinc-600">{bet.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
