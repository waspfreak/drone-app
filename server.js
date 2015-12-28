//REMMEBER: THE PC NEED BE CONECCTED IN DRONE WIFI

console.log("starting node server...");
// Test IP
// 127.0.0.1:8080

//Drone control
var arDrone = require("ar-drone"); //libreria Drone
var drondinez = arDrone.createClient();

function bateria()
{
  console.log("Bateria: " + drondinez.battery());
}

function takeoff_drone(){
  drondinez.config("control:altitude_max", 1000000);
  drondinez.takeoff();
  rotar_drone();
}

function rotar_drone(){
  drondinez.stop();
  drondinez.calibrate(0);
}

function up_drone(){
  drondinez.stop();
  drondinez.up(1);
}

function land_drone(){
  drondinez.stop();
  drondinez.land();
}

//Express and node server conection
var express = require("express"); //llamma la libreria express
var web = express();
var server; //arranca qdo arranca la web
//var parceiro = require("body-parser");
//web.use( parceiro.urlencoded({extended: true})); //{extended: true} for not show more body-parser deprecated in console


server = web.listen(8080, function(){
  console.log("node server on!!!!")
});


web.get("/", function(req, res){
  console.log("home");
  bateria();
  res.sendfile("opciones.html");
});

web.get("/takeoff", function(req, res){
  console.log("takeoff");
  bateria();
  takeoff_drone();
  res.sendfile("opciones.html");
});

web.get("/up", function(req, res){
  console.log("up");
  bateria();
  up_drone();
  res.sendfile("opciones.html");
});


web.get("/land", function(req, res){
  console.log("aterrizar");
  land_drone();
  bateria();
  res.sendfile("opciones.html");
});
