
/**
 * @desc  截取小数后2位
 * @param {String} [str]
 * @return {String}
 * @example
 */
export function fixed2 (str) {
  let stss = str.toString()
  if (stss.indexOf('.', 0) > 0) {
    stss = stss + '00'
    return stss.substring(0, stss.indexOf('.', 0) + 3)
  } else if (stss.indexOf('.', 0) === 0) {
    stss = '0' + stss + '00'
    return stss.substring(0, stss.indexOf('.', 0) + 3)
  } else {
    stss = stss + '.00'
    return stss.substring(0, stss.indexOf('.', 0) + 3)
  }
}

/**
* @desc  截取小数后2位(负数通用) '-.2365' --> '-0.23'
* @param {String} [str]
* @return {String}
* @example
*/
export function fixed2n (str) {
  let stss = str.toString()
  let symbol = ''
  if (stss.substr(0, 1) === '-') {
    stss = stss.substr(1)
    symbol = '-'
  }
  if (stss.indexOf('.', 0) > 0) {
    stss = stss + '00'
    return symbol + stss.substring(0, stss.indexOf('.', 0) + 3)
  } else if (stss.indexOf('.', 0) === 0) {
    stss = '0' + stss + '00'
    return symbol + stss.substring(0, stss.indexOf('.', 0) + 3)
  } else {
    stss = stss + '.00'
    return symbol + stss.substring(0, stss.indexOf('.', 0) + 3)
  }
}

/**
* @desc  格式化为yyyy年mm月dd日
* @param {String} [s] 日期字符串
* @return {String}
* @example formatDate('20180917201010') = '2018年09月17日'
*/
export function formatDate (s) {
  if (s.length < 8) {
    return s
  }
  return s ? s.substr('0', '4') + '年' + s.substr('4', '2') + '月' + s.substr('6', '2') + '日' : ''
};
/**
* @desc  格式化为yyyy年mm月dd日
* @param {String} [s] 日期字符串
* @return {String}
* @example formatDate('2018-09-17') = '2018年09月17日'
*/
export function formatDate2 (s) {
  if (s.length < 8) {
    return s
  }
  return s ? s.substr('0', '4') + '年' + s.substr('5', '2') + '月' + s.substr('8', '2') + '日' : ''
};
/**
 * @desc 格式化为yyyy-mm-dd
 * @param {String} [s] 日期字符串
 * @return {String}
 * @example formatDate('20180917201010') = '2018-09-17'
 */
export function formatDate1 (s) {
  if (s.length < 8) {
    return s
  }
  s = s.replace(/-/g, '').replace(/\s/g, '')
  return s ? s.substr('0', '4') + '-' + s.substr('4', '2') + '-' + s.substr('6', '2') : ''
}

/**
 *
 * @desc  金额每千位 加入分隔符 格式化方法
 * @author zhulijian 2018-09-02
 * @param {number} [n] 金额数字
 * @param {number} [c] 保留小数位数
 * @param {String} [d] 小数点用什么字符表示，默认'.'
 * @param {String} [t] 每千位数字分隔所用字符,默认','
 * @return {String}
 * @example  _fmtMoney(18299.00, 2, ".", ",")
 */
export function _fmtMoney (n, c, d, t) {
  let p = n < 0 ? '-' : ''
  n = Number(n).toFixed(c)
  c = Math.abs(c) + 1 ? c : 2
  d = d || '.'
  t = t || ','
  let m = /(\d+)(?:(\.\d+)|)/.exec(n + '')
  let x = m[1].length > 3 ? m[1].length % 3 : 0
  return (
    p + (x ? m[1].substr(0, x) + t : '') +
    m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + (+m[2] || 0).toFixed(c).substr(2) : '')
  )
}
export function fmtAmtCopy (s) {
  try {
    return _fmtMoneyCopy(1.0 * s, 2, '.', '')
  } catch (e) {
    return '0.00'
  }
}
export function _fmtMoneyCopy (n, c, d, t) {
  let p = n < 0 ? '-' : ''
  n = Number(n).toFixed(c)
  c = Math.abs(c) + 1 ? c : 2
  d = d || '.'
  t = t || ''
  let m = /(\d+)(?:(\.\d+)|)/.exec(n + '')
  let x = 0
  return (
    p + (x ? m[1].substr(0, x) + t : '') +
    m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + (+m[2] || 0).toFixed(c).substr(2) : '')
  )
}
/**
 * @desc  金额千位格式化，不保留小数
 * @author zhulijian 2018-09-04
 * @param {String|numnber} [s] 金额数字
 * @return {String}
 * @example fmtAmt0s('1000.00') = '1,000'
 */
