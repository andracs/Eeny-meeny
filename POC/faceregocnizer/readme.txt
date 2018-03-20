face skal have en public url til et billede. returnere face ID som json.

faceverify skal have to face id som input i body, det kommer fra første json resultat fra facedetect.

https://westcentralus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523a

{
    "faceId": "c5c24a82-6845-4031-9d5d-978df9175426",
    "personId": "815df99c-598f-4926-930a-a734b3fd651c",
    "largePersonGroupId": "sample_group"
}

{
    "faceId1": "c5c24a82-6845-4031-9d5d-978df9175426",
    "faceId2": "815df99c-598f-4926-930a-a734b3fd651c",

}