import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import * as dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const adminEmail = "deepakvaishnav15@gmail.com";
    const adminPassword = "admin123";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = new User({
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
