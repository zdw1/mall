var log = wx.getRealtimeLogManager() ? wx.getRealtimeLogManager() : null
import {NODE_ENV} from '../config/config'

module.exports = {
  debug() {
    if (!log) return
    log.debug.apply(log, arguments)
  },
  info() {
    if (!log) return
    arguments[0] = '[' + NODE_ENV + ']' + arguments[0]
    log.info.apply(log, arguments)
  },
  warn() {
    if (!log) return
    arguments[0] = '[' + NODE_ENV + ']' + arguments[0]
    log.warn.apply(log, arguments)
  },
  error() {
    if (!log) return
    arguments[0] = '[' + NODE_ENV + ']' + arguments[0]
    log.error.apply(log, arguments)
  },
  setFilterMsg(msg) { // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return
    if (typeof msg !== 'string') return
    log.setFilterMsg(msg)
  }
}