import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'oo',
    email: 'oo@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'tt',
    email: 'tt@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
