import joi from "joi";

export const PopJonanekCounterSchema = joi.object({
  clicks: joi.number().required().min(0).max(1000)
});
