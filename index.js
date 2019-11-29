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

var mangUsers=[];

io.on("connection", function(socket) {
    console.log("Connection: " + socket.id);

    socket.on("client-send-username", function(data) {
        console.log( data );

        if( mangUsers.indexOf(data) >= 0 ) {
            
            socket.emit("server-send-dki-thatbat");

        } else {
            
            mangUsers.push(data);
            socket.Username = data; // tạo thêm Username 
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danh-sach-Users", mangUsers);
        }

    });

    socket.on("client-send-signout", function() {
        mangUsers.splice( 
            mangUsers.indexOf( socket.Username ),
            1
         );

        socket.broadcast.emit("server-send-danh-sach-Users", mangUsers);
    });

    socket.on("user-send-message", function(data) {
        socket.emit("server-send-message-to-me", {un:socket.Username, nd:data} );

        socket.broadcast.emit("server-send-message-to-another", {un:socket.Username, nd:data} )
    });



    socket.on("toi-dang-go-chu", function() {
        data = '.......';
        socket.broadcast.emit("server-ai-dang-ngo-chu", {un:socket.Username, nd:data} );
    });

    socket.on("toi-ngung-go-chu", function() {
        io.sockets.emit("server-ngung-go-chu");
    });

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

// case4: room gôm nhóm socket lại chat riêng 
// io.to("socketid").emit()

// heroku free 100 connection, có tiền tăng độ mượn :D