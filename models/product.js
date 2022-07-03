const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    name:{
        type: String,
        unique: true,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String
    },
    category:{
        type: Schema.ObjectId,
        ref: 'category'
    },

    soldCount:{
        type: Number,
        default: 0
    }

},
    {timestamps: true},
)

const product = mongoose.model('product', productSchema);

module.exports = product;