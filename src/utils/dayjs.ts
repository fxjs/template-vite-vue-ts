import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import quarterOfYear from 'dayjs/plugin/quarterOfYear'; // dayjs 季度操作插件

dayjs.extend(LocalizedFormat);
dayjs.extend(quarterOfYear);

dayjs.locale('zh-cn');

export { dayjs };
