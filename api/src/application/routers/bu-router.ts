import { EntityManager } from 'typeorm';
import { getCoinRouter }        from './block-ultra/coin.router';
import { getCommonRouter }      from './block-ultra/common.router';
import { getTokenUnlockRouter } from './block-ultra/token-unlock.router';
import { getExchangeRouter }    from './block-ultra/exchange.router';
import { getIeoIdoRouter }      from './block-ultra/ieo-ido.router';
import { getFundraisingRouter } from './block-ultra/fundraising.router';
import { getCategoryRouter }    from './block-ultra/category.router';
import { getTrendingRouter }    from './block-ultra/trending.router';
import { getGainerLoserRouter } from './block-ultra/gainer-loser.router';

export default function getBuRouter(em: EntityManager) {
  const coinRouters            = getCoinRouter(em);
  const getCommonRouters       = getCommonRouter(em);
  const getTokenUnlockRouters  = getTokenUnlockRouter(em);
  const getExchangeRouters     = getExchangeRouter(em);
  const getIeoIdoRouters       = getIeoIdoRouter(em);
  const categoryRouterrs       = getCategoryRouter(em);
  const getFundraisingRouters  = getFundraisingRouter(em);
  const trendingRouters        = getTrendingRouter(em);
  const gainerLoserRouters     = getGainerLoserRouter(em);
  
  return [
    ...coinRouters,
    ...getCommonRouters,
    ...getTokenUnlockRouters,
    ...getExchangeRouters, 
    ...getIeoIdoRouters,
    ...getFundraisingRouters,
    ...categoryRouterrs,
    ...trendingRouters,
    ...gainerLoserRouters,
  ];
}
