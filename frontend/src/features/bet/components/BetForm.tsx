"use client";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import useBetForm from "../hooks/useBetForm";
import type { BetDetailsSchemaOutput } from "../validation/betDetailsSchema";
import { useAuth } from "~/features/auth/contexts/AuthProvider";
interface Option {
  optionName: BetDetailsSchemaOutput["options"][number]["text"];
  optionId: BetDetailsSchemaOutput["options"][number]["id"];
}

interface BetFormProps extends Pick<BetDetailsSchemaOutput, "id" | "name">, Option {
  betId: number;
  code: string;
}

export default function BetForm({ name, optionName, optionId, betId, code }: BetFormProps) {
  const { form, onSubmit, isPending, isError } = useBetForm(optionId, betId, code);
  const { user } = useAuth();

  return (
    <div>
      <Form {...form}>
        <h2 className="border-b pb-2 text-xl font-bold">{name}</h2>

        <h3 className="my-4 text-lg">Parier sur {optionName}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel className="inline-flex flex-wrap items-center justify-between">
                  <span>Montant (en €)</span>

                  <span className="text-xs">Balance: {user?.balance}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            Parier
          </Button>
        </form>
      </Form>
    </div>
  );
}
