import Cliente from '../models/cliente.js'

const getClientes = async () => {
    try {
        const clientes = await Cliente.find({}).lean()
        if (!clientes.length) {
        const error = new Error('DATA_NOT_FOUND')
        error.code = 'DATA_NOT_FOUND'
        throw error
        }
        return clientes
    } catch (error) {
        throw error
    }
}

const postCliente = async (data) => {
    try {
        const clienteExistente = await Cliente.findOne({ nit: data.nit })
        if (clienteExistente) {
        const error = new Error('DATA_EXISTS')
        error.code = 'DATA_EXISTS'
        throw error
        }
        const nuevoCliente = await Cliente.create(data)
        return nuevoCliente._id
    } catch (error) {
        throw error
    }
}

export { getClientes, postCliente }