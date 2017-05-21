/**
 * Created by apbalaji on 15/05/17.
 */

'use strict';

const express = require('express');
const dbHandle = require('./dbHandle.js')
const app = express();

const routes = require("./routes.js")(app, dbHandle)
const PORT = 8080;
app.listen(PORT, function(){
	console.log("Running on port " + PORT);
});
