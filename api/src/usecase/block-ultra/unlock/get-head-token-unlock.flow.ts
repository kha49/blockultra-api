import BusinessUnlock from '../../../core/business/block-ultra/logic/unlock.logic';
import { BusinessUnlockRule } from '../../../core/business/block-ultra/rule/unlock.rule';
import { ITokenUnlock } from '../../../core/interfaces/token-unlock';

export class GetHeadTokenUnlockFLow {
  constructor(private readonly unlockService: ITokenUnlock) {}

  async execute() {
    const query = await this.unlockService.getQueryBuilder('tu');
    try {
      query.leftJoin('ieo_ido_project', 'iip', 'tu.key = iip.key');
      query.innerJoin('coins', 'c', 'tu.key = c.key');
      query.select(BusinessUnlockRule.SELECT_UNLOCK_PROPS);
      const datas = await query.getRawMany();
      const dataOnHead = BusinessUnlock.getDataUnlockOnHead(datas);
      return dataOnHead;
    } catch (error) {
      console.log(error);
    }
  }
}

export default GetHeadTokenUnlockFLow;
