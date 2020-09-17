import mongoose from 'mongoose'

mongoose.connect(
  'mongodb://127.0.0.1/tododemo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log('链接数据库异常：', err)
      return
    }
    console.log('链接数据库成功！')
  }
)

export default mongoose
