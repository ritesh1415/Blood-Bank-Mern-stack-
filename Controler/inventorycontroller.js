import mongoose from "mongoose";
import Inventorymodel from "../Model/Inventorymodel.js";
import usermodel from "../Model/usermodel.js";

const createInventory = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    const user = await usermodel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (req.body.inventoryType === 'out') {
      const requestedBloodGroup = req.body.bloodgroup;
      const requestedQuantityGroup = req.body.Quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // calculate blood quantity
      const totalRequestedBlood = await Inventorymodel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: 'in',
            bloodgroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodgroup",
            total: { $sum: "$Quantity" },
          },
        },
      ]);

      console.log("total in", totalRequestedBlood);

      const totalIn = totalRequestedBlood[0]?.total || 0;
      // calculate OUT Blood Quantity

      const totalOutOfRequestedBloodGroup = await Inventorymodel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodgroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodgroup",
            total: { $sum: "$Quantity" },
          },
        },
      ]);
      
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      
      // in & Out Calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      
      // quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityGroup) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    const inventory = new Inventorymodel(req.body);
    await inventory.save();

    return res.status(200).send({
      success: true,
      message: "New inventory added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in inventory API",
      error: error.message,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('userId:', userId);

    const inventory = await Inventorymodel.find({ organisation: req.body.userId });
    console.log('Inventory:', inventory);

    return res.status(200).send({
      success: true,
      message: "get all records",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting inventory",
      error: error.message,
    });
  }
};

//get donar records
const getDonarControlller=async(req,res)=>{
try {
  const organisation=req.body.userId
  const donarId = await Inventorymodel.distinct("donar", {
    organisation
  });
  const donars = await usermodel.find({ _id: { $in: donarId } });
  return res.status(200).send({
    success:true,
    message:"donar records fetched successfully",
    donars,
  })
} catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'error in donar records',
      error,
    });
  }
};

//Hospitals records
const getHospitel=async (req,res)=>{
try {
  const organisation=req.body.userId
  //get hospital id
  const hospitalId = await Inventorymodel.distinct("hospital", { organisation });
  const hospitals = await usermodel.find({
    _id: { $in: hospitalId }
  });
return res.status(200).send({
  success:true,
  message:"hospital data fetched successfully",
  hospitals,
});
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success: false,
    message: 'error in Hospital get API',
    error,
  });
}
};

//get organisation profiles
const organisationController=async(req,res)=>{
try {
 const donar=req.body.userId
 const orgId=await Inventorymodel.distinct('organisatin',{donar})
 const org=await usermodel.find({
  _id: {$in: orgId},
 });
 return res.status(200).send({
  success:true,
  message:"organisation fetched successfully",
  org
 })
}  catch (error) {
  console.log(error);
  return res.status(500).send({
    success: false,
    message: 'error in Organisation get API',
    error,
  });
}};

//get hospital organisation profiles
const getorganisationforhospital=async(req,res)=>{
  try {
   const hospital=req.body.userId
   const orgId=await Inventorymodel.distinct('organisatin',{hospital})
   const org=await usermodel.find({
    _id: {$in: orgId},
   });
   return res.status(200).send({
    success:true,
    message:"hospital organisation fetched successfully",
    org
   })
  }  catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'error in hospital  Organisation get API',
      error,
    });
  }};
  

//get hospital consumer blood records
const getInventoryhospital = async (req, res) => {
  try {
    
    const inventory = await Inventorymodel
    .find( req.body.filters)
    .populate("donar")
    .populate("hospital")
    .populate("organisation")
    .sort({createdAt:-1});
    console.log('Inventory:', inventory);

    return res.status(200).send({
      success: true,
      message: "get all records",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting hospital inventory",
      error: error.message,
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await Inventorymodel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};


export { createInventory, getInventory,getDonarControlller,
  getHospitel ,organisationController,getorganisationforhospital,
  getInventoryhospital,getRecentInventoryController };
