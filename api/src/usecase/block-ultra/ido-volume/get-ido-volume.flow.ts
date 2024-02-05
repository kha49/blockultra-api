import { IIdoVolumnService } from '../../../core/interfaces/ido-volume';
import BusinessCategoryVolume from '../../../core/business/block-ultra/logic/category-volumn.logic';
import { DateUtil } from '../../../core/utils/date.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';
import { UrlUtil } from '../../../core/utils/url.util';

export class GetIdoVolumeFlow {
  constructor(private readonly service: IIdoVolumnService) {}

  async execute(ido_platform_id: number, time: string) {
    let result = null;
    const query = await this.service.getQueryBuilder();
    query.where({ ido_platform_id });
    const volumns = await query.getMany();
    if (volumns.length > 0) {
      result = BusinessCategoryVolume.calculatorVolume(volumns, time);
    } else {
      const dateNow = DateUtil.getCurrentDate(0, 0);
      const param = `idoPlatformId=${ido_platform_id}&from=${dateNow}`;
      const url = UrlUtil.getVolumnForCoinGroup(param);
      const response = await AxiosService.get(url);
      if (response.data.data.length > 0) {
        result = BusinessCategoryVolume.calculatorVolume(
          response.data.data,
          time,
        );
        const volumes = response.data.data.map((item: any) => {
          return {
            ...item,
            ido_platform_id,
          };
        });
        this.service.batchInsert(volumes, 500);
      }
    }

    return result;
  }
}

export default GetIdoVolumeFlow;
