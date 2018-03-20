$(document).ready(function () {
document.getElementById("bt1").addEventListener('click', function(){
    facerecog("https://raw.githubusercontent.com/andracs/Eeny-meeny/master/faces/face1.jpg","https://raw.githubusercontent.com/andracs/Eeny-meeny/master/faces/face2.jpg");
});});

function facerecog( url1,url2){
    var subscriptionKey = "9f8c03ea36db4e2b9c2033ef660b2374";
    //var url1="https://raw.githubusercontent.com/andracs/Eeny-meeny/master/faces/face2.jpg";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    var faceId1=null;
    var faceId2=null;
    console.log(url1);
    var params = {
        "returnFaceId": "true",

    };

    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + url1 + '"}',
    })

        .done(function(data) {
            // Show formatted JSON on webpage.
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));
            console.log(JSON.stringify(data,null,2));
            console.log(data[0].faceId);
            faceId1 = data[0].faceId;
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + url2 + '"}',
    })

        .done(function(data) {
            // Show formatted JSON on webpage.
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));
            console.log(JSON.stringify(data,null,2));
            console.log(data[0].faceId);
            faceId2 = data[0].faceId;
            //return faceId1,faceId2;
            faceveri(faceId1,faceId2);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });




}

function faceveri(faceId1,faceId2){
    var subscriptionKey = "9f8c03ea36db4e2b9c2033ef660b2374";
    var params = {

    };

    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKey);
        },
        type: "POST",
        // Request body
        data: '{"faceId1": "'+faceId1+'" ,"faceId2" : "'+faceId2+'"} ',
    })
        .done(function(data) {
            alert("success");
            console.log("faceveri"+JSON.stringify(data,null,2));
        })
        .fail(function() {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
            alert("error");
        });
}



