import * as v from "valibot";

const betDetailsSchema = v.object({
  id: v.number(),
  name: v.string(),
  author: v.number(),
  users: v.array(v.number()),
  signup_code: v.string(),
  options: v.array(
    v.object({
      id: v.number(),
      text: v.string(),
      // users: v.array(v.any()),
      total_amount: v.string(),
      number_of_bets: v.number(),
    }),
  ),
});

export default betDetailsSchema;

export type BetDetailsSchemaInput = v.Input<typeof betDetailsSchema>;
export type BetDetailsSchemaOutput = v.Output<typeof betDetailsSchema>;
