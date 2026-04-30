import { User } from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../security/hash.js";


export const userRegister = async (req, res) => {
  try {

    const {fullName, email, password} = req.body;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return res
      .status(400)
      .json({
        success: false,
        message: "All fields are required!"
      })
    };

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res
      .status(409)
      .json({
        success: false,
        message: "You have already an account in this email"
      })
    };

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword
    });

    if (!user) {
      return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong while registering the user!"
      })
    };

    return res
    .status(201)
    .json({
      success: true,
      message: "User register successfull",
      user
    })

  } catch (error) {

    console.log("Error in user register:", error.message || error);

    return res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error"
    })

  }
};


export const userLogin = async (req, res) => {
  try {

    const {email, password} = req.body;

    if (!email || !password) {
      return res
      .status(400)
      .json({
        success: false,
        message: "All fields are required!"
      })
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
      .status(400)
      .json({
        success: false,
        message: "Enter valid email"
      })
    };

    const user = await User.findOne({email});

    if (!user) {
      return res
      .status(404)
      .json({
        success: false,
        message: "User not found"
      })
    };

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!isPasswordCorrect) {
      return res
      .status(401)
      .json({
        success: false,
        message: "Invalid username or password"
      })
    };

    const loggedinUser = await User.findById(user._id)
    .select("-password");

    req.session.user = loggedinUser;

    return res
    .status(200)
    .json({
      success: true,
      message: "Login successfull",
      user: loggedinUser
    });
    
  } catch (error) {
    console.log("Error in user login:", error.message || error);

    return res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}

export const getCurrentUser = async (req, res) => {
  try {

    const user = req?.session?.user    

    if (!user) {
      return res
      .status(401)
      .json({
        success: false,
        message: "Not logged in" 
      });
    } 

    return res
    .status(200)
    .json({
      success: true,
      message: "User fetched",
      user
    })
    
  } catch (error) {
    console.log("Error in get current user:", error.message || error);

    return res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
};

export const updateProfile = async (req, res) => {
  try {

    const { fullName, email } = req.body;

    if (!fullName.trim() && !email.trim()) {
      return res
      .status(400)
      .json({
        success: false,
        message: "Provide at least one field"
      })
    }

    const userId = req?.session?.user?._id;

    if (!userId) {
      return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized" 
      });
    };

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: {
        fullName,
        email
      },
      
    }, { new: true })
    .select("-password");

    return res
    .status(200)
    .json({
      success: true,
      message: "Profile details updated",
      updatedUser
    })
    
  } catch (error) {
    console.log("Error in update profile:", error.message || error);

    return res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
};

export const updatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword.trim() || !newPassword.trim()) {
      return res
      .status(400)
      .json({
        success: false,
        message: "Password field required"
      })
    };

    const user = await User.findById(req?.session?.user?._id);

    if (!user) {
      return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized request"
      })
    };
    
    const isPasswordCorrect = await verifyPassword(oldPassword, user.password)

    if (!isPasswordCorrect) {
      return res
      .status(400)
      .json({
        success: false,
        message: "Invalid credentials"
      })
    };

    const hashedPassword = await hashPassword(newPassword)

    user.password = hashedPassword;
    await user.save();

    return res
    .status(200)
    .json({
      success: true,
      message: "Password change successfully"
    })
    
  } catch (error) {
    console.log("Error in update password:", error.message || error);

    return res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
};

export const userLogout = async (req, res) => {
  try {

  req.session.destroy((err) => {
  if (err) {
    return res.status(500).json({ message: "Logout failed" });
  }

  res.clearCookie("connect.sid"); // default session cookie name
  return res.json({ message: "Logged out successfully" });
});
    
  } catch (error) {
    console.log("Error in user logout:", error.message || error);

    return res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}