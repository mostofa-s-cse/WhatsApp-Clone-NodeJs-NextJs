import { PrismaClient } from "@prisma/client"; // Import PrismaClient from @prisma/client

let prismaInstance = null;

// Function to get Prisma client instance
function getPrismaInstance() {
    // If Prisma instance doesn't exist, create a new one
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance; // Return Prisma instance
}

export default getPrismaInstance; // Export the function to get Prisma instance
