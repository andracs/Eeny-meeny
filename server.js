//Setup npm install --save @google-cloud/vision
// npm install --save jimp

// Googole sdk + auth https://cloud.google.com/vision/docs/auth
// API Token = 'API_TOKEN/googleapi.json'
//setup step 1: opdater gcloud;  gcloud components update
//step 2: få token; gcloud auth activate-service-account --key-file .\API_TOKEN\googleapi.json
//step 3 env varialbel (powershell) $env:GOOGLE_APPLICATION_CREDENTIALS =".\API_TOKEN\googleapi.json"
//step 4: node .\server.js


// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();


//Local file path (POC)
//const fileName = 'test1.jpg';
const fileName = 'POC/CropDummy/test1.jpg';

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
}
