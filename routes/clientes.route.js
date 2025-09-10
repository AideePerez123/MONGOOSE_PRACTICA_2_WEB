import { Router } from 'express'
import { getClientesHandler, postClienteHandler } from '../controllers/clientes.controller.js'

const router = Router()
router.get('/', getClientesHandler)
router.post('/', postClienteHandler)

export default router