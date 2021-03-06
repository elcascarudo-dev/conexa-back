/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const logger = require('log4js').getLogger('auth');
const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

/*****************************************************************************
 * 
 * Modelos
 * 
 */
const User = require( '../models/users.model' );

/*****************************************************************************
 * 
 * Helpers
 * 
 */
const { generarJWT }  = require( '../helpers/jwt.helper' );


/*****************************************************************************
 * 
 * Controlador "login"
 * 
 */
const login = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {

    // Verificar Email
    const usuarioDB = await User.findOne( {email} );

    if ( !usuarioDB ) {
      logger.debug( `El usuario ${email} no existe en la BBDD` );
      return res.status( 404 ).json({
        ok: false,
        msg: 'Usuario o contraseña incorrectos'
      });
    }

    // Verificar contraseña
    const validadPasswprd  = bcrypt.compareSync( password, usuarioDB.password );

    if ( !validadPasswprd ) {
      logger.debug( `Para el usuario ${ email } la contraseña ingresada es incorrecta` );
      return res.status( 404 ).json({
        ok: false,
        msg: 'Usuario o contraseña incorrectos'
      });
    }

    // Generar Token JWT
    const token = await generarJWT( usuarioDB.id );

    res.json({
      ok: true,
      token
    });

  } catch (error) {
    logger.error( `login - ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido, contacte al administrador'
    });
  }

}

/*****************************************************************************
 * 
 * Renovación de token
 * 
 *   Para poder renovar el toquen debe pasar por el Middleware "verificaToken"
 * ya que debe tener un token existente y valido
 * 
 */
const renewToken = async (req, res = response) => {

  const uid = req.uid;

  // Generar el TOKEN - JWT
  const token = await generarJWT( uid );

  // Retornar usuario
  const usuarioDB = await User.findById( uid ); 


  res.json({
      ok: true,
      token,
      usuario: usuarioDB
  });

}




module.exports = {
  login,
  renewToken
}