import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Diagnosis } from "../../types";

import patientService from "../../services/patients";

interface Props {
  diagnoses: Diagnosis[]
}

interface CodeProps {
  codes: String[] | undefined
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses } : Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id as String) as Patient;
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]); 

  if (!patient) {
    return (
    <div>
      nothing here...
    </div>
    );
  }

  const DiagnosisCodes = ({ codes, diagnoses } : CodeProps) => {
    if (typeof codes == "undefined") {
      return (
        <></>
      )
    } else {

      return (
        <><ul>{codes?.map((c, i) => <li key={i}>{c} {diagnoses.find(d => d.code === c)?.name}</li>)}</ul></>
      )
    }
  }

  const Entries = ({diagnoses} : Props) => {
    const entrylist = patient.entries;
    if (!entrylist || entrylist?.length === 0) {
      return (
        <>
          <h3>no entries yet</h3>
        </>
      )
    }
    return (
      <>
        <h3>entries</h3>
        {Object.values(entrylist).map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} <i>{entry.description}</i>
            </p>
            <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses}/>
          </div>
          ))}
      </>
    )
  }

  if (patient.gender === "male") {
    return (
      <div className="App">
        <h2>{patient.name} <MaleIcon/></h2>
        <p>ssn: {patient.ssn}<br/>
        occupation: {patient.occupation}</p>
        <Entries diagnoses={diagnoses}/>
      </div>
    );    
  }

  if (patient.gender === "female") {
    return (
      <div className="App">
        <h2>{patient.name} <FemaleIcon/></h2>
        <p>ssn: {patient.ssn}<br/>
        occupation: {patient.occupation}</p>
        <Entries diagnoses={diagnoses}/>
      </div>
    );    
  }

  return (
    <div className="App">
      <h2>{patient.name} <TransgenderIcon/></h2>
      <p>ssn: {patient.ssn}<br/>
      occupation: {patient.occupation}</p>
      <Entries diagnoses={diagnoses}/>
    </div>
  );
};

export default PatientPage;
