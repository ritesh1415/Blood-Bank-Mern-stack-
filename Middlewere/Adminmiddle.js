import usermodel from "../Model/usermodel.js";
export default async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.body.userId);

    // Check admin
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,  // Fix typo here, change 'errro' to 'error'
    });
  }
};
