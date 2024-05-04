"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import useAddToBalanceForm from "../hooks/useAddToBalanceForm";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function AddToBalanceForm() {
  const { form, onSubmit, isPending, isError } = useAddToBalanceForm();

  return (
    <Form {...form}>
      <h2 className="border-b pb-2 text-xl font-bold">Ajouter de l'argent</h2>

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

        {isError && "Une erreur est survenue"}

        <Button disabled={isPending} type="submit" className="w-full">
          Ajouter
        </Button>
      </form>
    </Form>
  );
}
