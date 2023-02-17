const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const postSchema=new Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
       required: true
    },
    price:{
        type: String,
        required:true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
   }
       
    

});

module.exports=mongoose.model('products',postSchema);