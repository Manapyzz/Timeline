const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));



var postList = [];

io.on('connection', socket => {


    socket.emit('sendPostList', postList);

    socket.on('post', (post) => {
    	postList.push(post);
        socket.broadcast.emit('post', post);
    });

    socket.on('deletePost', (post) => {

    	var index = postList.map(function(post) {return post.id; }).indexOf(post.id);

		postList.splice(index, 1);   

        socket.broadcast.emit('sendPostList', postList);
    });

    socket.on('disconnect', function() {
        console.log('Bye');
    });

});

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server is listening on port ${port}`));