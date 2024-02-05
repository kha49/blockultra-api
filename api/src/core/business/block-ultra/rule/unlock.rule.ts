export class BusinessUnlockRule {
  static SELECT_UNLOCK_PROPS = [
    'tu.key AS key',
    'tu.symbol AS symbol',
    'tu.image AS image',
    'tu.name AS name',
    'tu.price AS price',
    'tu.marketCap AS marketCap',
    'tu.nextUnlocks AS nextUnlocks',
    'tu.unlockedTokensPercent AS unlockedTokensPercent',
    'tu.lockedTokensPercent AS lockedTokensPercent',
    'tu.unlockedTokens AS unlockedTokens',
    'tu.lockedTokens AS lockedTokens',
    'iip.launchpads AS launchpads',
    'iip.roi AS roi',
    'c.histPrices AS histPrices',
  ];
}
