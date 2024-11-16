import { Injectable } from '@nestjs/common';
import { account, errorData, loginData, logoutData } from './auth';

@Injectable()
export class AuthService {
  // 登录验证
  login(username: string, password: string) {
    const user = account.find((user) => user.username === username && user.password === password);

    if (!user) {
      return errorData; // 登录失败
    }

    // 登录成功，返回用户信息
    return loginData;
  }

  logout(userId: string) {
    return logoutData;
  }
}
