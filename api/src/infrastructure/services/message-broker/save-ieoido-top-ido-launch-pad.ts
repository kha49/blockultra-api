import { EntityManager } from 'typeorm';
import { IeoIdoTopIdoLaunchPad } from '../../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';
import { SaveBase } from './save-base';

export class SaveIeoIdoTopIdoLaunchPad extends SaveBase<IeoIdoTopIdoLaunchPad> {
  constructor(em: EntityManager) {
    super(em, IeoIdoTopIdoLaunchPad);
  }
}