export function fmtAmt0s (s) {
  try {
    return _fmtMoney(1.0 * s, 0, '', ',')
  } catch (e) {
    return '0'
  }
}

/**
 * @desc  金额千位格式化，保留两位小数
 * @author zhulijian 2018-09-04
 * @param {String|numnber} [s] 金额数字
 * @return {String}
 * @example fmtAmt('1000') = '1,000.00'
 */
export function fmtAmt (s) {
  try {
    return _fmtMoney(1.0 * s, 2, '.', ',')
  } catch (e) {
    return '0.00'
  }
}


/**
 * @desc 金额千位格式化，保留四位小数，用于利率等
 * @author zhulijian 2018-09-04
 * @param {String|numnber} [s] 金额数字
 * @return {String}
 * @example fmtAmt4s('1000') = '1,000.0000'
 */
export function fmtAmt4s (s) {
  try {
    return _fmtMoney(1.0 * s, 4, '.', ',')
  } catch (e) {
    return '0.0000'
  }
}
/**
 * @desc 金额去格式化,去除掉','
 * @author zhulijian 2018-09-04
 * @param {String} [s] 金额数字字符串
 * @return {String}
 * @example unfmtAmt('12,300.32') = '12300.32'
 */
export function unfmtAmt (s) {
  s = s + ''
  if (s.replace(/,/g, '').split('.')[1] === '00') {
    return s.replace(/,/g, '').split('.')[0]
  } else {
    return s.replace(/,/g, '')
  }
}
/**
 * @desc  金额千位格式化，保留两位小数,不符合金钱格式的报错（最多11位整数，两位小数）
 * @author zhulijian 2018-09-04
 * @param {String|numnber} [s] 金额数字
 * @return {String}
 * @example fmtAmta('1000') = '1,000.00'
 */
export function fmtAmta (s) {
  if (s != '') {
    if (checkMoney(s)) {
      try {
        return _fmtMoney(1.0 * s, 2, '.', ',')
      } catch (e) {
        return '0.00'
      }
    } else {
      // HZBank.showFail('金额格式有误，不能为空，只允许数字，整数部分最多11位，小数最多2位，且不能为负数！')
      return s
    }
  }
}

/**
 * @desc   检查金额是否符合格式，不能为空，只允许数字，整数部分最多11位，小数最多2位，且不能为负数！
 * @param {String} [numStr] 身份证号
 * @return {Boolean}
 * @example checkMoney('12312') = true
 */
export function checkMoney (numStr) {
  let regStr = /^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/
  return regStr.test(numStr)
}

/**
 * @desc  帐号格式化 去除 空格 分隔符
 * @param {String} [accountNo] 帐号
 * @return {String}
 * @example accountNo('6222 63263 326723 32 132 ') = '62226326332672332132 '
 */
export function removeSpace (accountNo) {
  return String(accountNo).replace(/\s/g, '')
}

/**
 * format(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * @desc 日期格式化的原型方法
 * @author zhulijian 2018-09-02
 * @param {Object} 【new Date()】的date对象
 * @param {String} [b] - 日期格式 年-月-日 时:分:秒 毫秒 季度
 * @return {String}
 * @example new Date().format('yyyy-MM-dd hh:mm:ss S q') = 2018-09-02 15:44:21 954 3
 */
export function formatDateOBJ (dateObj, b) {
  let c = {
    'y+': dateObj.getFullYear(),
    'M+': dateObj.getMonth() + 1,
    'd+': dateObj.getDate(),
    'h+': dateObj.getHours(),
    'm+': dateObj.getMinutes(),
    's+': dateObj.getSeconds(),
    'q+': Math.floor((dateObj.getMonth() + 3) / 3),
    'S': ('00' + dateObj.getMilliseconds()).slice(-3)
  };
  if (/(y+)/.test(b)) {
    b = b.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let a in c) {
    if (new RegExp('(' + a + ')').test(b)) {
      b = b.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? c[a] : ('00' + c[a]).substr(('' + c[a]).length)
      );
    }
  }
  return b
}

