import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from "../../types";

import patientService from "../../services/patients";

const PatientPage = () => {
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

  if (patient.gender === "male") {
    return (
      <div className="App">
        <h2>{patient.name} <MaleIcon/></h2>
        <p>ssn: {patient.ssn}<br/>
        occupation: {patient.occupation}</p>
      </div>
    );    
  }

  if (patient.gender === "female") {
    return (
      <div className="App">
        <h2>{patient.name} <FemaleIcon/></h2>
        <p>ssn: {patient.ssn}<br/>
        occupation: {patient.occupation}</p>
      </div>
    );    
  }

  return (
    <div className="App">
      <h2>{patient.name} <TransgenderIcon/></h2>
      <p>ssn: {patient.ssn}<br/>
      occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
