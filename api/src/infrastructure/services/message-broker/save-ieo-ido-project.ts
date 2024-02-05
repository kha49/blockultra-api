import { EntityManager } from 'typeorm';
import { SaveBase } from './save-base';
import { IeoIdoProject } from '../../../core/schemas/ieo-ido/ieo-ido-project';

export class SaveIeoIdoProject extends SaveBase<IeoIdoProject> {
  constructor(em: EntityManager) {
    super(em, IeoIdoProject);
  }
}
