import mongoose, { mongo } from "mongoose";

const panSchema = new mongoose.Schema({
        leadId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Lead"
        } , 
        data : {
            type : Object,
            require : true
        }
},{timestamps :  true});

const PanDetails = mongoose.model("Aadhar",aadharSchema);
export default PanDetails;