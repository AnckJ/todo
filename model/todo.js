import mongoose from './db'
import config from './config'

const TodoSchema = new mongoose.Schema({
  name: {
    type: 'string',
    unique: true,
    required: true
  },
  status: {
    type: 'string',
    enum: ['unfinished', 'completed'],
    default: 'unfinished'
  },
  desc: 'string',
  ...config.fields
}, config.timestamps)

export default new mongoose.model('Todo', TodoSchema, 'todo')
