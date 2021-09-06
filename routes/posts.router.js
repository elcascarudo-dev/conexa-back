/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const { Router } = require( 'express' );

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
const { getPosts } = require( '../controllers/posts.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/posts
 * 
 */

router.get( '/', validarJWT, getPosts);

/*****************************************************************************
 * 
 * Exporto las rutas
 * 
 */
module.exports = router;