import HeartIcon from '@mui/icons-material/Favorite';
import { HealthCheckEntry } from "../../types";

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
  export default HeartIcons;