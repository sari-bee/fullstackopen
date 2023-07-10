import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const GenderIcon = (gender: string) => {
  switch(gender) {
    case "female":
      return (<FemaleIcon/>);
    case "male":
      return (<MaleIcon/>);
    case "other":
      return (<TransgenderIcon/>);
    default:
      return null;
  }
}

  export default GenderIcon;