import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label: React.ReactNode;
  children: (arg: {field: }) => React.ReactNode;
  form: UseFormReturn<TFieldValues>;
};

export default function Field<TForm extends UseFormReturn<{ email: string }>>({
  name,
  label,
  children,
  form,
}: FieldProps<TForm>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {children({ field })}
            <Input placeholder="exemple@gmail.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
