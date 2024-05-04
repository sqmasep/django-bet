"use client";

import Link from "next/link";
import { Home, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import NewBetForm from "~/features/bet/components/NewBetForm";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav className="sticky left-0 top-0 z-50 w-full border-b bg-white p-4">
      <div className="container flex items-center justify-between gap-4">
        <ul className="flex items-center gap-4">
          <li>
            <Button variant="ghost" asChild size="icon">
              <Link href="/">
                <Home />
              </Link>
            </Button>
          </li>
          <li>
            <Link href="/bet" className="text-zinc-600">
              Parier
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {auth.user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/bet">Rejoindre un pari</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Créer un pari</Button>
                </DialogTrigger>
                <DialogContent>
                  <NewBetForm />
                </DialogContent>
              </Dialog>

              <Button asChild variant="secondary">
                <Link href="/profile">
                  <User className="mr-2" />
                  {auth.user.username}
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Connexion</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
