import express from 'express';
const app = express();
app.use(express.json())
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    if(!isNaN(height) && !isNaN(weight)) {
        const response = {
            weight: weight,
            height: height,
            bmi: bmi
        };
        res.send(response);
    } else {
        res.status(400).send({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {
    const data = req.body
    if(data.target && data.daily_exercises) {
        if(!isNaN(data.target) && !isNaN(data.daily_exercises[0])) {
            for (let l = 1; l < data.daily_exercises.length; l++) {
                if(isNaN(data.daily_exercises[l])) {
                    res.status(400).send({ error: "malformatted parameters" });  
                }
            }
            const response = calculateExercises(data.target, data.daily_exercises);
            res.send(response);
        } else {
            res.status(400).send({ error: "malformatted parameters" });            
        }
    } else {
        res.status(400).send({ error: "parameters missing" });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});