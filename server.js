//Setup npm install --save @google-cloud/vision


// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();


//Local file path (POC)
//const fileName = 'test1.jpg';
const fileName = 'POC/CropDummy/test1.jpg';

client
  .faceDetection(fileName)
  .then(results => {
    const faces = results[0].faceAnnotations;

    console.log('Faces:');
    faces.forEach((face, i) => {
      console.log('______________________________');
      console.log(`  Face #${i + 1}:`);
      console.log('top right?');
      console.log(`    x : ${face.boundingPoly.vertices[0].x} y: ${face.boundingPoly.vertices[0].y}`);
      console.log('top left?');
      console.log(`    x: ${face.boundingPoly.vertices[1].x} y: ${face.boundingPoly.vertices[1].y}`);
      console.log('bottom right?');
      console.log(`    x : ${face.boundingPoly.vertices[2].x} y: ${face.boundingPoly.vertices[2].y}`);
      console.log('bottom left?');
      console.log(`    x: ${face.boundingPoly.vertices[2].x} y: ${face.boundingPoly.vertices[2].y}`);
      });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
