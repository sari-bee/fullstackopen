import { NewPatient, Gender, NewEntry } from './types'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string');
    }
    return string;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('incorrect or missing gender');
    }
    return gender;
}

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object' || object == null) {
        throw new Error('incorrect or missing data');
    } 
    if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
        const newPat: NewPatient = {
            name: parseString(object.name),
            ssn: parseString(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };
        return newPat;
    }
    throw new Error('some fields are missing');
};

export const toNewEntry = (object: any): NewEntry => {
    if (!object || typeof object !== 'object' || object == null) {
        throw new Error('incorrect or missing data');
    } 
    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        if (object.type === "HealthCheck" && !('healthCheckRating' in object)) {
            throw new Error('some fields are missing');            
        }
        if (object.type === "OccupationalHealthcare" && !('employerName' in object)) {
            throw new Error('some fields are missing');
        }
        return object;
    }
    throw new Error('some fields are missing');
};