//Setup npm install --save @google-cloud/vision
// npm install --save jimp

// Googole sdk + auth https://cloud.google.com/vision/docs/auth
// API Token = 'API_TOKEN/googleapi.json'
//setup step 1: opdater gcloud;  gcloud components update
//step 2: få token; gcloud auth activate-service-account --key-file .\API_TOKEN\googleapi.json
//step 3 env varialbel (powershell) $env:GOOGLE_APPLICATION_CREDENTIALS =".\API_TOKEN\googleapi.json"
//step 4: node .\server.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SocketIOFile = require('socket.io-file');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();


//Local file path (sandbox)

//const fileName = 'test-photos/test2.jpg';

var Jimp = require("jimp");



app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/app.js', (req, res, next) => {
   return res.sendFile(__dirname + '/public/app.js');
});

app.get('/socket.io.js', (req, res, next) => {
   return res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/socket.io-file-client.js', (req, res, next) => {
   return res.sendFile(__dirname + '/node_modules/socket.io-file-client/socket.io-file-client.js');
});

io.on('connection', (socket) => {
    console.log('Socket connected.');

    var uploader = new SocketIOFile(socket, {
        // uploadDir: {			// multiple directories
        // 	music: 'data/music',
        // 	document: 'data/document'
        // },
        uploadDir: 'data',							// simple directory
        accepts: ['audio/mpeg', 'audio/mp3', 'image/png' ,'image/jpg','image/jpeg'],		// chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
        //maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
        chunkSize: 10240000,							// default is 10240(1KB)
        transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
        overwrite: true 							// overwrite file if exists, default is true.
    });
    uploader.on('start', (fileInfo) => {
        console.log('Start uploading');
        console.log(fileInfo);
    });
    uploader.on('stream', (fileInfo) => {
        console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
    });
    uploader.on('complete', (fileInfo) => {
        console.log('Upload Complete.');
        console.log(fileInfo);
        console.log(fileInfo.name);
        fileName = "data/" + fileInfo.name;
        client
          .faceDetection(fileName)
          .then(results => {
            const faces = results[0].faceAnnotations;

            console.log('Faces:');

            faces.forEach((face, i) => {
              let x = face.boundingPoly.vertices[0].x;
              let y = face.boundingPoly.vertices[0].y;
              let w = face.boundingPoly.vertices[2].x - x;
              let h = face.boundingPoly.vertices[2].y - y;
              cropImage(fileName, "face" + i, x, y, w, h);
            });
          })
          .catch(err => {
            console.error('ERROR:', err);
          });


    });
    uploader.on('error', (err) => {
        console.log('Error!', err);
    });
    uploader.on('abort', (fileInfo) => {
        console.log('Aborted: ', fileInfo);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

  //Gets image, should write a new local file cropped to fit the faces
  function cropImage(src, newName, x1, y1, x2, y2) {
    console.log("cropping");
    console.log("DEBUG: x:" + x1 + " y :" + y1 + "\n w: " + x2 + " h: " + y2);
    Jimp.read(src, function(err, src) {
      if (err) throw err;
      src.crop(x1, y1, x2, y2)
        .write("faces/" + newName + ".jpg");


    });

  }

/*
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();


//Local file path (sandbox)
const fileName = 'test-photos/test1.jpg';
//const fileName = 'test-photos/test2.jpg';

var Jimp = require("jimp");

client
  .faceDetection(fileName)
  .then(results => {
    const faces = results[0].faceAnnotations;

    console.log('Faces:');

    faces.forEach((face, i) => {
      let x = face.boundingPoly.vertices[0].x;
      let y = face.boundingPoly.vertices[0].y;
      let w = face.boundingPoly.vertices[2].x - x;
      let h = face.boundingPoly.vertices[2].y - y;
      cropImage(fileName, "face" + i, x, y, w, h);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


//Gets image, should write a new local file cropped to fit the faces
function cropImage(src, newName, x1, y1, x2, y2) {
  console.log("cropping");
  console.log("DEBUG: x:" + x1 + " y :" + y1 + "\n w: " + x2 + " h: " + y2);
  Jimp.read(src, function(err, src) {
    if (err) throw err;
    src.crop(x1, y1, x2, y2)
      .write("faces/" + newName + ".jpg");


  });


});
*/
