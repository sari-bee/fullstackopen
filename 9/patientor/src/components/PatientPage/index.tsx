import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Patient, Diagnosis, Entry, EntryFormValues } from "../../types";
import AddEntryModal from "../AddEntryModal";
import patientService from "../../services/patients";
import GenderIcon from './GenderIcon';
import OccupationalHealthcareEntryDetail from './OccupationalHealthcareEntryDetail';
import HealthCheckEntryDetail from './HealthCheckEntryDetail';
import HospitalEntryDetail from './HospitalEntryDetail';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses } : Props) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const id = useParams().id;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getOne(id as String) as Patient;
        setPatient(patient);
        setEntries(patient.entries);
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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      setEntries(patient.entries?.concat(entry));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


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
    if (!entries || entries?.length === 0) {
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
        {entries?.map((entry) => (
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
