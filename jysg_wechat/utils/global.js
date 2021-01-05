// import { createLink } from './navigate'
import { Request } from './request'
import { realTimeLog }  from './logs'

export const sendAjax = Request
// export const login = wxlogin

/**
 * showConfirm弹窗
 * @param {*} content 提示信息 
 * @param {*} leftFunc 左按钮点击事件
 * @param {*} rightFunc 右按钮点击事件
 * @param {*} leftText 左按钮文字，默认为 '取消'
 * @param {*} rightText 右按钮文字，默认为 '确定'
 */
export function showConfirm(content, leftFunc, rightFunc, leftText, rightText) {
  wx.showModal({
    title: '提示',
    content: content,
    cancelText: leftText || '取消',
    confirmText: rightText || '确定',
    success (res) {
      if (res.confirm) { // 点击确定按钮执行
        if (rightFunc && typeof rightFunc === 'function') {
          rightFunc()
        }
      } else if (res.cancel) { // 点击取消按钮执行
        if (leftFunc && typeof leftFunc === 'function') {
          leftFunc()
        }
      }
    }
  })
}

/**
 * showAlert弹框
 * @param {*} content 提示信息
 * @param {*} func 确定按钮点击事件
 * @param {*} func2 关闭弹窗事件(包括虚拟键，屏幕侧滑，蒙层关闭)
 * @param {*} btn 弹框确定按钮文字，默认为'确定'
 */
export function showAlert(content, func, func2, btn) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    confirmText: btn || '确定',
    success (res) {
      if (res.confirm) { // 点击确定按钮执行
        if (func && typeof func === 'function') {
          func()
        }
      } else if (res.cancel) {
        if (func2 && typeof func === 'function') {
          func2()
        }
      }
    }
  })
}

/**
 * 页面跳转
 * @param {*} url 页面相对路径
 */
export function goPage(url, param) {
  let urlArr = url.split('/')
  let u = '/pages/' + url + '/' + urlArr[urlArr.length-1]
  // realTimeLog.info('goPage: ' + u)
  const pageUrl = createLink(u, param)
  console.log(pageUrl)
  wx.navigateTo({
    url: pageUrl
  })
}

/**
 * 返回小程序首页
 */
// export function goIndex() {
//   wx.reLaunch({
//     url: '/pages/main/index/index',
//   })
// }

/**
 * 设置标题头
 * @param {*} title 标题头名称
 */
export function updateTitleInfo(title) {
  wx.setNavigationBarTitle({
    title: title
  })
}

// export const getPswdRandom = (callback) => {
//   sendAjax({
//     url: '/creditservice/pubServer/getPwdKeybordRandom',
//     data: {},
//     method: 'post',
//     notset: 'true',
//     success: (res) => {
//       callback(res.data)
//     }
//   })
// }

export function createLink(url, params) {
  let args = []
  // Object.keys(params).forEach((key) => {
  //   args.push(`${encodeURIComponent(key)}=${encodeURIComponent(params(key))}`)
  // })
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      args.push(key + '=' + value)
    }
  }
  let urlArr = url.split('?')
  let urlParam = ''
  if (urlArr.length > 1) {
    url = urlArr[0]
    urlParam = urlArr[1]
  }
  if (args.length === 0) {
    return urlParam ? `${url}?${urlParam}` : `${url}`
  } else {
    return urlParam ? `${url}?${urlParam}&${args.join('&')}` : `${url}?${args.join('&')}`
  }
}