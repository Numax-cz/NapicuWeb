import joi from "joi";

export const PopJonanekCounterSchema = joi.object({
  counter: joi.number().required().min(0).max(1000)
});
