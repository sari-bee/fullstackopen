import patientData from '../../data/patients';
import { PatientWithoutSsn, Patient, NewPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientWithoutSsn[] = patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
})) as PatientWithoutSsn[];

const patientsfull: Patient[] = patientData.map(({ id, name, ssn, occupation, dateOfBirth, gender, entries }) => ({
    id, name, ssn, occupation, dateOfBirth, gender, entries
})) as Patient[];

const getPatients = (): PatientWithoutSsn[] => {
    return patients;
};

const getById = (id: string): Patient | undefined => {
    const patient = patientsfull.find(p => p.id === id);
    return patient;
}

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid()
    const entries = [] as Entry[]
    const newPatient = {
        id, entries, ...patient,
    };
    const patientwithoutssn = {
        id, name: patient.name, occupation: patient.occupation,
        dateOfBirth: patient.dateOfBirth, gender: patient.gender
    }
    patients.push(patientwithoutssn as PatientWithoutSsn);
    patientsfull.push(newPatient as Patient);
    return newPatient;
};

const addEntry = (patid: string, entry: NewEntry): Entry => {
    const patient = getById(patid);
    if (!patient) {
        throw new Error('patient not found');
    }
    const id = uuid()
    const newEntry = {
        id, ...entry,
    };
    patient.entries.push(newEntry as Entry);
    return newEntry;
}

export default { getPatients, getById, addPatient, addEntry };