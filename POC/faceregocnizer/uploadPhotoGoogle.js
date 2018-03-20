//prøver JavaScript upload til at føde direkte til Google Vision, men jeg tror ikke vi kommer uden om bucket løsningen alligevel
//Google Vision kræver en public URI, og den cache billedet uploader til via JS er ikke public, så det ikke sikkert den kan fødes
//direkte...

$(document).ready(function(){

    function isUploadSupported() {
        if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
            return false;
        }
        var elem = document.createElement('input');
        elem.type = 'file';
        return !elem.disabled;
    };
    
    if (window.File && window.FileReader && window.FormData) {
        var $inputField = $('#file');
    
        $inputField.on('change', function (e) {
            var file = e.target.files[0];
    
            if (file) {
                if (/^image\//i.test(file.type)) {
                    readFile(file);
                } else {
                    alert('Not a valid image!');
                }
            }
        });
    } else {
        alert("File upload is not supported!");
    }
    
    function readFile(file) {
        var reader = new FileReader();
    
        reader.onloadend = function () {
            processFile(reader.result, file.type);
        }
    
        reader.onerror = function () {
            alert('There was an error reading the file!');
        }
    
        reader.readAsDataURL(file);
      console.log(file);
    }
    });
    
    /*function sendFile(fileData) {
        var formData = new FormData();
        formData.append('imageData', fileData);
        $.ajax({
            type: 'POST',
            url: "https://vision.googleapis.com/v1/images:annotate?key=APIKEY",
            data: formData,
            success: function (data) {
                if (data.success) {
                    alert('Your file was successfully uploaded!');
                } else {
                    alert('There was an error uploading your file!');
                }
            },
            error: function (data) {
                alert('There was an error uploading your file!');
            }
        });
    }*/
    
    /*<script type="text/javascript">
    var b=JSON.stringify({"requests":[{  "image":{    "source":{"imageUri":"https://cloud.google.com/vision/docs/images/car.png"}}  ,  "features": [{"type":"LABEL_DETECTION","maxResults":5}]    } ]});
    var e=new XMLHttpRequest;
    
    e.onload=function(){console.log(e.responseText)};
    e.open("POST","https://vision.googleapis.com/v1/images:annotate?key=APIKEY",!0);
    e.send(b)
    </script>*/