import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { IeoIdoTopIdoLaunchPad } from '../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';

export class IeoIdoTopIdoLaunchPadService extends BaseService<IeoIdoTopIdoLaunchPad> {
  constructor(private readonly repo: Repository<IeoIdoTopIdoLaunchPad>) {
    super(repo);
  }
}
