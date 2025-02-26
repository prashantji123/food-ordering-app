import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://kvprashant52:26112002@cluster0.4tyhj.mongodb.net/food-delivery"
    )
    .then(() => console.log("DB Connected"));
};
