const express = require('express');
const path = require('path');

let port = process.env.PORT || 5000;

// Serve the static files from the React app
const box = express();
box.use(express.static(path.join(__dirname, 'Box/build')));
box.get('/box', (req,res) =>{
	res.sendFile(path.join(__dirname+'/Box/build/index.html'));
});
box.listen(port);
console.log('/box is listening on port ' + port);

port = process.env.PORT || 5001;

const jewels = express();
jewels.use(express.static(path.join(__dirname, 'Jewels/build')));
jewels.get('/jewels', (req,res) =>{
	res.sendFile(path.join(__dirname+'/Jewels/build/index.html'));
});
jewels.listen(port);
console.log('/jewels is listening on port ' + port);

port = process.env.PORT || 5002;

const catsndogs = express();
catsndogs.use(express.static(path.join(__dirname, 'CatsnDogs/build')));
catsndogs.get('/catsndogs', (req,res) =>{
	res.sendFile(path.join(__dirname+'/CatsnDogs/build/index.html'));
});
catsndogs.listen(port);

console.log('/catsndogs is listening on port ' + port);

port = process.env.PORT || 5003;

const popupbubbles = express();
popupbubbles.use(express.static(path.join(__dirname, 'PopTheBubbles/build')));
popupbubbles.get('/popthebubbles', (req,res) =>{
	res.sendFile(path.join(__dirname+'/PopTheBubbles/build/index.html'));
});
popupbubbles.listen(port);

console.log('/popthebubbles is listening on port ' + port);