/**
* @desc 根据账号保护标志，显示账号，是否用'*'代替
* @author zhulijian 2018-09-02
* @param {String} [accountNo] 账号
* @param {String} [spaceFlag] 是否每四个数字用空格分开，默认用空格分开，'1'-不用空格分开，其他-用空格分开
* @return {String}
* @example fmtAccountNo('12345678') = '123456780000'||'1234********0000'
           fmtAccountNo('12345678','1') = '1234 5678 0000'||'1234 **** **** 0000'
*/
export function fmtAccountNo (accountNo, spaceFlag) {
  accountNo = accountNo.toString();
  if (!accountNo) {
    return ''
  }
  if (spaceFlag === '1') { // 不用空格分开
    return accountNo.substr(0, 4) + '********' + accountNo.substr(accountNo.length - 4);
  } else { // 每四位用空格分开
    return accountNo.substr(0, 4) + ' **** **** ' + accountNo.substr(accountNo.length - 4);
  }
}

/**
* @desc F_5 帐号格式化 每四位增加空格分隔添加 空格 分隔符
* @param {String} [accountNo] 账号
* @return {String}
* @example addSpace('123400005678') = '1234 0000 5678'
*/
export function addSpace (accountNo) {
  accountNo = accountNo === 0 ? '0' : accountNo;// 数字0转化成字符串'0'，防止数字0误判为空
  // 空返回'hzbank'，空字符串
  return !accountNo ? '' : String(accountNo).replace(/(.{4})/g, '$1 ').trim();
}

/**
* @desc F_3 取账号的后四位
* @author zhulijian 2018-09-02
* @param {String} [accountNo] 账号
* @return {String}
* @example fmtAccLast4('6221343450989090') = '9090'
*/
export function fmtAccLast4 (accountNo) {
  return getStrLast4(accountNo);
}

/**
* @desc F_2 获取字符串最后四位
* @author zhulijian 2018-09-02
* @param {String} [str]
* @return {String}
* @example getStrLast4('acdeliji')='liji'
*/
export function getStrLast4 (str) {
  str = str === 0 ? '0' : str;// 数字0转化成字符串'0'，防止数字0误判为空
  // 空返回''，空字符串
  return !str ? '' : String(str).slice(-4);
}

/**
* @desc F_7 将手机号的中间4位用*号代替
* @param {String} [phoneNo] 手机号
* @return {String}
* @example fmtPhoneNo('13412345678') = '134****5678'
*/
export function fmtPhoneNo (phoneNo) {
  phoneNo = phoneNo === 0 ? '0' : phoneNo;// 数字0转化成字符串'0'，防止数字0误判
  return !phoneNo ? '' : String(phoneNo).substr(0, 3) + '****' + String(phoneNo).substr(7)
}
export function fmtPhoneCenter3 (phoneNo) {
  return fmtPhoneNo(phoneNo)
}
/**
* @desc F_8  将手机号格式化加入空格
* @param {String} [phoneNo] 手机号
* @return {String}
* @example fmtPhoneNoSpace('13412345678') = '134 1234 5678'
*/
export function fmtPhoneNoSpace (phoneNo) {
  if (phoneNo.length > 3 && phoneNo.length < 8) {
    return phoneNo.substr(0, 3) + ' ' + phoneNo.substr(3)
  } else if (phoneNo.length > 7) {
    return phoneNo.substr(0, 3) + ' ' + phoneNo.substr(3, 4) + ' ' + phoneNo.substr(7)
  } else {
    return phoneNo;
  }
}
/**
* @desc  F_31 截取小数后4位
* @param {String} [str]
* @return {String}
* @example
*/
export function fixed4 (str) {
  let stss = str.toString();
  if (stss.indexOf('.', 0) > 0) {
    stss = stss + '0000';
    return stss.substring(0, stss.indexOf('.', 0) + 5);
  } else if (stss.indexOf('.', 0) == 0) {
    stss = '0' + stss + '0000';
    return stss.substring(0, stss.indexOf('.', 0) + 5);
  } else {
    stss = stss + '.0000';
    return stss.substring(0, stss.indexOf('.', 0) + 5);
  }
};

/**
 * @desc  F_42 去初始化参数表中的中文意思
 * @param list  list集合
 * @param key   要转化的中文key值
 * @returns
 */
export function getPubKeyCN (list, key) {
  let str = '';
  for (let i = 0; i < list.length; i++) {
    let listStr = list[i];
    if (listStr.value == key) {
      str = listStr.showMsg;
      break;
    }
  }
  return str;
}

