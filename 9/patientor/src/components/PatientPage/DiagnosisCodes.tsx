import { Diagnosis } from '../../types';

interface CodeProps {
    codes: String[] | undefined
    diagnoses: Diagnosis[]
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

  export default DiagnosisCodes;