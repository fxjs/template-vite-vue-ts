import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { code: 200, data: new Date().getTime(), message: 'success' };
  }
}
