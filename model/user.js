import mongoose from './db'
import config from './config'

const UserSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  avatar: 'string',
  desc: 'string',
  ...config.fields
}, config.timestamps)

export default new mongoose.model('User', UserSchema, 'user')
