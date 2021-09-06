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
const { validarCampos } = require( '../middleware/validar-campos.middleware' );
const { validarJWT } = require( '../middleware/validar-jwt.middleware' );

/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { 
        listar,
        actualizar,
        eliminar
      } = require( '../controllers/users.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/users
 * 
 */
router.get( '/', validarJWT, listar );

router.put( '/:id', 
  // en el segundo parametro se colocan lo Middleware correspondientes a la ruta
  [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos // Middleware personalizado
  ], 
  actualizar 
);


router.delete( '/:id', validarJWT, eliminar );


/*****************************************************************************
 * 
 * Exporto las rutas
 * 
 */
module.exports = router;