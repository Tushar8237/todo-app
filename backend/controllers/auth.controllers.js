import User from '../models/user.model.js';
import generateToken from '../utils/generate.token.js'


// desc    Register new user
// route   POST /api/auth/register
// access  Public
 
export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if all the required fields are provided
        if ( !name || !email || !password ) {
            return res.status(400).json({
                message : "Please provide all the required fields"
            });
        };

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message : "User already exists"
            });
        };

        // Create a new user
        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        // Remove password from the user object before sending the response
        const userData = user.toObject();

        // Delete password from the user object
        delete userData.password;
        
        res.status(201).json({
            user : userData,
            token : generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
}



// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        // Check if all the required fields are provided
        if ( !email || !password ) {
            return res.status(400).json({
                message : "Please provide all the required fields"
            });
        };

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message : "Invalid credentials"
            });
        };

        // Check if the password is correct
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message : "Invalid credentials"
            });
        };

        // send response without password
        const { userWithoutPassword: userPassword, ...userData } = user._doc;

        res.status(200).json({
            user : userData,
            token : generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
}


// desc Logout user
// route POST /api/auth/Logout
// access Private (optional functionality)

export const logoutUser = async (req, res, next) => {
    res.status(200).json({
        message : "User Logged out successfully"
    });
}