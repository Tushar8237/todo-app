import jwt from 'jsonwebtoken'

// Generate JWT token with user id
const generateToken = (userID) => {
    return jwt.sign({ id : userID, }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

export default generateToken;