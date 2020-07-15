// creates a model 
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

// every event object will have that schema
const eventSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

// first argument is the name of the model and second is the schema
module.exports=mongoose.model('Event',eventSchema);