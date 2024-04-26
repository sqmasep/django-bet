import * as v from "valibot";

const newBetSchema = v.object({
  name: v.string("Veuillez donner un nom à votre pari"),
  options: v.array(
    v.object({
      _id: v.string(),
      value: v.string("Veuillez donner une valeur à votre option"),
    }),
    [v.minLength(2, "Veuillez ajouter au moins 2 options")],
  ),
  maxDate: v.date("Date invalide"),
});

export default newBetSchema;

export type NewBetSchemaInput = v.Input<typeof newBetSchema>;
