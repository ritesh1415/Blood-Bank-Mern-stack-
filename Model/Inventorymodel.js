import mongoose from "mongoose";

const inventoryScheme = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, 'inventory type required'],
      enum: ['in', 'out'],
    },
    bloodgroup: {
      type: String,
      required: [true, 'blood group is required'],
      enum: ['O+', 'AB', 'AB+', 'AB-'],
    },
    email:{
type:String,
required:[true,'donar email is required']
    },
    Quantity: {
      type: Number,
      required: [true, 'quantity is required'],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: function () {
        return this.inventoryType === 'out';
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: function () {
         return this.inventoryType === 'in';
       },
    },
  },
  { timestamps: true }
);

export default mongoose.model('inventory', inventoryScheme);
