const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // array bcoz we will have multiple ids
    createdEvents:[
        {
            // store a list of all the ids at the end
            type:Schema.Types.ObjectId,
            // allows to set a relation that two models are connected 
            // name of model u want to connec to soo Event
            // nd these object id will be from that Event model
            ref:'Event'
        }
    ]
})

module.exports=mongoose.model('User',userSchema);