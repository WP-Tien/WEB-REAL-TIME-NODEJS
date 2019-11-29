var socket = io("http://localhost:3000/");
var html = '';

socket.on("server-send-dki-thatbat", function() {
    alert("Co nguoi da dang ky roi");
});

socket.on("server-send-dki-thanhcong", function(data) {
    $('#currentUser').html( "Xin chào " + data );
    $('#loginForm').hide(2000);
    $('#chatForm').show(1000);
});

socket.on("server-send-danh-sach-Users", function(data) {
    $('.inbox_chat').html('');
    data.forEach(function(i) {
        $('.inbox_chat').append("<div class='chat_list active_chat'><div class='chat_people'><div class='chat_img'><img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'/></div><div class='chat_ib'><h5>"+ i +"<span class='chat_date'>Dec 25</span></h5><p>Test, which is a new approach to have all solutions astrology under one roof. </p></div></div></div>");
    });
})

socket.on("server-send-message-to-me", function(data) {
    $(".msg_history").append("<div class='outgoing_msg'><div class='sent_msg'>" + data.un + "<p>" + data.nd + "</p><span class='time_date'> 11:01 AM | June 9</span></div></div>");
});

socket.on("server-send-message-to-another", function(data) {
    $(".msg_history").append("<div class='incoming_msg'><div class='incoming_msg_img'><img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'/> </div> <div class='received_msg'><div class='received_withd_msg'>" + data.un + "<p>" + data.nd + "</p><span class='time_date'> 11:01 AM | Yesterday</span></div></div></div>");
});

socket.on("server-ai-dang-ngo-chu", function (data) {
    $(".msg_history").append("<div class='incoming_msg dang_go'><div class='incoming_msg_img'><img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'/> </div> <div class='received_msg'><div class='received_withd_msg'>" + data.un + "<p>" + data.nd + "</p><span class='time_date'> 11:01 AM | Yesterday</span></div></div></div>");
})

socket.on("server-ngung-go-chu", function() {
    $(".msg_history").find('.incoming_msg.dang_go').remove();
})

$(document).ready(function () {
    $('#loginForm').show();
    $('#chatForm').hide();

    $('#txtMessage').focusin(function() {
        socket.emit("toi-dang-go-chu");
    });

    $('#txtMessage').focusout(function() {
        socket.emit("toi-ngung-go-chu");
    })

    $('#btnRegister').click( function() {
        socket.emit("client-send-username", $("#txtUsername").val() );
    })

    $('#btnSignout').click( function() {
        socket.emit("client-send-signout");
        $('#chatForm').hide(2000);
        $('#loginForm').show(1000);
    })

    $('#btnSendMessage').click(function() {
        socket.emit('user-send-message', $("#txtMessage").val() );
    })


});