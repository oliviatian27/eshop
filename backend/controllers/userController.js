import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('invailid email or password')
  }
}
)

const registerUser = asyncHandler(async (req, res) => {
  const { name,email, password } = req.body
  const userExsits = await User.findOne({ email })
  if(userExsits){
    res.status(400)
    throw new Error('user already exists')
  }
  const user=await User.create({ name,email, password})

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('invailid user data')
  }
}
)


const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const {_id,name,email,isAdmin} =req.user
    res.json({_id,name,email,isAdmin})
  } else {
     res.status(404)
     throw new Error('invalid email or password')
  }
}
)

const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.name=req.body.name||req.user.name
    req.user.email=req.body.email||req.user.email
    console.log(req.body)
    if(req.body.password){
      req.user.password=req.body.password
    }

    const updatedUser= await req.user.save()

    const {_id,name,email,isAdmin} =updatedUser
    console.log(updatedUser)
    res.json({_id,name,email,isAdmin,token: generateToken(updatedUser._id),})
  } else {
     res.status(404)
     throw new Error('invalid email or password')
  }
}
)

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



export { authUser, getUserProfile,registerUser ,updateUserProfile,getUsers,deleteUser,getUserById,updateUserById }