const NODE_ENV = 'dev'
const PROFILES = {
  'dev': {
    // 本地环境
    basePath: 'http://localhost:8091/mall', 
    domain: 'http://localhost:3000/', 
    imageBasePath: 'http://xxxx:9090/images/'
  },
  'prod': {
    basePath: '',
    domain:''
  }
}
const ENV = PROFILES[NODE_ENV]

export { ENV, NODE_ENV }