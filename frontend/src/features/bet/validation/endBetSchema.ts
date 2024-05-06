import * as v from "valibot";

const endBetSchema = v.object({
  winning_option_id: v.number("Veuillez renseignez une option valide"),
});

export default endBetSchema;

export type EndBetSchemaInput = v.Input<typeof endBetSchema>;
export type EndBetSchemaOutput = v.Output<typeof endBetSchema>;
