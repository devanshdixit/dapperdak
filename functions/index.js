
const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const razorpay = new Razorpay({
  key_id: "rzp_test_5iQx14eJBLhSU1",
  key_secret: "fLqc6q8m5purPR3VLu824bjY",
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
   response.json([
    {
      id: "1",
      name: "Dreamtime 1- Smart Jacket - RDKLU#26",
      price: 560,
      imglink: "1_4164f62a-7e97-48bc-8b7c-c89a3a076ec0_900x.jpg",
    },
    {
      id: "2",
      name: "Dreamtime 2- Smart Jacket - RDKLU#26",
      price: 560,
      imglink: "1_z_3e75cd7d-50e4-434c-a27e-3f17a080292c_540x.jpg",
    },
    {
      id: "3",
      name: "Dreamtime 3- Smart Jacket - RDKLU#26",
      price: 560,
      imglink: "5_cb48f725-08c0-47a2-a0af-e769ac62363c_900x.jpg",
    },
    {
      id: "4",
      name: "Dreamtime 4- Smart Jacket - RDKLU#26",
      price: 560,
      imglink: "5_cb48f725-08c0-47a2-a0af-e769ac62363c_900x.jpg",
    },
    {
      id: "5",
      name: "Dreamtime 5- Smart Jacket - RDKLU#26",
      price: 560,
      imglink: "115zz_900x.jpg",
    },
    {
      id: "6",
      name: "Dreamtime 6- Smart Jacket - RDKLU#26",
      price: 560,
      imglink: "115zz_900x.jpg",
    },
  ]);
});

exports.payment = functions.https.onRequest((request, response) => {
  const instance = new Razorpay({
    key_id: "rzp_test_5y0vxFmWdriocg",
    key_secret: "9azSliyZ6pxPTmITHFHFKZAa",
  });

  const options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
  });
});

exports.verification = functions.https.onRequest((req, res) => {
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

exports.razorpay = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const data = JSON.parse(req["body"]);
  console.log(data);

  const payment_capture = 1;
  const amount = data["amount"];
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.user = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const user = JSON.parse(req["body"]);
  const isUser = await db.collection("users").where("email", "==", user.email).get();
  
  if (isUser.empty) {
    console.log("No user creating new user")
    const docRef = db.collection("users").doc();
    const data = await docRef.set({
      name: user.name,
      email: user.email,
      id: docRef.id,
    });
    console.log("new user created")
    res.send(data);
  } else {
    console.log("Already a registered user")
    isUser.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    res.send(isUser.docs);
  }
});
