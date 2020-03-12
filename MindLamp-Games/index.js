const express = require('express');
const path = require('path');

const app = express();
var cors = require('cors');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


// Then use it before your routes are set up:
app.use(cors());
let auth = '';
let username = '';
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Games/build')));


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/Games/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
