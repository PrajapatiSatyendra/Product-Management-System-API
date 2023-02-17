const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
       fullName:String,
       email:{
              type:String,
              required:true
       },
       password:{
              type:String,
              required:true
       },
       products: [{
              type: Schema.Types.ObjectId,
              ref:'products'
       }]
      
});

module.exports=mongoose.model('users',postSchema);