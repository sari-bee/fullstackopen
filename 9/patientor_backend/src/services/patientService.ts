import patientData from '../../data/patients';
import { PatientWithoutSsn, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientWithoutSsn[] = patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
})) as PatientWithoutSsn[];

const getPatients = (): PatientWithoutSsn[] => {
    return patients;
};

const getById = (id: string): PatientWithoutSsn | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
}

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid()
    const newPatient = {
        id, ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

export default { getPatients, getById, addPatient };