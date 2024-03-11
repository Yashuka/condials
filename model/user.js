const mongoose = require('mongoose');


const newSchema = new mongoose.Schema({
    email: {
      type : String,
     required : true,
     unique: true
    },
    password: {
        type: String,
       required : true
    } ,
    name: {
        type: String,
        required : true
    },
    token : {
      type: String,
      default : ''
    }

    
  },
    
{
    timestamps: true
});

const User = mongoose.model('user',newSchema);

module.exports = User;


