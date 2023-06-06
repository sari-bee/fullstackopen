import express from 'express';
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});