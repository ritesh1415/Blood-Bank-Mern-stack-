import usermodel from "../Model/usermodel.js";

// GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await usermodel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      TotalCount: donarData.length, // Fixed typo in 'TotalCount'
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar List API",
      error,
    });
  }
};

// GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await usermodel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      TotalCount: hospitalData.length,
      message: "Hospital List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};

// GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await usermodel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      TotalCount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};

// DELETE DONAR
const deleteDonarController = async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting",
      error,
    });
  }
};

// EXPORT
export {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
};
