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
interface Option {
  optionName: BetDetailsSchemaOutput["options"][number]["text"];
  optionId: BetDetailsSchemaOutput["options"][number]["id"];
}

interface BetFormProps extends Pick<BetDetailsSchemaOutput, "id" | "name">, Option {
  betId: number;
}

export default function BetForm({ name, id, optionName, optionId, betId }: BetFormProps) {
  const { form, onSubmit, isPending, isError } = useBetForm(optionId, betId);

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
                <FormLabel>Montant (en €)</FormLabel>
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
