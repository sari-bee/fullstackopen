import HospitalIcon from '@mui/icons-material/LocalHospital';
import DiagnosisCodes from './DiagnosisCodes';
import { Diagnosis, HospitalEntry } from "../../types";

const DischargeDetail: React.FC<{ entry : HospitalEntry }> = ({ entry }) => {
  if (typeof entry.discharge == "undefined") {
    return (
      <></>
    )
  } else {
    return (
      <>discharged on {entry.discharge.date}: {entry.discharge.criteria}<br/></>
    )
  }
}

const HospitalEntryDetail: React.FC<{ entry : HospitalEntry, diagnoses: Diagnosis[]  }> = ({ entry, diagnoses }) => {
  return (
    <>
      <p>{entry.date} <HospitalIcon/><br/>
      <i>{entry.description}</i><br/>
      specialist {entry.specialist}</p>
      <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses}/>
      <DischargeDetail entry={entry}/>
    </>
  )
}

export default HospitalEntryDetail;

  