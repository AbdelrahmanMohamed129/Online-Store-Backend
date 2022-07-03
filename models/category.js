const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    
    name:{
        type: String,
        unique: true,
        required: true
    },

    products: [{
        type: Schema.ObjectId,
        ref: 'prodcut'
    }],

},
    {timestamps: true},
)

const category = mongoose.model('category', categorySchema);

module.exports = category;