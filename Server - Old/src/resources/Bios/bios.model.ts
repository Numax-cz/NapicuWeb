import joi from "joi";
import {BiosWaitListPOSTApiModel} from "../../interface/Model";


export const EmailSchema = joi.object<BiosWaitListPOSTApiModel>({
  email: joi.string().required().email(),
});
