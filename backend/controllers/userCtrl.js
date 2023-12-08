// const userModel = require("../models/userModels");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register callback
// const registerController = async (req, res) => {
//   try {
//     const existingUser = await userModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res
//         .status(200)
//         .send({ message: "User Already Exists", success: false });
//     }
//     const password = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     req.body.password = hashedPassword;
//     const newUser = new userModel(req.body);
//     await newUser.save();
//     res.status(201).send({ message: "Registered Successfully", success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register Controller ${error.message}`,
//     });
//   }
// };

// // Login callback
// const loginController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "User not found", success: false });
//     }
//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res
//         .status(200)
//         .send({ message: "Invalid Email or Password", success: false });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.status(200).send({ message: "Login Success", success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
//   }
// };

// const forgotPasswordController = async (req, res) => {
//   const { email } = req.body;
//   UserModel.findOne({ email: email }).then((user) => {
//     if (!user) {
//       return res.send({ Status: "User not existed" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "seowork11100@gmail.com",
//         pass: "xmdu oebi hpeo drwg",
//       },
//     });

//     var mailOptions = {
//       from: "seowork11100@gmail.com",
//       to: "user email@gmail.com",
//       subject: "Reset Password Link",
//       text: `http://localhost:5173/reset_password/${user._id}/${token}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.send({ Status: "Success" });
//       }
//     });
//   });
// };

// const resetPasswordController = async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.json({ Status: "Error with token" });
//     } else {
//       bcrypt
//         .hash(password, 10)
//         .then((hash) => {
//           UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
//             .then((u) => res.send({ Status: "Success" }))
//             .catch((err) => res.send({ Status: err }));
//         })
//         .catch((err) => res.send({ Status: err }));
//     }
//   });
// };
// module.exports = {
//   loginController,
//   registerController,
//   resetPasswordController,
//   forgotPasswordController,
// };
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Assuming nodemailer is required

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ status: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Replace the placeholder with the actual user's email
    const resetLink = `http://localhost:5173/reset_password/${user._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "seowork11100@gmail.com",
        pass: "xmdu oebi hpeo drwg",
      },
    });

    var mailOptions = {
      from: "seowork11100@gmail.com",
      to: user.email, // Use the user's email from the database
      subject: "Reset Password Link",
      text: resetLink,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ status: "Error sending email" });
      } else {
        return res.status(200).send({ status: "Success" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error" });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).send({ status: "Error with token" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword }
      );

      return res.status(200).send({ status: "Success" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error" });
  }
};

module.exports = {
  loginController,
  registerController,
  resetPasswordController,
  forgotPasswordController,
};
