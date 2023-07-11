//==============================================================
//                            SERVER
//==============================================================

"use strict";

// IMPORTS
const app = require('./app');
require('dotenv').config({path:'./.env'});


// SETTINGS
const port = process.env.PORT || 3000;

// LANCH THE SERVER
app.listen(port, async function () {
    console.log('listening on ' +'http://localhost:'+port);
  });