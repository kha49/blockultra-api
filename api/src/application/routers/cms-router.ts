import { EntityManager } from 'typeorm'; 
import { getAuthRouter }            from './admin-cms/auth.router';
import { getPermRouter }            from './admin-cms/perm.router';
import { getUserRouter }            from './admin-cms/user.router';
import { getRoleRouter }            from './admin-cms/role.router';
import { getCmsCoinRouter }         from './admin-cms/coin.router';
import { getCmsCategoryRouter }     from './admin-cms/category.router';
import { getCmsExchangeRouter }     from './admin-cms/exchange.router';
import { getCmsFundraisingRouter }  from './admin-cms/fundraising.router';
import { getCmsLaunchpadRouter }    from './admin-cms/launchpad.router';
import { getCmsWalletRouter }       from './admin-cms/wallet.router';
import { getCmsBackerRouter }       from './admin-cms/backer.router';
import { getFileRouter }            from './admin-cms/file.router';

export default function getCmsRouter(em: EntityManager) { 
  const authRouters            = getAuthRouter(em);
  const cmsCategoryRouters     = getCmsCategoryRouter(em);
  const cmsCoinRouters         = getCmsCoinRouter(em);
  const cmsExchangeRouters     = getCmsExchangeRouter(em);
  const cmsFundraisingRouters  = getCmsFundraisingRouter(em);
  const cmsLaunchpadRouters    = getCmsLaunchpadRouter(em);
  const cmsWalletRouters       = getCmsWalletRouter(em);
  const cmsBackerRouters       = getCmsBackerRouter(em);
  const permRouters            = getPermRouter(em);
  const roleRouters            = getRoleRouter(em);
  const userRouters            = getUserRouter(em);
  const fileRouters            = getFileRouter();
  return [
    ...permRouters,
    ...roleRouters,
    ...userRouters,
    ...fileRouters,
    ...authRouters,
    ...cmsCoinRouters,
    ...cmsCategoryRouters,
    ...cmsExchangeRouters,
    ...cmsFundraisingRouters,
    ...cmsLaunchpadRouters,
    ...cmsWalletRouters,
    ...cmsBackerRouters,
 
  ];
}
