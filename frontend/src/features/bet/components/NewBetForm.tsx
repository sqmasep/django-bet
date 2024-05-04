import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import useNewBetForm from "../hooks/useNewBetForm";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DateTimePicker } from "~/components/ui/date-time-picker";
import { useState } from "react";
import { Trash } from "lucide-react";

export default function NewBetForm() {
  const [options, setOptions] = useState<{ _id: number; value: string }[]>([
    { _id: "1", value: "" },
    { _id: "2", value: "" },
  ]);
  const { form, onSubmit } = useNewBetForm();

  return (
    <div>
      <Form {...form}>
        <h2 className="border-b pb-2 text-xl font-bold">Créer un pari</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du pari</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxDate"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel>Date et heure de fin</FormLabel>
                <FormControl>
                  <DateTimePicker onChange={field.onChange} selected={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-md border py-2">
            <span className="mb-2 block px-2 text-sm font-bold">Options</span>
            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <div className="grid max-h-48 gap-2 overflow-y-auto p-2">
                  {options.map((option, i) => (
                    <FormItem key={option._id} className="grid gap-1">
                      <FormControl className="relative">
                        <div>
                          <Input
                            // la singerie que j'ai fait là
                            {...(i === 0
                              ? {
                                  ref: field.ref,
                                }
                              : {})}
                            placeholder={`Option n°${i + 1}`}
                            value={field.value[i]?.value || option.value}
                            onChange={e => {
                              const value = e.target.value;
                              const newOptions = options.map(o =>
                                o._id === option._id ? { ...o, value } : o,
                              );
                              setOptions(newOptions);
                              field.onChange(newOptions);
                            }}
                          />

                          {i > 1 && (
                            <Button
                              type="button"
                              size="icon"
                              className="absolute right-0 top-0"
                              variant="ghost"
                              onClick={() => {
                                const newOptions = options.filter(o => o._id !== option._id);
                                setOptions(newOptions);
                                field.onChange(newOptions);
                              }}
                            >
                              <Trash className="size-4" />
                            </Button>
                          )}
                        </div>
                      </FormControl>

                      {/* // TODO this says "undefined" if you submit while having at least 1 option */}
                      {i === options.length - 1 && !!options.filter(Boolean).length < 2 && (
                        <FormMessage />
                      )}
                    </FormItem>
                  ))}
                </div>
              )}
            />

            <div className="mx-2">
              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                onClick={() => {
                  setOptions(prev => [...prev, { _id: Math.random() * 1000, value: "" }]);
                }}
              >
                Ajouter une option
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Créer un pari
          </Button>
        </form>
      </Form>
    </div>
  );
}
