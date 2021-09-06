/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

/*****************************************************************************
 * 
 * Middlewares
 * 
 */
const { validarJWT } = require( '../middleware/validar-jwt.middleware' );

/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { getPhotos } = require( '../controllers/photos.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/ptohos
 * 
 */

router.get( '/',  getPhotos);

/*****************************************************************************
 * 
 * Exporto las rutas
 * 
 */
module.exports = router;