
$(function() {
    var personIO = io("http://" + window.location.host + "/persons");

    var selectedPerson;

    personIO.on('connect', function () {
        console.log('You are connected');

        personIO.emit("get users",function(callback){
            var username = localStorage.getItem("username");
            $("#username").val(username);
            addUser(username);
            $("#personList").html("");
            callback.users.forEach(function (user) {
                if(username != user) {
                    $("#personList").append("<li><a class='userlist' style='cursor: pointer' data-value=" + user + ">" + user + "</a></li>");
                }
            })
        });

    });

    personIO.on('disconnect', function () {
        console.log('You are disconnected');
    });

    personIO.on("user left",function(data){
        $("#personList li a[data-value='" + data + "']").parent("li").remove();
    });

    $( "#enterName" ).click(function(e) {
        e.preventDefault();
        var username = $("#username");
        if(username.val() == "") return;
        
        localStorage.setItem("username", username.val());
        addUser(username.val());
    });

    $( "#leave" ).click(function(e) {
        e.preventDefault();
        var username = localStorage.getItem("username");
        localStorage.removeItem(username);
        personIO.emit('leave', username);
    });

    personIO.on('new user', function(data){
        $("#personList").append("<li><a class='userlist' style='cursor: pointer' data-value="+ data.user +">" + data.user + "</a></li>");
    });

    $("ul").on("click",'li a.userlist',function(){
        selectedPerson = $(this).attr('data-value');
        $("#userSelected").text(selectedPerson);
    });

    $("#sendPersonMessage").on("click",function(e){
        e.preventDefault();
        var msg = $("#chatPersonMessage");
        if(msg.val() == "") return;

        $("#chatPersonMessages").append("<li>" + msg.val() + "</li>");
        personIO.emit("new message", { receiver: selectedPerson, message: msg.val() });

        msg.val("");
    });

    personIO.on("get message",function(data){
       $("#chatPersonMessages").append("<li>" + data + "</li>");
    });

    var addUser = function(username) {
        personIO.emit('new user', username , function(callback){
            console.log(callback);
        });
    }

});






