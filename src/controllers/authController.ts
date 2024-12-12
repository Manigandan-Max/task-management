import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || 'secrettest';

export const register = async (req:any, res:any)  =>  {

    try{
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });

    }catch(error){
        console.error('Error in user registration:', error);
        return res.status(500).json({ message: 'Internal server error.', error: error });
    }
 

}



export const login = async (req: any, res: any,) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            // If user not found, send a 404 response
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If the password is incorrect, send a 401 Unauthorized response
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Create a JWT token (am set an expiration time for optional)
        const token = jwt.sign(
            { userId: user.id, email: user.email },  // Payload
            JWT_SECRET,                             // Secret key
            { expiresIn: '1h' }                    // Expiration time (1 hour)
        );

        // Send the JWT token in the response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });


    }catch(error){
        return res.status(500).json({ message: 'Internal server error.', error: error });
    }

}