/*
Documentation is like sex, when it is good, it is really good
When it is bad, it is better than nothing
*/

//port number
var port = process.env.PORT || 3000

//Get local ip argument from command input
var os = require('os');
var opn = require('opn');
const url = require("url")

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

var LocalIP = addresses[0]

var fs = require('fs');
var static = require('node-static');
var express = require('express');
var applet = express();
var axios = require("axios")

applet.use(express.static(__dirname + '/public'));

var clients = 0;

//run the server
var app = applet.listen(port,()=>{
    console.log(`server is up at`)
    console.log(`${LocalIP}:3000/ for caregiver's view`)
     console.log(`${LocalIP}:3000/patient for patient's view`)
     opn(`http://${LocalIP}:3000/patient`,{app:"firefox"});

});

function addLog(content){
    var date = new Date()
    var date = date.toLocaleString()
    fs.appendFile("data/log.txt",date+"\n "+content)
}

//render the patient view
applet.get("/patient",(req,res)=>{
    res.sendFile('public/instructionForPatient.html' , { root : __dirname});
})

applet.get("/chat",(req,res)=>{
    res.sendFile("public/chatroom.html",{root:__dirname})
})

var IP=""
applet.get("/:ip",(req,res)=>{
    var array = req.url.split("/")
    var ip = array[array.length-1]
    IP = ip
    console.log(IP)
   
})


    
    //establish socket.io
    var io = require('socket.io')(app);
    io.on('connection', function(socket) {
        
        console.log('client connected', socket.id);
        clients++;
        io.sockets.emit('broadcast', { description: clients + ' clients connected!' });

        //set IP address after getting data from server ip input box
        socket.on("setIP",function(data){
            IP=data.IP
            console.log(IP)
        })

        //turn on the light of shirt's drawer by sending a get http request to serial port server
        socket.on("LightShirt",function(){
            axios.get( `http://${IP}/SHIRT`)
            console.log("shirt lighted")
            console.log(`http://${IP}/SHIRT`)

            //add button click to the log file
            addLog("Shirt button clicked")
        })  

         //turn on the light of pants's drawer by sending a get http request to serial port server
        socket.on("LightPants",function(){
            axios.get( `http://${IP}/PANTS`)
            console.log("Pants lighted")
            console.log(`http://${IP}/PANTS`)
             //add button click to the log file
            addLog("Pants button clicked")
        })

        //turn on the light of socks's drawer by sending a get http request to serial port server
        socket.on("LightSocks",function(){
            axios.get( `http://${IP}/SOCKS`)
            console.log("socks lighted")
            console.log(`http://${IP}/SOCKS`)
             //add button click to the log file
            addLog("Socks button clicked")
        })

        //turn on the light of shoes's drawer by sending a get http request to serial port server
        socket.on("LightShoes",function(){
            axios.get( `http://${IP}/SHOES`)
            console.log("shoes lighted")
            console.log(`http://${IP}/SHOES`)
              //add button click to the log file
            addLog("Shoes button clicked")

          
        })

        var audioFiles = ['Open the drawer with the green light', 'Take out the shirt', 'Open the shirt', 'Turn the shirt around', 'Push your arm through the opening hole on one side', 'Now put your other arm through the opening hole on the other side', 'Bring the sides of the shirt together in front of you', 'Line up the buttons with the button holes', 'Push the buttons through the holes', 'Open the drawer with the green light', 'Take out the pants', 'Hold the pants in front of your legs', 'Turn the pants around', 'Sit on the chair', 'Put one leg in the pant', 'Put your other leg in the pant', 'Pull the pants up so you see your feet', 'Stand up', 'Zip up the pants', 'Button the pants', 'Open the drawer with the green light', 'Take out the socks', 'Sit on the chair', 'Put on the socks', 'Open the drawer with the green light', 'Take out the shoes', 'Sit on the chair', 'Put on the shoes', 'Open the drawer with the green light', 'Take out the glasses', 'Put on the glasses', 'Take off your pajamas', 'Take out the underwear', 'Put on the underwear']

        //deliver the instructions 
        socket.on("playAudio",function(data){

            io.emit("play",data)

           
            var date = new Date()
    var date = date.toLocaleString()
    fs.appendFile("data/log.txt",date+"\n  "+audioFiles[data.data])
        })
        
        //save notes
        socket.on("saveNotes",function(data){
            var date = new Date()
            var date = date.toLocaleString()
            fs.appendFile("data/notes.txt",date+"\n "+data.data+"\n",(e)=>{
                console.log(e)
            })
        })

        //save advices
        socket.on("saveAdvice",function(data){
             var date = new Date()
            var date = date.toLocaleString()
            fs.appendFile("data/advice.txt",`${date}\nscore:${data.data}\nAdvice:${data.notes}\n\n\n`,(e)=>{
                console.log(e)
            })
        })


        socket.on('disconnect', function() {
            clients--;
            io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
        });

        //two way audio chat 
         // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });
    });
