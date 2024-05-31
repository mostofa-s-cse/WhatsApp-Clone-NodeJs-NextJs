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

export const onBoardUser = async (req, res, next) => {
    try {
      const { email, name, about, image: profilePicture } = req.body;
  
      // Log the incoming request body for debugging purposes
    //   console.log("Request Body:", req.body);
  
      // Validate the required fields
      if (!email || !name || !profilePicture) {
        return res.status(400).json({ message: "Email, Name, and Image are required.", status: false });
      }
  
      // Get the Prisma instance
      const prisma = getPrismaInstance();
  
      // Create a new user in the database
      await prisma.user.create({
        data: {
          email,
          name,
          about,
          profilePicture,
        },
      });
  
      // Respond with a success message
      return res.status(200).json({ message: "Success", status: true });
    } catch (error) {
      // Handle any errors and respond with an error message
      console.error("Error occurred while creating the user:", error);
      return res.status(500).json({ message: "An error occurred while creating the user.", status: false });
    }
  };
