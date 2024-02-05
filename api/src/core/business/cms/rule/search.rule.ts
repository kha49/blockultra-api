export class BusinessSearchRule {
  static DEFAULT_NUMBER_GLOBAL_SEARCH_RESULT = 5;
  
  static SELECT_COIN_PROPS                   = ['key', 'rank', 'name', 'symbol', 'image', 'price'];
  static SELECT_IEO_IDO_PROPS                = ['key', 'name', 'symbol', 'image', 'start_date'];
  static SELECT_CATEGORY_PROPS               = ['id',  'name', 'slug'];
  static SELECT_FUNDRAISING_PROPS            = ['slug', 'name', 'symbol', 'image'];
  static SELECT_TRENDING_PROPS               = ['key', 'name', 'symbol', 'image', 'rank'];
  static SELECT_IEO_IDO_TOP_LAUNCH_PAD_PROPS = ['key', 'name', 'image', 'icon'];
  static SELECT_IEO_IDO_ENDED_PROPS          = ['key', 'name', 'symbol', 'image'];
  static SELECT_IEO_IDO_UPCOMING_PROPS       = ['key', 'name', 'symbol', 'image'];
  static SELECT_TOKEN_UNLOCK_PROPS           = ['key', 'name', 'icon', 'image'];
  static SELECT_EXCHANGE_SPOT_PROPS          = ['key', 'name', 'icon'];
  static SELECT_LAUNCH_PAD_PROJECT_PROPS     = ['key', 'name', 'icon', 'image'];
  static SELECT_TOPBACKER_PROPS              = ['slug', 'name', 'logo'];
}

export default BusinessSearchRule;
