import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Patient, Diagnosis, Entry } from "../../types";
import patientService from "../../services/patients";
import GenderIcon from './GenderIcon';
import OccupationalHealthcareEntryDetail from './OccupationalHealthcareEntryDetail';
import HealthCheckEntryDetail from './HealthCheckEntryDetail';
import HospitalEntryDetail from './HospitalEntryDetail';

interface Props {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses } : Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getOne(id as String) as Patient;
        setPatient(patient);
      } catch (error) {
        console.log(error);
      }
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

  const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    switch(entry.type) {
      case "Hospital":
        return <HospitalEntryDetail entry={entry} diagnoses={diagnoses}/>
      case "HealthCheck":
        return <HealthCheckEntryDetail entry={entry} diagnoses={diagnoses}/>
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetail entry={entry} diagnoses={diagnoses}/>
      default:
        return null;
    }
  }

  const Entries = ({diagnoses} : Props) => {
    if (!patient.entries || patient.entries?.length === 0) {
      return (
        <>
          <h3>no entries yet</h3>
        </>
      )
    }
    return (
      <>
        <h3>entries</h3>
        <hr></hr>
        {patient.entries?.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses}/>
            <hr></hr>
          </div>
          ))}
      </>
    )
  }

  return (
    <div className="App">
      <h2>{patient.name} {GenderIcon(patient.gender)}</h2>
      <p>ssn: {patient.ssn}<br/>
      occupation: {patient.occupation}</p>
      <Entries diagnoses={diagnoses}/>
      <Button component={Link} to="/" variant="contained" color="primary">
      Add new entry
      </Button>
    </div>
  );
};

export default PatientPage;
