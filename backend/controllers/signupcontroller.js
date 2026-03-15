const User = require("../model/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cloudinary = require("cloudinary").v2;
const cloudinary = require("../config/cloudinary");

exports.signup = async (req, res) => {
  try {
    //data fetch
    const { name, email, password } = req.body;

    //check validation
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "user already existing",
      });
    }

    //pswd encrypt
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "error in hashing password",
      });
    }

    //create ya save user in db
    let user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    //add login logic

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
      user = user.toObject();
      user.password = undefined;
      user.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User Registered and Logged In successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "User cannot be registered please try againn",
    });
  }
};

//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// exports.signup = async (req, res) => {
//   try {

//     const { name, email, password } = req.body;

//     const existinguser = await User.findOne({ email });

//     if (existinguser) {
//       return res.status(400).json({
//         success: false,
//         message: "user already existing",
//       });
//     }

//     const hashedpassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedpassword,
//     });

//     // ✅ TOKEN GENERATE
//     const token = jwt.sign(
//       { id: user._id, name: user.name },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     // ✅ COOKIE SET
//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//       expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//     });

//     res.status(201).json({
//       success: true,
//       user,
//       token,
//       message: "User Created Successfully",
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "User cannot be registered",
//     });
//   }
// };

exports.signin = async (req, res) => {
  try {
    //fatching the data
    const { email, password } = req.body;

    //check validation
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "please fill all details",
      });
    }

    //check user exit or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "please Signup firstly",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        name: user.name,
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      return res.cookie("token", token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          token: user.token,
          user: user,
          message: "user login successfully",
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      messagge: "login failure",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Usered logout successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "something is wrong on logout",
    });
  }
};

exports.updateprofile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user.id;

    if (!profilepic) {
      return res.status(400).json({ message: "profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json(updateUser);
  } catch (err) {
    console.log("ERROR IN UPDATE PROFILE:", err);
    res.status(500).json({
      success: false,
      message: "server internal error",
      
    });
  }
};

exports.check = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "problem in check" });
  }
};
