/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
 const logger = require('log4js').getLogger('photos');
 const axios = require('axios');

/*****************************************************************************
 * 
 * Controlado "listar" posts
 * 
 */

const getPosts = async ( req, res ) => {

  try {
    
    const { data } = await axios.get( `${ process.env.BASE_URL_JPH }/posts`);

    res.json({
      ok: true,
      data
    });


  } catch (err) {
    logger.error( error );    
    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido comuniquese con el administradro'
    });
  }


}

module.exports = { 
  getPosts
}