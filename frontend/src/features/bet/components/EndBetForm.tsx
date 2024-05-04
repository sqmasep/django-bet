import { Form } from "~/components/ui/form";
import useEndBetForm from "../hooks/useEndBetForm";
import { Button } from "~/components/ui/button";

interface EndBetFormProps {
  signupCode: string;
}

export default function EndBetForm({ signupCode }: EndBetFormProps) {
  const { form, onSubmit, isPending, isError } = useEndBetForm(signupCode);

  return (
    <Form {...form}>
      <h2 className="border-b pb-2 text-xl font-bold">Êtes-vous sûr de terminer ce pari ?</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button disabled={isPending} type="submit" className="self-end">
          Je confirme !
        </Button>
      </form>
    </Form>
  );
}
