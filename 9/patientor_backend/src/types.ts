export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
};

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type?: "HealthCheck";
    healthCheckRating?: HealthCheckRating;
  }
  
  export interface SickLeave {
    startDate: string;
    endDate: string;
  }

  interface OccupationalHealthcareEntry extends BaseEntry { 
    type?: "OccupationalHealthcare";
    employerName?: string;
    sickLeave?: SickLeave;
  }

  export interface Discharge {
    date: string;
    criteria: string;
  }
  
  interface HospitalEntry extends BaseEntry {
    type?: "Hospital";
    discharge?: Discharge;
  }
  
  export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]

}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type PatientWithoutSsn = UnionOmit<Patient, 'ssn' | 'entries'>;
export type NewPatient = UnionOmit<Patient, 'id' | 'entries'>;
export type NewEntry = UnionOmit<Entry, 'id'>;