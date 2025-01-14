const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});