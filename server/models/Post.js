const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    de: {
        type: String,
        required: true
    },
    desconto: {
        type: String,
        required: true
    },
    por: {
        type: String,
        required: true
    },
    vezes_cartao: {
        type: String,
        required: true
    },
    tamanhos: {
        type: String,
        required: true
    },
    estoque: {
        type: String,
        required: true
    },
    add_carrinho: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: 'This field is required.'
      },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }    
});

module.exports = mongoose.model('Post', PostSchema);