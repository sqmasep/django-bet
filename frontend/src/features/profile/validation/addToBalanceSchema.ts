import * as v from "valibot";

const addToBalanceSchema = v.object({
  amount: v.number("Veuillez rentrer un montant valide", [
    v.minValue(1, "Vous ne pouvez pas ajouter moins d'un euro"),
    v.maxValue(1000, "Vous ne pouvez pas ajouter plus de 1000 euros"),
  ]),
});

export default addToBalanceSchema;

export type AddToBalanceSchemaInput = v.Input<typeof addToBalanceSchema>;
export type AddToBalanceSchemaOutput = v.Output<typeof addToBalanceSchema>;
