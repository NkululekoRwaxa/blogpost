const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type:String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next){
    const user = this;
    bycrypt.hash(user.password, 10)
    .then(hash =>{
        user.password = hash
    })
    .catch(e => {
        console.log('password encription error:', e)
    });
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;