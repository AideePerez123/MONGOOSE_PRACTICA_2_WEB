import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema({
    primerNombre: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    segundoNombre: {
        type: String,
        trim: true
    },
    primerApellido: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    segundoApellido: {
        type: String,
        trim: true
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    direcciones: {
        type: [String],
        required: true
    },
    telefonos: {
        type: [String],
        required: true
    }
    }, {
    timestamps: true
})

export default mongoose.model('Cliente', clienteSchema)