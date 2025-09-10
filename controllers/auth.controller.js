import { responseSuccess } from '../helpers/response.helper.js'
import Joi from 'joi'
import { login } from '../services/auth.service.js'

const schemaAuth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(100)
    })

    const loginHandler = async (req, res) => {
    try {
        const data = req.body
        const { error, value: values } = schemaAuth.validate(data, { abortEarly: false })
        if (error) {
        return res.status(400).json('Credenciales incorrectas.')
        }
        const result = await login(values)
        return res.status(200).json(responseSuccess('success.login', { role: result.role }))
    } catch (error) {
        let errorCode = 500
        let errorMessage = 'error.internal'
        switch (error.code) {
        case 'AUTH_ERROR':
            errorCode = 401
            errorMessage = 'error.authError'
            break
        }
        return res.status(errorCode).json({ message: errorMessage })
    }
}

export { loginHandler }