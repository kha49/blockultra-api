import { BcryptUtil } from '../../../core/utils/bcrypt.util';
import { IUserService } from '../../../core/interfaces/user';

export class AuthFlow {
  private readonly service;
  constructor(_service: IUserService) {
    this.service = _service;
  }

  async login(username: string, password: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ username });
    let user = await query.getOne();
    if (!user) {
      return { status: 'error', result: {} };
    }

    const isMatched = await BcryptUtil.compare(password, user.password);
    if (!isMatched) {
      return { status: 'error', result: {} };
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = await BcryptUtil.generateAccessToken(payload);
    const refreshToken = await BcryptUtil.generateRefreshToken(payload);
    user.hash_refresh_token = refreshToken;
    await this.service.update(user);
    return { status: 'success', result: { accessToken, refreshToken, user } };
  }

  async refreshToken(access_token: string, refresh_token: string) {
    var username = BcryptUtil.getUserNameByToken(access_token);
    const query = await this.service.getQueryBuilder();
    query.where({ username });
    let user = await query.findOne();
    if (user) {
      const isRefreshTokenMatching = await BcryptUtil.compare(
        refresh_token,
        user.hash_refresh_token,
      );
      if (isRefreshTokenMatching) {
        return { status: 'error', result: null };
      }
      const payload = { username: user.username };
      const accessToken = await BcryptUtil.generateAccessToken(payload);
      return { status: 'success', result: accessToken };
    }
    return { status: 'error', result: null };
  }
}

export default AuthFlow;
