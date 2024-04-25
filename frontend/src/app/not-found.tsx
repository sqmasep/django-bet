import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid place-content-center place-items-center">
      <h1 className="text-9xl font-black mt-32">404</h1>
      <p className="font-medium text-3xl mt-8">Oh oh, tu t'es perdu ?</p>

      <Button asChild size="lg" className="mt-12">
        <Link href="/">Retourner à l'accueil</Link>
      </Button>
    </div>
  );
}
