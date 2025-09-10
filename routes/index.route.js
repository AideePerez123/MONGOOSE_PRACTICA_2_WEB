import { Router } from 'express'
import clientesRoute from './clientes.route.js'
import authRoute from './auth.route.js'

const router = Router()
router.use('/clientes', clientesRoute)
router.use('/auth', authRoute)

export default router