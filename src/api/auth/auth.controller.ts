import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface JwtPayload {
  _id: string;
}

export const signup = async (req: Request, res: Response) => {
  var { userName, email, password, cpassword } = req.body;
  if (!userName || !email || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const studentExists = await User.findOne({ email: email });
    if (studentExists) {
      res.status(422).send("User with this email already exists");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const student = new User({ userName, email, password });
      const saveStudent = await student.save();
      if (saveStudent) res.status(200).send("Admin created successfully");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(200)
        .send({ ok: false, message: "Email or password cannot be blank" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isValid = await bcrypt.compare(password, userLogin.password);
      if (!isValid) {
        res.status(200).json({ ok: false, message: "Incorrect Credentials" });
      } else {
        const token = jwt.sign(
          {
            _id: userLogin._id,
          },
          "THISISSECRET",
          {
            expiresIn: "500m",
          }
        );
        return res.status(200).json({
          ok: true,
          message: "Login Successfull!",
          token,
          user: userLogin,
        });
      }
    } else {
      res.status(200).send({ ok: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({ ok: false, message: "Invalid Token" });
    }

    const decodeToken = jwt.verify(token, "THISISSECRET") as JwtPayload;

    if (decodeToken) {
      const user = await User.findById(decodeToken._id);

      if (!user) {
        return res.status(400).send({ ok: false, message: "User not found!" });
      }

      return res.send({ ok: true, message: "User Validated", user });
    }
    res.status(400).send({ ok: false, message: "Invalid Token" });
  } catch (err) {
    console.log(err, "error");
    res.status(400).send({ ok: false, message: "Token expired" });
  }
};
