export class ApiError extends Error {
  static errorType = {
    unknownError: '未知错误',
    requiredUsername: '需要用户名',
    requiredPassword: '需要密码',
    userExists: '用户已存在',
    loginFaild: '用户名错误或密码错误',
    invalidToken: 'koken过期或认证失败',
    missingId: '缺少id',
    invalidParam: '参数错误'
  }

  constructor (type) {
    super()
    this.status = 200
    this.type = type
    this.value = ApiError.errorType[type] || ApiError.errorType.unknownError
  }
}
