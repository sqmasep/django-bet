import * as v from "valibot";

const betSchema = v.object({
  amount: v.number("Veuillez rentrer un montant valide", [
    v.minValue(1, "Vous ne pouvez pas parier moins d'un euro"),
    v.maxValue(1000, "Vous ne pouvez pas parier plus de 1000 euros"),
  ]),
  option: v.string("Veuillez sélectionner une option", [v.uuid("Mauvais format d'option")]),
});

export default betSchema;

export type BetSchemaInput = v.Input<typeof betSchema>;