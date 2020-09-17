import mongoose from './db'
import config from './config'

const UserSchema = new mongoose.Schema({
  username: {
    type: 'string',
    maxlength: 10,
    minlength: 4,
    required: true
  },
  password: {
    type: 'string',
    minlength: 4,
    maxlength: 10,
    required: true
  },
  avatar: 'string',
  email: {
    type: 'string',
    match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  },
  desc: 'string',
  ...config.fields
}, config.timestamps)

export default new mongoose.model('User', UserSchema, 'user')
