import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const patid = req.params.id;
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(patid, newEntry);
        res.send(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;