/* eslint-disable max-len */
const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send([
    {
      "id": "1",
      "name": "Dreamtime 1- Smart Jacket - RDKLU#26",
      "price": 560,
      "imglink":
        "1_4164f62a-7e97-48bc-8b7c-c89a3a076ec0_900x.jpg",
    },
    {
      "id": "2",
      "name": "Dreamtime 2- Smart Jacket - RDKLU#26",
      "price": 560,
      "imglink":
        "1_z_3e75cd7d-50e4-434c-a27e-3f17a080292c_540x.jpg",
    },
    {
      "id": "3",
      "name": "Dreamtime 3- Smart Jacket - RDKLU#26",
      "price": 560,
      "imglink":
        "5_cb48f725-08c0-47a2-a0af-e769ac62363c_900x.jpg",
    },
    {
      "id": "4",
      "name": "Dreamtime 4- Smart Jacket - RDKLU#26",
      "price": 560,
      "imglink":
        "5_cb48f725-08c0-47a2-a0af-e769ac62363c_900x.jpg",
    },
    {
      "id": "5",
      "name": "Dreamtime 5- Smart Jacket - RDKLU#26",
      "price": 560,
      "imglink":
        "115zz_900x.jpg",
    },
    {
      "id": "6",
      "name": "Dreamtime 6- Smart Jacket - RDKLU#26",
      "price": 560,
      "imglink":
      "115zz_900x.jpg",
    },
  ]);
});
