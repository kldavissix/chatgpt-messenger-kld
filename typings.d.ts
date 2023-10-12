interface Message {
  text: string
  sortKey: string
  createdAt: admin.firestore.Timestamp
  user: {
    _id: string
    name: string
    avatar: string
  }
}
