const express = require('express');
const router = express.Router();

//rutas
router.use( '/api/users',       require( './user.router' ) );
router.use( '/api/auth',        require( './auth.router' ) );
router.use( '/api/photos',      require( './photos.router' ) );
router.use( '/api/posts',       require( './posts.router' ) );

module.exports = router;