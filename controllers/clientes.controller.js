import { responseSuccess, responseError } from '../helpers/response.helper.js'
import Joi from 'joi'
import { getClientes, postCliente } from '../services/clientes.service.js'

const schemaCliente = Joi.object({
    primerNombre: Joi.string().min(5).max(50).required(),
    segundoNombre: Joi.string().optional(),
    primerApellido: Joi.string().min(5).max(50).required(),
    segundoApellido: Joi.string().optional(),
    nit: Joi.string().required(),
    email: Joi.string().email().required(),
    direcciones: Joi.array().required(),
    telefonos: Joi.array().required()
})

const getClientesHandler = async (req, res) => {
    try {
        const clientes = await getClientes()
        return res.status(200).json(responseSuccess('success.clientesObtenidos', clientes))
    } catch (error) {
        let errorCode = 500
        let errorMessage = 'error.internal'
        switch (error.code) {
        case 'DATA_NOT_FOUND':
            errorCode = 404
            errorMessage = 'error.notFound'
            break
        }
        return res.status(errorCode).json({ message: errorMessage })
    }
}

const postClienteHandler = async (req, res) => {
    try {
        const data = req.body
        const { error, value: valueData } = schemaCliente.validate(data, { abortEarly: false })
        if (error) {
        return res.status(400).json(responseError(error.details.map(e => e.message)))
        }
        const clienteId = await postCliente(valueData)
        return res.status(201).json(responseSuccess('success.clienteGuardado', clienteId))
    } catch (error) {
        let errorCode = 500
        let errorMessage = 'error.internal'
        switch (error.code) {
        case 'DATA_EXISTS':
            errorCode = 409
            errorMessage = 'error.exists'
            break
        }
        return res.status(errorCode).json({ message: errorMessage })
    }
}

export { getClientesHandler, postClienteHandler }