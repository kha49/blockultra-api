import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import BusinessIeoIdo from '../../../core/business/block-ultra/logic/ieo-ido.logic';

import { IeoIdoTopIdoLaunchPad }    from '../../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';
import { Coin }                     from '../../../core/schemas/home/coin';
import { IdoVolume }                from '../../../core/schemas/common/ido-volume';
import { IeoIdoProject }            from '../../../core/schemas/ieo-ido/ieo-ido-project';

import { IeoIdoTopIdoLaunchPadService } from '../../../infrastructure/services/ieo-ido-top-ido-launch-pad.service';
import { IeoIdoProjectService }         from '../../../infrastructure/services/ieo-ido-project.service';
import { CoinService }                  from '../../../infrastructure/services/coin.service';
import { IdoVolumnService }             from '../../../infrastructure/services/ido-volume.service'; 

import GetLaunchPadFlow                from '../../../usecase/block-ultra/ieo-ido/top-ido-launch-pad/get-launch-pad.flow';
import GetIEOIDOListFlow               from '../../../usecase/block-ultra/ieo-ido/upcoming/get-list-ieo-ido.flow';
import GetIeoIdoTopLaunchPadFlow       from '../../../usecase/block-ultra/ieo-ido/top-ido-launch-pad/get-list-ieo-ido-top-ido-launch-pad.flow';
import SearchIeoIdoUpComingFlow        from '../../../usecase/block-ultra/ieo-ido/upcoming/search-ieo-ido-up-coming.flow';
import SearchIeoIdoEndedFlow           from '../../../usecase/block-ultra/ieo-ido/ended/search-ieoido-ended.flow';
import SearchIeoIdoTopIdoLaunchPadFlow from '../../../usecase/block-ultra/ieo-ido/top-ido-launch-pad/search-ieo-ido-top-ido-launch-pad.flow';
import GetIdoVolumeFlow                from '../../../usecase/block-ultra/ido-volume/get-ido-volume.flow';
import SearchLaunchPadProjectFlow      from '../../../usecase/block-ultra/ieo-ido/top-ido-launch-pad/search-launchpad-project.flow';
import GetLaunchPadProjectFlow         from '../../../usecase/block-ultra/ieo-ido/top-ido-launch-pad/get-launchpad-project.flow';
import SearchIeoIdoFilterFlow          from '../../../usecase/block-ultra/ieo-ido/upcoming/search-ieoIdo-filter.flow';

export class IeoIdoCtrl {
  private getIeoIdoListFlow;
  private getIeoIdoTopLaunchPadListFlow;
  private getLaunchPadFlow;
  private searchIeoIdoUpComingFlow;
  private searchIeoIdoEndedFlow;
  private searchIeoIdoTopIdoLaunchPadFlow;
  private getIdoVolumeFlow;
  private getLaunchPadProjectFlow;
  private searchLaunchPadProjectFlow;
  private searchIeoIdoFilterFlow;

  constructor(private readonly em: EntityManager) {
    const ieoIdoProjectService      = new IeoIdoProjectService(this.em.getRepository(IeoIdoProject),);
    const ieoidoTopLaunchPadService = new IeoIdoTopIdoLaunchPadService(this.em.getRepository(IeoIdoTopIdoLaunchPad),);
    const coinService               = new CoinService(this.em.getRepository(Coin));
    const idoVolumnService          = new IdoVolumnService(this.em.getRepository(IdoVolume),);

    this.getIeoIdoListFlow               = new GetIEOIDOListFlow(ieoIdoProjectService);
    this.getLaunchPadFlow                = new GetLaunchPadFlow(ieoidoTopLaunchPadService,coinService);
    this.getIeoIdoTopLaunchPadListFlow   = new GetIeoIdoTopLaunchPadFlow(ieoidoTopLaunchPadService);
    this.searchIeoIdoUpComingFlow        = new SearchIeoIdoUpComingFlow(ieoIdoProjectService);
    this.searchIeoIdoEndedFlow           = new SearchIeoIdoEndedFlow(ieoIdoProjectService);
    this.searchIeoIdoTopIdoLaunchPadFlow = new SearchIeoIdoTopIdoLaunchPadFlow(ieoidoTopLaunchPadService);
    this.getIdoVolumeFlow                = new GetIdoVolumeFlow(idoVolumnService);
    this.getLaunchPadProjectFlow         = new GetLaunchPadProjectFlow(ieoIdoProjectService, coinService);
    this.searchLaunchPadProjectFlow      = new SearchLaunchPadProjectFlow(ieoIdoProjectService);
    this.searchIeoIdoFilterFlow          = new SearchIeoIdoFilterFlow(ieoIdoProjectService);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key, sort_by, sort_order, limit, page, status, is_hot } = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'start_date';
    sort_order = sort_order ? sort_order : 'asc';
    const datas = await this.getIeoIdoListFlow.execute(
      status as string,
      is_hot as string,
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }
 
  async listTopIdoLaunchPad(ctx: Koa.Context, _next: Koa.Next) {
    let { sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'marketCap';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getIeoIdoTopLaunchPadListFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async getLaunchPad(ctx: Koa.Context, _next: Koa.Next) {
    const { key, time } = ctx.query;
    const launchPad    = await this.getLaunchPadFlow.execute(key as string);
    const idoVolume    = await this.getIdoVolumeFlow.execute(launchPad.id, time as string);
    const dataFormated = BusinessIeoIdo.getLaunchPadDetail(launchPad, idoVolume);
    ctx.status = 200;
    ctx.body = dataFormated;
  }

  async getLaunchPadProject(ctx: Koa.Context, _next: Koa.Next) {
    let {status, key, search_key, sort_by, sort_order, limit, page, is_hot} = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'start_date';
    sort_order = sort_order ? sort_order : 'asc';
    const projects = await this.getLaunchPadProjectFlow.execute({
      key: key as string,
      status: status as 'past' | 'upcoming',
      search_key: search_key as string,
      sort_by: sort_by as string,
      sort_order: sort_order as 'asc' | 'desc',
      limit: parseInt(limit as string),
      page: parseInt(page as string),
      is_hot: is_hot as string
    });
    ctx.status = 200;
    ctx.body = projects;
  }

  async searchLaunchPadProject(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchLaunchPadProjectFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async searchIeoIdoUpComing(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchIeoIdoUpComingFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async searchIeoIdoEnded(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchIeoIdoEndedFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async searchIeoIdoTopIdoLaunchPad(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchIeoIdoTopIdoLaunchPadFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async search(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchIeoIdoFilterFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }
}
