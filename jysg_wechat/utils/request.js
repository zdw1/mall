import { ENV } from '../config/config'
import { formatDateOBJ } from './jsUtils'
let realTimeLog = require('./logs')
const baseUrl = ENV.basePath
let waitPanelClearFlag = 0 // 计数器
let waitPanelFlag = false // 等待层状态

// 清除等待层
function initHideLoading () { // 需要手动清除等待层调用此方法
  wx.hideLoading()
  waitPanelFlag = false
}

// 微信登录
function wxlogin (url) {
  wx.login({
    success: (res) => {
      if (res.code) {
        Request({
          url: url,
          method: 'post',
          data: {code: res.code},
          success: (res) => {
            // console.log(res)
          },
          error: (error) => {
            // console.log(error)
          }
        })
      }
    }
  })
}





function showAlert(content, func, btn) {
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
      }
    }
  })
}

// 封装ajax请求
function Request (options) {
  const header = {}
  header['Content-Type'] = 'application/json'
  if (!options.notset) {
    waitPanelClearFlag++
  }
  // 设置等待层
  if (!waitPanelFlag && waitPanelClearFlag > 0) {
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    waitPanelFlag = true
  }
  let method = options.method ? options.method.toUpperCase() : 'POST'
  let ajaxstamp = getAjaxStamp(options.serviceNo) || ''
  options.data = options.data || {}
  options.data.ajaxstamp = ajaxstamp
  realTimeLog.info('request-url: ' + options.url)
  wx.request({
    url: baseUrl + options.url,
    method: method,
    data: options.data,
    header: header,
    dataType: 'json',
    success: (res) => {
      // res.data.ajaxstamp = ajaxstamp
      let result = res.data
      if (result.isException) {
        realTimeLog.warn('request-expInfo: ' + result.expInfo)
        if (options.error && typeof options.error == 'function') {
          result.ajaxstamp = ajaxstamp
          options.error(result)
        } else {
          showAlert(result.expInfo +  '[' + ajaxstamp +']')
        }
      } else {
        options.success(result)
      }
    },
    fail: (res) => {
      if (options.fail && typeof options.fail == 'function') {
        options.fail(res.data)
      } else {
        initHideLoading()
        showAlert('网络连接异常' + '[' + ajaxstamp +']')
      }
    },
    complete: (data) => {
      if (!options.notset) {
        waitPanelClearFlag--
      }
      //所有请求发送完毕
      if (waitPanelClearFlag <= 0 && !options.notclear) {
        initHideLoading()
      }
      const { statusCode } = data
      if (statusCode >= 200 && statusCode < 300) {
        // console.log(`${options.url}【接口响应：${statusCode}】`)
      } else {
        // console.log(`${options.url}【接口响应：${statusCode}】`)
        initHideLoading()
        wx.showModal({
          title: "提示",
          content: '网络请求错误',
          showCancel: false
        });
        return
      }
    }
  })
}

export {
  initHideLoading,
  Request
}

function getAjaxStamp (serviceNo) {
  let dateObj = new Date()
  return serviceNo + formatDateOBJ(dateObj, 'MMddhhmmS')
}