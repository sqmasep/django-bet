import * as v from "valibot";

const betDetailsSchema = v.object({
  is_ended: v.boolean(),
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
  user_bets: v.array(
    v.object({
      id: v.number(),
      user: v.number(),
      user_username: v.string(),
      bet: v.number(),
      amount: v.string(),
      option: v.number(),
      date_placed: v.string(),
    }),
  ),
});

export default betDetailsSchema;

export type BetDetailsSchemaInput = v.Input<typeof betDetailsSchema>;
export type BetDetailsSchemaOutput = v.Output<typeof betDetailsSchema>;
