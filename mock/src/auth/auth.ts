import { v1 as uuidv1 } from 'uuid';

export const account: Array<{ username: string; password: string }> = [
  {
    username: 'admin',
    password: 'e10adc3949ba59abbe56e057f20f883e', // 123456
  },
  {
    username: 'demo',
    password: 'e10adc3949ba59abbe56e057f20f883e', // 123456
  },
  // ...
];

export const loginData = {
  code: 200,
  message: '',
  data: {
    userId: '0f316e6dc33ec371ac5d19a91ec03b50',
    userName: 'admin',
    nickName: '管理员',
    token: uuidv1(),
    loginTime: '',
    expireTime: '',
    ipaddr: '',
    loginLocation: '',
    browser: '',
    os: '',
    username: 'admin',
    enabled: true,
    authorities: '',
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
  },
};

export const logoutData = {
  code: 200,
  message: '',
  data: '',
};

export const errorData = {
  code: 500,
  message: 'Error',
};
