/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
 const logger = require('log4js').getLogger('photos');
 const axios = require('axios');

/*****************************************************************************
 * 
 * Controlado "listar" photos
 * 
 */

const getPhotos = async ( req, res ) => {

  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  try {
    

    const { data } = await axios.get( `${ process.env.BASE_URL_JPH }/photos`);
    
    const total = data.length;
    
    if( offset < 0 || offset > total - limit ){
      return res.status( 400 ).json({
        ok: false,
        data: 'Número fuera de rango'
      });
    }
    
    const end = offset + limit;
    const photos = data.slice( offset, end );

    res.json({
      ok: true,
      total,
      data: photos
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
  getPhotos
}