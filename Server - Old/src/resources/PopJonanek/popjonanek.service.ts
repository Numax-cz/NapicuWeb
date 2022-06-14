import joi from "joi";
import {HttpException} from "../../exceptions/errors";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {PopJonanekCounter} from "../../entities/PopJonanek/counter";
import {PopJonanekCounterSchema} from "./popjonanek.model";
import {HttpResponse} from "../../util/HttpResponse";
import {NapicuAPIBasicPOSTResponse} from "../../interface/Responses";

export class PopjonanekService {
  public async addCount(inNum: number): Promise<HttpResponse<NapicuAPIBasicPOSTResponse>> {
    await PopJonanekCounterSchema.validateAsync({clicks: inNum}).catch((e: joi.ValidationErrorItem) => {
      throw new HttpException('Invalid request', HttpStatusCode.badRequest);
    });

    let counterDatabase = await PopJonanekCounter.findOne(0);
    if (counterDatabase) {
      counterDatabase.counter += inNum;
      await PopJonanekCounter.save(counterDatabase);
      return new HttpResponse<NapicuAPIBasicPOSTResponse>(HttpStatusCode.internalServerError, false, {msg: (counterDatabase.counter + inNum).toString()})
    } else {
      return new HttpResponse<NapicuAPIBasicPOSTResponse>(HttpStatusCode.internalServerError, false, {msg: "Internal server error"})
    }

  }
}
