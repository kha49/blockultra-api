export class ConstVariableUtil {
  public static ADMIN_ID = 1;
  public static PASSWORD_DEFAULT = '123456';
  public static STATUS_INACTIVE = 0;
  public static ACCESS_TOKEN = 'access-token';
  public static REFRESH_TOKEN = 'refresh-token';

  public static STATUS_400 = 'bad request';
  public static STATUS_401 = 'unauthorized';
  public static STATUS_404 = 'not found';

  public static INVALID_TOKEN = 'Invalid token';
  public static SEED_QUEUE_NAME = 'processSeedData';

  public static PROFILE_TYPE = {
    PUBLIC: '[]',
    ADMIN: "1",
    STAFF: "2",
  };
}
