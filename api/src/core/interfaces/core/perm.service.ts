import { Perm } from "../../schemas/core/perm";
import { IBaseService } from "./base";

 
export interface IPerm extends IBaseService<Perm>{
  verifyPerm(userId: number): any;
}
