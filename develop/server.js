const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const sequelize = require('./config/connection');










server.listen(port,()=>{ console.log(`Server live ${port}.`)});
