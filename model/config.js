export default {
  fields: {
    created: {
      type: 'date',
      default: Date.now
    },
    updated: {
      type: 'date',
      default: Date.now
    }
  },
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
}
