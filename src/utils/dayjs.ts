import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn'; // 导入本地化语言

dayjs.extend(LocalizedFormat);
dayjs.locale('zh-cn');

export { dayjs };
