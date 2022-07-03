const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: false
    },

    products: [{
       product:{
        type: Schema.ObjectId,
        ref: 'product',
        required: true
       },
       quantity:{
           type: Number,
           required: true
       }
    }]
},
    {timestamps: true},
)

const order = mongoose.model('category', orderSchema);

module.exports = order;