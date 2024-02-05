import { EntityManager } from 'typeorm';
import { IPerm } from '../../../core/interfaces/core/perm.service';
import { Perm } from '../../../core/schemas/core/perm';
import { PermService } from '../../../infrastructure/services/core/perm.service';

export class VerifyPermFlow {
  private readonly em: EntityManager;
  private readonly permService: IPerm;
  constructor(em: EntityManager, _permService: IPerm) {
    this.em = em; 
    this.permService = new PermService(this.em.getRepository(Perm));
  }

  async execute(user_id: number, urlRequest: string, httpMethod: string) {
    var perms = await this.permService.verifyPerm(user_id);
    const module = this.findModule(urlRequest);
    const action = this.findAction(urlRequest, httpMethod);
    var perm = perms.find(
      (x: any) => x.module == module && x.action == action.toLowerCase(),
    );
    return perm;
  }

  private findModule(urlRequest: string) {
    const request = urlRequest.replace('/api/', '');
    const module = request.split('/')[0];
    return module;
  }

  private findAction(urlRequest: string, httpMethod: string) {
    const request = urlRequest.replace('/api/', '');
    const apiRequest = request.split('/');
    const action = apiRequest.length > 2 ? apiRequest[1] : httpMethod;
    return action;
  }
}

export default VerifyPermFlow;
