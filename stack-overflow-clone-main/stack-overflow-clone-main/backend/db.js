const mongoose = require("mongoose");

const url =
"mongodb+srv://yash1:smitasingh@cluster0.wibfge1.mongodb.net/?retryWrites=true&w=majority";
  // "mongodb+srv://yash:smitasingh@project1.qpubs1z.mongodb.net/?retryWrites=true&w=majority";
  // "mongodb+srv://yash:<password>@project1.qpubs1z.mongodb.net/?retryWrites=true&w=majority"
module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
