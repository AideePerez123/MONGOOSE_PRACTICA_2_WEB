import Usuario from '../models/usuario.js'

const login = async (data) => {
    try {
        const { email, password } = data
        const usuarioValido = await Usuario.findOne({ email, password })
        if (!usuarioValido) {
        const error = new Error('AUTH_ERROR')
        error.code = 'AUTH_ERROR'
        throw error
        }
        return {
        message: 'Login exitoso',
        role: usuarioValido.role
        }
    } catch (error) {
        throw error
    }
}

export { login }