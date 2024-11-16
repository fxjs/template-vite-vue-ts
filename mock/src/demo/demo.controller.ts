import { Controller, Get, Post } from '@nestjs/common';
import { pageData, pageDetailData } from './demo';

@Controller('demo/v1')
export class DemoController {
  @Post('queryPageList')
  queryPageList() {
    return pageData;
  }

  @Get('queryInspectInfoById')
  queryInspectInfoById() {
    return pageDetailData;
  }

  // 其它demo接口暂未实现
}
