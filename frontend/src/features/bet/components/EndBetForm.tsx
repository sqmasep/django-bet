import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import useEndBetForm from "../hooks/useEndBetForm";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface EndBetFormProps {
  signupCode: string;
  code: string;
  options: { id: number; text: string }[];
}

export default function EndBetForm({ signupCode, code, options }: EndBetFormProps) {
  const { form, onSubmit, isPending } = useEndBetForm(signupCode, code);

  return (
    <Form {...form}>
      <h2 className="border-b pb-2 text-xl font-bold">Êtes-vous sûr de terminer ce pari ?</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="winning_option_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option gagnante</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={value => field.onChange(Number(value))}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        <span className="text-muted-foreground/60">Sélectionnez une option</span>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(option => (
                      <SelectItem value={option.id} key={option.id}>
                        {option.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="mt-4">
          Je confirme !
        </Button>
      </form>
    </Form>
  );
}
