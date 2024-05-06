"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import BetTable from "~/features/bet/components/BetTable";
import NewBetForm from "~/features/bet/components/NewBetForm";
import * as v from "valibot";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

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

  const [action, setAction] = useQueryState("action", {
    defaultValue: "",
    history: "replace",
    clearOnDefault: true,
  });

  const { token } = useAuth();
  const router = useRouter();

  const { mutate: join } = useMutation({
    mutationKey: ["createBet"],
    mutationFn: async (data: { code: string }) =>
      fetch(`http://localhost:8000/api/bets/signup/${data.code}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(data),
      }).then<{ signup_code: string }>(async res => res.json()),
    onSuccess: data => {
      // TODO code is undefined apparently
      const code = data.signup_code;

      router.push(`/bet/${code}`);
    },
  });

  const joinSchemaInput = v.object({
    code: v.string("Veuillez fournir un code", [v.length(5, "Le code doit faire 5 caractères")]),
  });

  type JoinSchemaInput = v.Input<typeof joinSchemaInput>;

  const form = useForm<JoinSchemaInput>({
    resolver: valibotResolver(joinSchemaInput),
  });

  const onSubmit: SubmitHandler<JoinSchemaInput> = async data => join({ code: data.code });

  return (
    <section className="container mt-12">
      <Dialog
        open={action === "create"}
        onOpenChange={async open => setAction(open ? "create" : "")}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
            <FormField
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-full max-w-[500px] text-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg">Rejoindre le pari</Button>
          </form>
        </Form>

        <DialogTrigger asChild>
          <Button className="my-12" onClick={async () => setAction("create")}>
            Créer un nouveau pari
          </Button>
        </DialogTrigger>

        <DialogContent>
          <NewBetForm />
        </DialogContent>
      </Dialog>
      <BetTable array={data} isLoading={isLoading} />
    </section>
  );
}
