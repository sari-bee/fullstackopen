import express from 'express';
const app = express();
import { calculateBmi } from "./bmiCalculator";


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    const bmi = calculateBmi(height, weight)
    if(!isNaN(height) && !isNaN(weight)) {
        const response = {
            weight: weight,
            height: height,
            bmi: bmi
        }
        res.send(response)
    } else {
        res.status(400).send({ error: "malformatted parameters" })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});