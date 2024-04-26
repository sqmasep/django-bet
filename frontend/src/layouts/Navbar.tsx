"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/features/auth/contexts/AuthProvider";

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

        <div>
          {auth.user ? (
            auth.user.username
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
