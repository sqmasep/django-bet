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
import useNewBetForm from "../hooks/useNewBetForm";

interface NewBetFormProps {}

export default function NewBetForm(props: NewBetFormProps) {
  const { form, onSubmit } = useNewBetForm();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="option"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Option</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Parier
          </Button>
        </form>
      </Form>
    </div>
  );
}
