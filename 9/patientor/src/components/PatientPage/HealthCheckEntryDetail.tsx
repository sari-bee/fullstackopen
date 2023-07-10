import DiagnosisCodes from './DiagnosisCodes';
import { Diagnosis, HealthCheckEntry } from "../../types";
import HeartIcon from '@mui/icons-material/Favorite';
import HealthcheckIcon from '@mui/icons-material/Vaccines';

const HeartIcons: React.FC<{ entry : HealthCheckEntry }> = ({ entry }) => {
  switch(entry.healthCheckRating) {
    case 0:
      return (<HeartIcon color="success"/>);
    case 1:
      return (<HeartIcon color="primary"/>);
    case 2:
      return (<HeartIcon color="warning"/>);
    case 3:
      return (<HeartIcon color="error"/>);
    default:
      return null;
  }
}

const HealthCheckEntryDetail: React.FC<{ entry : HealthCheckEntry, diagnoses: Diagnosis[]  }> = ({ entry, diagnoses }) => {
  return (
    <>
      <p>{entry.date} <HealthcheckIcon/><br/>
      <i>{entry.description}</i><br/>
      <HeartIcons entry={entry}/>
      <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses}/><br/>
      specialist {entry.specialist}</p>
    </>
  )
}

export default HealthCheckEntryDetail;