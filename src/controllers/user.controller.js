import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadToCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {

    // get user details from frontend
    // validate user details
    // check if user already exists : username, email
    // check for images , check for avatar
    // upload image to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { fullName, username, email, password } = req.body;

    console.log("email ", email);

    if (
        [fullName, username, email, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(500, "Failed to upload avatar");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username : username.toLowerCase(),
        password
    })

    const CreatedUser =  await User.findbyId(user._id).select(
        "-password -refreshToken"
        // jo jo nahi chaiye unko select karlo
    )
    
    if (!CreatedUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }
    
        return res.status(201).json(
            new ApiResponse(200, createdUser , "User created successfully")
        )

});

export {registerUser};
