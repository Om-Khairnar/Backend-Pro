import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not Empty
  //check if youser is already exists: username and Email
  // check if you have images and avatar
  //upload them to cloudinary ,avatar
  //create user object - create entry in db
  //remove password and refresh token field from responce
  //chek for user creation
  //return responce

  const { fullName, username, email, password } = req.body;
  console.log("email", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "") //not empy chek validation
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //username and email not suppose to be same
  //here we use the $or is or operation
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email and username already exists");
  }

  //getting this files of image from multer middlesware
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //cloudinary upload
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // here we have not added the validation for the coverimage
    // like avatar because it's optional here if not then send the empty array
    email,
    password,
    username: username.toLowerCase(),
  });

  //remove password and refresh token field from responce we select specific field
  const createdUser = await User.findByID(user._id).select(
    "-password -refreshToken"
  );

  // check user craetion
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser,"User Registered successfully ")
  )
});

export { registerUser };
// throw new ApiError(400, "fullname is required")
