import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const type = "Hospital";

const addEntry = (event: SyntheticEvent) => {
  event.preventDefault();
  onSubmit({
    description,
    date,
    specialist,
    type
  });
};

return (
  <div>
    <form onSubmit={addEntry}>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  </div>
);
};

export default AddEntryForm;