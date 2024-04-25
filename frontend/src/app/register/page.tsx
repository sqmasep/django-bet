import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Register() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">S'inscrire sur AAA</h1>
            <p className="text-balance text-muted-foreground">
              Entrez votre email pour vous inscrire, ou connectez-vous
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@gmail.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <Input id="password" type="password" required />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">
                  Confirmer le mot de passe
                </Label>
              </div>
              <Input id="confirm-password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="underline">
              Connectez-vous !
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
