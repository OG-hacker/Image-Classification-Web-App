/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates detecting objects in a live video through ml5.imageClassifier + Teachable Machine.
 */
let currentSpeed = 40;
let tintcolor = 0;
let confidence = 0;
// A variable to initialize the Image Classifier
let classifier;

// A variable to hold the video we want to classify
let video;

// Variable for displaying the results on the canvas
let label = "Model loading...";
let message = "Show a sign to the camera";


let imageModelURL = "https://teachablemachine.withgoogle.com/models/L1fnEPWHy/";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(640, 480);

  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // Start detecting objects in the video
  classifier.classifyStart(video, gotResult);
}

function draw() {
    image(video, 0, 0);
  if (tintcolor === 1) fill(255, 0, 0, 80);          // red
  else if (tintcolor === 2) fill(0, 255, 0, 80);     // green
  else if (tintcolor === 3) fill(255, 165, 0, 80);   // orange
  else fill(0, 0, 0, 0);                             // no tint
  rect(0, 0, width, height);
  


  fill(0, 0, 0, 150);
  rect(10, 10, 400, 120);

  fill(0, 255, 0);
  textSize(32);
  text(label, 20, 50);
  
  fill(0, 255, 0, 200);
  textSize(20);
  text(message, 20, 90);
}

// A function to run when we get the results
function gotResult(results) {
  label = results[0].label;
    message = "Current Speed: " + currentSpeed + " MPH\nScanning for signs...";
    tintcolor = 0;
    if (label === "Stop Sign") {
    message = "Current Speed: " + currentSpeed + " MPH\nSTOP the vehicle";
    tintcolor = 1;
  } else if (label === "Speed Limit 30") {
    message = "Current Speed: " + currentSpeed + " MPH\nIncrease your speed";
    tintcolor = 2;
  } else if (label === "Speed Limit 60") {
    message = "Current Speed: " + currentSpeed + " MPH\nDecrease your speed";
    tintcolor = 3;
  } else {
    message = "Current Speed: " + currentSpeed + " MPH\nUnknown label: " + label;
    tintcolor = 0;
  }
}
