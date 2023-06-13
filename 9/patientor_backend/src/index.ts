import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});