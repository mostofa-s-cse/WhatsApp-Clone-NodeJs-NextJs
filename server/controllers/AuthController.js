import getPrismaInstance from "../utils/PrismaClient.js"; // Import the function to get Prisma client instance

// Middleware function to check if user exists
export const checkUser = async (req, res, next) => {
    try {
        const { email } = req.body; // Extract email from request body

        // Check if email is provided
        if (!email) {
            return res.json({ message: "Email is required.", status: false });
        }

        const prisma = getPrismaInstance(); // Get Prisma client instance
        const user = await prisma.user.findUnique({ where: { email } }); // Find user by email

        // If user is not found, return message
        if (!user) {
            return res.json({ message: "User not found.", status: false });
        } else {
            // If user is found, return user data
            return res.json({ message: "User Found.", status: true, data: user });
        }
    } catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
};
