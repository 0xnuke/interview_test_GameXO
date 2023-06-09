const express = require('express');
const { botMoves } = require('./controllers/botMoveController');
const app = express();
const cors = require('cors');

app.use(cors());


app.get('/api/botMove', botMoves);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
