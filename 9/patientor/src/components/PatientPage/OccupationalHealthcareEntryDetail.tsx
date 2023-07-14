import WorkIcon from '@mui/icons-material/Work';
import DiagnosisCodes from './DiagnosisCodes';
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

const SickLeaveDetail: React.FC<{ entry : OccupationalHealthcareEntry }> = ({ entry }) => {
  if (typeof entry.sickLeave == "undefined") {
    return (
      <></>
    )
  } else {
    return (
      <>sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}<br/></>
    )
  }
}

const OccupationalHealthcareEntryDetail: React.FC<{ entry : OccupationalHealthcareEntry, diagnoses: Diagnosis[]  }> = ({ entry, diagnoses }) => {
  return (
    <>
      <p>{entry.date} <WorkIcon/> {entry.employerName}<br/>
      <i>{entry.description}</i><br/>
      specialist {entry.specialist}</p>
      <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses}/>
      <SickLeaveDetail entry={entry}/>
    </>
  )
}
  export default OccupationalHealthcareEntryDetail;

  