import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import AddToBalanceForm from "~/features/profile/components/AddToBalanceForm";

export default function Profile() {
  return (
    <section className="container">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Ajouter de l'argent</Button>
        </DialogTrigger>
        <DialogContent>
          <AddToBalanceForm />
        </DialogContent>
      </Dialog>
    </section>
  );
}
