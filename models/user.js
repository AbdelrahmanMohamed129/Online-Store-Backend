const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exits.'],
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email is invalid.'],
    },

    confirmed: {
        type: Boolean,
        default: false
    },

    confirmEmailToken: String,
    confirmEmailTokenExpiry: Date,

    username: {
        type: String,
        unique: [true, 'Username already exists.' ],
        required: [true, 'Username is required.'],
        trim: true,
        minLength: 1
    },

    password: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 64
    },

    address:{
        type: String,
        required: true
    },

    passwordResetToken: String,
    passwordResetTokenExpiry: Date,

    facebookID: String,
    googleID: String,

    isAdmin: {
        type: Boolean,
        default: false
    },

    cart:{
        items:[
            {
                productId:{
                    type: Schema.ObjectId,
                    ref: 'product',
                    required: true
                },
                quantity:{
                    type: Number,
                    required:true
                }
            }
        ]
    }
},
    {timestamps: true},
)

/* ************** PRE's ************** */

userSchema.pre('save', async function (next) {
    // hash password whenever changed
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


/* ************** Methods ************** */

userSchema.methods.validatePassword = async function (candidatePassword, userPassword) {
    // validate correct password
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.generatePasswordResetToken = async function () {
    let resetToken;
    let ok = false;
    while(!ok) {
        //generate token
        resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        //check if it exists before
        const isUnique = await this.model('user').find({
            passwordResetToken: this.passwordResetToken
        });

        //if unique, break
        if(isUnique.length === 0) {
            ok = 1;
        }
    }
    this.passwordResetTokenExpiry = Date.now() + 7 * 60 * 1000;
    await this.save({
      validateBeforeSave: false
    });
    return resetToken;
}

userSchema.methods.generateEmailConfirmToken = async function () {
    let cofirmToken;
    let ok = false;
    while(!ok) {
        //generate token
        cofirmToken = crypto.randomBytes(32).toString('hex');
        this.confirmEmailToken = crypto.createHash('sha256').update(cofirmToken).digest('hex');

        //check if it exists before
        const isUnique = await this.model('user').find({
            confirmEmailToken: this.confirmEmailToken
        });

        //if unique, break
        if(isUnique.length === 0) {
            ok = 1;
        }
    }
    await this.save({
      validateBeforeSave: false
    });
    return cofirmToken;
}
  
const user = mongoose.model('user', userSchema);

module.exports = user;