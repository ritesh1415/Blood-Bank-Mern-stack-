import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    role :{
        type:String,
        required :[true ,'role is required'],
        enum : ['admin','donar','organisation','hospital']
    },
    name :{
type :String,
required :function (){
    if(this.role==='donar' || this.role==='admin'){
return true;
    }
    return false
}
    },
    organisationName :{
        type:String,
        required :function(){
            if(this.role==='organisation'){
                return true;
            }
            return false
        }
    },
    hospitalName :{
        type:String,
        required :function(){
            if(this.role==='hospital'){
                return true
            } return false
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,

    },
    website : {
        type:String

    },
    address :{
type:String,
required: true,
    },
    phone :{
        type: String,
        required:true
    }
},{timestamps:true});
// export default mongoose.model('users', userSchema);
export default mongoose.model('users', userSchema);
