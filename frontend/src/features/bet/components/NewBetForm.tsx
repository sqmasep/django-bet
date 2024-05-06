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
import { Trash } from "lucide-react";

export default function NewBetForm() {
  const { form, optionsField, onSubmit } = useNewBetForm();

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
            <div className="grid max-h-48 gap-2 overflow-y-auto p-2">
              <FormItem className="grid gap-1">
                <FormField
                  name="options"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      {optionsField.fields.map((option, i) => (
                        <div key={option.id}>
                          <FormControl className="relative">
                            <div>
                              <Input
                                {...form.register(`options.${i}.text` as const)}
                                placeholder={`Option n°${i + 1}`}
                              />

                              {i > 1 && (
                                <Button
                                  type="button"
                                  size="icon"
                                  className="absolute right-0 top-0"
                                  variant="ghost"
                                  onClick={() => {
                                    optionsField.remove(i);
                                  }}
                                >
                                  <Trash className="size-4" />
                                </Button>
                              )}
                            </div>
                          </FormControl>
                        </div>
                      ))}
                    </>
                  )}
                />
              </FormItem>
            </div>
            {/* )}
            /> */}

            <div className="mx-2">
              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                onClick={() => {
                  optionsField.append({ text: "" });
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
