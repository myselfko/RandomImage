var express = require('express');
var cors = require('cors');
var fs = require('fs');
var images;

function random(max) {
    return Math.floor(Math.random() * max);
}

function date() {
    return new Date().toString().substring(4, 24) +': ';
}

function refreshImages() {
    images = fs.readdirSync(__dirname +'\\public\\images');
};
refreshImages();

var app = express();
app.use(cors());
app.use(express.static(__dirname +'/public'));

app.get('/image', (req, res) => {
    if (images.length === 0) {
        refreshImages();
        console.log(date() +'Refreshing images ('+ images.length +')');
    }

    var rand = random(images.length);
    res.send('/images/' + images[rand]);
    images.splice(rand, 1);
});

app.listen(8080, () => {
    console.log(date() +'Server started');
    console.log(date() +'Serving '+ images.length +' images');
});