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
const { validarCampos } = require('../middleware/validar-campos.middleware');

/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { login, 
        renewToken,
      } = require( '../controllers/auth.controller' );

const { 
        crear,
      } = require( '../controllers/users.controller' );

const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/auth
 * 
 */

router.post( '/login',
  [ // Middleware de la ruta
    check( 'email', 'El Email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatori' ).not().isEmpty(),
    validarCampos
  ],
  login
);


router.post( '/register', 
  // en el segundo parametro se colocan lo Middleware correspondientes a la ruta
  [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos // Middleware personalizado
  ], 
  crear 
);


router.get( '/renew', [ validarJWT ], renewToken );


/*****************************************************************************
 * 
 * Exporto las rutas
 * 
 */
module.exports = router;