/**
* @desc  F_32  判断是纯数字
* @param {String} [numStr] 身份证号
* @return {Boolean}
* @example checkPureNumber('12312') = true
*/
export function checkPureNumber (numStr) {
  return /^[0-9]+$/.test(numStr);
};
/**
* @desc  F_33 email简单校验
* @param {String} [mail] 邮箱地址
* @return {Boolean}
* @example checkEmail('123123@123.com') = true
*/
export function checkEmail (email) {
  let patrn = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!patrn.exec(email)) return false;
  return true;
};
export function checkMail (mail) {
  return /^[0-9A-Za-z-_.]*@[0-9A-Za-z-_.]*\.(com|net|cn|edu|org)$/.test(mail);
}
/**
 * @desc F_34 检查身份证号
 * @param {*String} personId 身份证号
 * @return {Boolean}
 * @example checkPersonId('14ff23com') = false
 */
export function checkPersonId (personId) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(personId);
}
/**
 * @desc F_35 检查手机号码格式
 * @param {*String} phoneNo 手机号码
 * @return {Boolean}
 * @example checkPhoneNum('13312141241') = true
 */
export function checkPhoneNum (phoneNo) {
  return /^1\d{10}$/.test(phoneNo);
}

/**
 * @desc F_36 移除号码中其他字符
 * @param {*String} number 手机号
 * @return {String}
 * @example remvPhoneOther('134 1234 5678') = '13412345678'
 */
export function remvPhoneOther (number) {
  return number.replace(/[\D]{0,}/g, '');
}

/**
* @desc  F_37金额大写转换函数
* @param {String} [n]
* @return {String}
* @example
*/
export function convertMoneyToCn (n) {
  n = unfmtAmt(n);
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) { return '零圆整'; }
  let unit = '万仟佰拾亿仟佰拾万仟佰拾圆角分'; let str = '';
  n += '00';
  let p = n.indexOf('.');
  if (p >= 0) { n = n.substring(0, p) + n.substr(p + 1, 2); }
  unit = unit.substr(unit.length - n.length);
  for (let i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  }
  str = str.replace(/零(仟|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万)/g, '万零')
    .replace(/零(亿)/g, '亿零')
    .replace(/零(圆)/g, '圆零')
    .replace(/(零)+/g, '零')
    .replace(/^圆零?|零分/g, '')
    .replace(/零圆/g, '圆')
    .replace(/零(万|亿)/g, '')
    .replace(/亿万/g, '亿')
    .replace(/圆$/g, '圆整 ');
  if (str == '分') {
    str = '零圆整';
  }
  return str;
}

/**
* @desc  F_18  检查账号类型，是否只包含数字字母
* @param {String} [str] 账号类型
* @return {Boolean}
* @example checkNumber('14ff23com') = true
*/
export function checkNumber (str) {
  return /^[A-Za-z0-9]+$/.test(str);
}

/**
 * 获取字符串的字符长度（中文一个算2个字符）
 * @param {String} str
 */
export function stringCharLength (str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i)
    if (code >= 0 && code <= 127) {
      len += 1
    } else {
      len += 2
    }
  }
  return len
}

/**
 * @desc 判断银行的图标时候存在
 * @param bankCode
 */
export function bankIconInclude (bankCode) {
  let bankCodeStr = '102|103|104|105|301|302|303|304|305|306|307|308|309|310|315|316|318|319|322|403|hzbank'
  if (bankCodeStr.indexOf(bankCode) > -1) {
    return true;
  } else {
    return false;
  }
}
/**
 * @desc 判断银行的图标时候存在(城市商业银行)
 * @param bankCode
 */
export function bankIconInclude2 (bankCode) {
  let bankCodeArr = [
    '313301099999', // 江苏银行
    '402331000007' // 浙江省农村信用社联合社
  ];
  let bankCodeStr = bankCodeArr.join('|');
  if (bankCodeStr.indexOf(bankCode) > -1) {
    return true;
  } else {
    return false;
  }
}

/**
* @desc F_4 取前三位
* @param {String} [accountNo] 账号
* @return {String}
* @example fmtAccFirst3('6221343450989090') = '622'
*/
export function fmtAccFirst3 (accountNo) {
  accountNo = accountNo === 0 ? '0' : accountNo;// 数字0转化成字符串'0'，防止数字0误判为空
  // 空返回'hzbank'
  return !accountNo ? 'hzbank' : String(accountNo).substr(0, 3);
}

