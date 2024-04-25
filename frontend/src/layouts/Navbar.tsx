import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b p-4 bg-white z-50 sticky top-0 w-full left-0">
      <div className="container flex items-center gap-4 justify-between">
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
          <Button asChild variant="outline">
            <Link href="/login">Connexion</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
