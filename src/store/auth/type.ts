export interface IAuthState {
  /** 用户信息 */
  userInfo: Partial<ILoginRes>;
}

/**
 * 登录接口返回的信息
 */
export interface ILoginRes {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: string;
  browser: string;
  credentialsNonExpired: true;
  enabled: true;
  expireTime: string;
  ipaddr: string;
  loginLocation: string;
  loginTime: string;
  nickName: string;
  os: string;
  token: string;
  userId: string;
  userName: string;
  username: string;
}
