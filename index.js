// add module express
var express = require("express");
var app     = express();
// http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

var server  = require("http").Server(app);
var io      = require("socket.io")(server);
server.listen(3000);

// lắng nghe on - ai gọi lên connection
io.on("connection", function(socket) {
    console.log("Co nguoi ket noi: " + socket.id );

    socket.on("disconnect", function() {
        console.log( socket.id + "ngat ket noi !!!" );
    })

    // Lắng nghe emit của client
    socket.on("Client-send-data", function(data) {
        console.log(data);

        // case1
        // io.sockets.emit('Server-send-data', data + " 888");
        // case2
        // socket.emit('Server-send-data', data + " 888");
        // case3
        socket.broadcast.emit('Server-send-data', data + " 888");
    })

}); 

app.get("/", function(req, res) {
    res.render( "trangchu" )
});

// case1 : client A phát lên server : server phát về tất cả mọi người ( kể cả client A )
// server: io.sockets.emit
// client: socket.emit

// case2 : server chỉ trả về cho 1 client xác định
// server: socket.emit


// case3 : client A phát lên server : server chỉ phát lại cho mọi người TRỪ client A 
// server: socket.broadcast.emit

// case4: chat riêng 
// io.to("socketid").emit()

// heroku free 100 connection, có tiền tăng độ mượn :D