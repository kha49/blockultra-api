import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class BcryptUtil {
  public static async hash(password: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public static async compare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  public static generateAccessToken(payload: any) {
    const secretKey = process.env.JWT_SECRET || '74YLbq4%c!wU ';
    const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  }

  public static generateRefreshToken(payload: any) {
    const secretKeyRefreshToken =
      process.env.JWT_REFRESH_TOKEN_SECRET || '7jML9q4-c!s0';
    const expiresInForRefreshToken = 86400 + 's';
    return jwt.sign(payload, secretKeyRefreshToken, { expiresIn: expiresInForRefreshToken });
  }

  public static async verify(token: string): Promise<any> {
    const secretKey = process.env.JWT_SECRET || '74YLbq4%c!wU ';
    return await jwt.verify(token, secretKey);
  }

  public static getUserNameByToken(token: string): string {
    const decoded: any = jwt.decode(token);
    return decoded.username;
  }
}
