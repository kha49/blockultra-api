import { ConnectionOptions } from 'typeorm';
import { Coin } from '../../core/schemas/home/coin';
import { Category } from '../../core/schemas/category';
import { Fundraising } from '../../core/schemas/home/fundraising';
import { Trending } from '../../core/schemas/home/trending';
import { Gainer } from '../../core/schemas/home/gainer';
import { Loser } from '../../core/schemas/home/loser';
import { Global } from '../../core/schemas/common/global';
import { TokenUnlock } from '../../core/schemas/unlock/token-unlock';
import { ExchangeSpot } from '../../core/schemas/exchange/exchange-spot';
import { CoinMarketSpot } from '../../core/schemas/coin-detail/market/coin-market-spot';
import { CoinMarketHistorical } from '../../core/schemas/coin-detail/market/coin-market-historical';
import { Tag } from '../../core/schemas/common/tag';
import { CoinFundraising } from '../../core/schemas/coin-detail/fundraising/coin-fundraising';
import { Vesting } from '../../core/schemas/coin-detail/tokenomic/vesting';
import { Allocation } from '../../core/schemas/coin-detail/tokenomic/allocation';
import { Backer } from '../../core/schemas/backer';
import { CoinIeoIdo } from '../../core/schemas/coin-detail/ieo-ido/coin-ieo-ido';
import { ExchangeDetailSpot } from '../../core/schemas/exchange/exchange-detail-spot';
import { IeoIdoTopIdoLaunchPad } from '../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';
import { CategoryVolumn } from '../../core/schemas/common/category-volume';
import { IdoVolume } from '../../core/schemas/common/ido-volume';
import { IeoIdoProject } from '../../core/schemas/ieo-ido/ieo-ido-project';
import { User } from '../../core/schemas/core/user';
import { Perm } from '../../core/schemas/core/perm';
import { Role } from '../../core/schemas/core/role';
import { RolePerm } from '../../core/schemas/core/role_perm';
import { UserRole } from '../../core/schemas/core/users-roles';
import { Exchange } from '../../core/schemas/cms/exchange';
import { Wallet } from '../../core/schemas/cms/wallet';
import { Launchpad } from '../../core/schemas/cms/launchpad';

require('dotenv').config();

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  entities: [
    Exchange,
    Wallet,
    Launchpad,
    Coin,
    Category,
    Fundraising,
    Trending,
    Gainer,
    Loser,
    IeoIdoProject,
    Global,
    TokenUnlock,
    ExchangeSpot,
    CoinMarketHistorical,
    CoinMarketSpot,
    Tag,
    CoinFundraising,
    CoinIeoIdo,
    Vesting,
    Allocation,
    Backer,
    ExchangeDetailSpot,
    IeoIdoTopIdoLaunchPad,
    CategoryVolumn,
    IdoVolume,
    User,
    Perm,
    Role,
    RolePerm,
    UserRole,
  ],
  migrations: ['src/infrastructure/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/infrastructure/migrations',
  },
};

export default typeOrmConfig;
