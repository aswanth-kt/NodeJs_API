import bcrypt from "bcrypt";


export const hashPassword = async (password) => {
  try {

    const SALT_ROUNDS = 12;

    return bcrypt.hash(password, SALT_ROUNDS);
    
  } catch (error) {
    console.log("Error in Hash password:", error.message);
    throw new Error("Hashing failed");
  }
};

export const verifyPassword = async (password, hash) => {
  try {

    return bcrypt.compare(password, hash);
    
  } catch (error) {
    console.log("Error in Verify password:", error.message);
    throw new Error("Verification failed");
  }
}