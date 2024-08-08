// 验证规则函数

/*
 *联系电话正则
 */
import { FormItemRule } from 'naive-ui';

export function testTpl(value: any) {
  const phone =
    /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
  // 校验电话号码正则
  const tel = /^((0\d{2,3}))(\d{7,8})((\d{3,}))?$/;
  const _isTel = tel.test(value);
  const _isPhone = phone.test(value);
  return {
    // 校验手机号
    1: _isPhone,
    // 校验电话号码
    2: _isTel,
    // 同时校验手机号及电话号码
    3: _isPhone || _isTel,
  };
}

/*
 *验证联系方式
 *验证时required必传，true为必填，false非必填
 */
export function validatePhoneOrTels(rule: any, value: any, callback: any) {
  if (rule.required) {
    if (!value) {
      callback('联系方式不能为空');
    }
  } else {
    if (!value) {
      callback();
    }
  }
  if (value) {
    const result = testTpl(value);
    if (result[3]) {
      callback();
    } else {
      callback('请填写正确的联系方式');
    }
  }
}

/**
 * @description 验证联系方式 naive-ui
 * @param rule
 * @param value
 */
export function validatePhoneOrTel(rule: FormItemRule, value: string) {
  return new Promise<void>((resolve, reject) => {
    if (rule?.required) {
      if (!value) {
        reject(Error('联系方式不能为空'));
      }
    } else {
      if (!value) {
        resolve();
      }
    }
    if (value) {
      const result = testTpl(value);
      switch (rule?.key) {
        case 'phone':
          !result[1] ? reject(Error('请填写正确的手机号')) : resolve();
          break;
        case 'tel':
          !result[2] ? reject(Error('请填写正确的电话号码')) : resolve();
          break;
        default:
          !result[3] ? reject(Error('请填写正确的联系方式')) : resolve();
          break;
      }
    } else {
      resolve();
    }
  });
}

/**
 * 检验正负小数
 * @param rule
 * @param val
 * @param cb
 */
export function validateNumberWithMax(rule: any, val: any, cb: any) {
  const reg = /(^[\-0-9][0-9]*(\.[0-9]+)?)$/;
  const emptyMessage = rule.emptyMessage || '';
  if (!val) {
    cb(emptyMessage);
  } else {
    if (val.length > 8) {
      cb('最多8位数字');
    } else {
      if (reg.test(val)) {
        cb();
      } else {
        cb('请输入正确的数字');
      }
    }
  }
}

/*
邮政编码验证
*/
export function PostalCode(rule: any, value: any, cb: any) {
  if (!rule.required) {
    if (value) {
      if (value.length < 6) {
        cb('请输入正确的邮政编码');
      } else {
        cb();
      }
    } else {
      cb();
    }
  }
}
/**
 * 校验身份证号
 *验证时required必传，true为必填，false非必填
 */
export function identityCard(rule: any, value: any, callback: any) {
  if (!rule.required) {
    if (!value) {
      callback();
    }
  } else {
    if (!value) {
      callback('身份证号不能为空');
    }
  }
  if (value) {
    let code: any = value;
    const city: any = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 ',
    };
    const reg: any = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code.match(reg)) {
      callback('身份证号格式错误');
    } else if (!city[code.substr(0, 2)]) {
      callback('地址编码错误');
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17]) {
          callback('身份证最后一位不合格');
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  }
}

/*
    邮箱验证，非必填
*/
export function isEmail(rule: any, value: any, cb: any) {
  if (!rule.required) {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
      cb();
    } else {
      if (!filter.test(value)) {
        cb('请输入正确的邮箱号码');
      } else {
        cb();
      }
    }
  }
}

/*
数字字数限制，非必填
*/
export function maxLength(rule: any, value: any, cb: any) {
  if (!rule.required) {
    if (value) {
      if (value.length > 8) {
        cb('最多只可输入8位字符');
      } else {
        cb();
      }
    } else {
      cb();
    }
  }
}

/**
 * 校验经纬度
 */
export function validateJwd(data: { lng?: number; lat?: number; dqjd?: number; dqwd?: number }) {
  const { lng, lat, dqjd, dqwd } = data || {};
  const x = lng || dqjd;
  const y = lat || dqwd;

  return x && y && x !== -1 && y !== -1;
}

/**
 * 校验正整数
 */
export function validatePositiveInteger(rule: any, value: any, cb: any) {
  if (!rule.required) {
    if (value) {
      if (!/(^[1-9]\d*$)/.test(value)) {
        cb('应输入正整数');
      } else {
        cb();
      }
    } else {
      cb();
    }
  }
}