/**
 * @desc  F_46 检查附言，附言的长度是20,账户名是50
 * @param val
 * @returns
 */
export function checkSpecialChar (val) {
  let shitdata = ['12290', '65292', '65294', '8212', '65288', '65289', '65309', '65291', '65311', '65312', '65281', '65283', '65307'];
  for (let i = 0; i < val.length; i++) {
    for (let j = 0; j < shitdata.length; j++) {
      if (val.charCodeAt(i) == shitdata[j]) {
        val = removeAt(val, parseInt(i) + parseInt(1));
        i--;
        break;
      }
    }
  }
  /* eslint-disable-next-line */
	let regStr = /[\<\>\=\'\"\%\\\/]+/;
  return !regStr.test(val);
}

/**
* @desc  F_45 控制交易报文提交时的特殊字符字段
* @param {String}
*/
export function removeAt (data, index) {
  let part1 = '';
  if (index > 1) { part1 = data.slice(0, parseInt(index) - parseInt(1)); }
  let part2 = data.slice(index);
  return (part1.concat(part2));
}

/**
* @desc  F_29 取字符串的长度，汉字取两个字符
* @param {String} [str]
* @return {Number}
* @example
*/
export function stringLength (str) {
  return str.replace(/[^\x00-\xff]/g, '**').length;
}

/**
* @desc  F_30 检验别名(只能是数字，字母和汉字)
* @param {String} [str]
* @return {Boolean}
* @example
*/
export function checkAlies (str) {
  let regStr = /^[A-Za-z0-9\u4E00-\u9FA5]*$/
  return regStr.test(str)
}

/**
 * 将理财起购金额等整数字转化为展示代中文金额
 *  150000 => 15万
 *  100000 => 10万
 *  5000 => 5千
 *  15000 => 1万5千
 * @param {String} str
 */
export function fmtFinanceBigAmt (str) {
  let amt = parseInt(str)
  if (amt == 0) {
    return '0元'
  } else if (amt % 10000 === 0) {
    return (amt / 10000) + '万元'
  } else if (amt % 1000 === 0) {
    let wan = parseInt(amt / 10000)
    let qian = parseInt((amt - (wan * 10000)) / 1000)
    if (wan === 0) {
      return qian + '千元'
    } else {
      return wan + '万' + qian + '千元'
    }
  } else {
    return fmtAmt0s(str) + '元'
  }
}

/**
 * 比较两个版本号大小，
 * version1大返回正数，
 * version2大返回负数，
 * 相等返回零
 * version2为空返回0，
 * version1未空返回-1，
 */
export function compareVersion (version1, version2) {
  if (!version2) {
    console.log('version2为空')
    return 0;
  } else if (!version1) {
    console.log('version1为空')
    return -1;
  } else {
    let arr1 = version1.split('.');
    let arr2 = version2.split('.');
    let len1 = arr1.length;
    let len2 = arr2.length;
    let minlen = len1 < len2 ? len1 : len2;// Math.min(len1,len2);
    let index = 0;
    let diff = 0;
    while (index < minlen && ((diff = arr1[index] - arr2[index]) == 0)) {
      index++;
    }
    diff = diff != 0 ? diff : len1 - len2;
    return diff;
  }
}
/*判断是否两位数的钱*/
export function assertMoney (input, exeStr) {
  let temp = /^\d+\.?\d{0,2}$/;
  if (temp.test(input.value)) {
  } else {
    input.value = input.value.substr(0, input.value.length - 1);
    // IWS_CheckDecimal(input);
    // return false;
  }
}
/*判断数字*/
export function assertNumber (input, exeStr) {
  let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  if (!reg.test(input)) {
    throw new Error(exeStr)
  }
}
/**/
/**
 * 手机号验证
 * 
 */

export function assertPhone (input, exeStr) {
  const rule = /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[0135678]|9[189])[0-9]{8}$/
  try {
    assertString(input)
  } catch (error) {
    return true
  }
  if (!(rule.test(input))) {
    throw new Error(exeStr) 
  }
}
/*判断字符串*/
/**
 * 判断为空字符串验证
 */
export function assertString (input, exeStr) {
  const isString = (typeof input === 'string' || input instanceof String && input != null);
  if (!isString) {
    throw new Error(exeStr)
  }
}