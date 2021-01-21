import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { NewEntry, EntryType, HealthCheckRating } from '../types';
import {
  TextField,
  DiagnosisSelection,
  EntryOption,
  SelectEntry,
} from '../AddPatientModal/FormField';
import FieldPerEntry from './FieldPerEntry';
import { useStateValue } from '../state';

interface FormProps {
  onSubmit: (values: NewEntry) => void;
  modalClose: () => void;
}

const entryOptions: EntryOption[] = [
  { label: 'HealthCheck', value: EntryType.HealthCheck },
  { label: 'OccupationalHealthcare', value: EntryType.OccupationalHealthcare },
  { label: 'Hospital', value: EntryType.Hospital },
];

const AddEntryForm: React.FC<FormProps> = ({ onSubmit, modalClose }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        description: '',
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        discharge: {
          date: '',
          criteria: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const dateError = 'Please use format: YYYY-MM-DD';
        const errors: { [field: string]: string } = {};

        const isValidDate = (date: string): boolean => {
          return /^\d{4}-\d{2}-\d{2}$/.test(date);
        };

        if (!values.date) {
          errors.date = requiredError;
        }

        if (values.date && !isValidDate(values.date)) {
          errors.date = dateError;
        }

        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }

          if (values.sickLeave?.startDate && !isValidDate(values.sickLeave?.startDate)) {
            errors.sickLeave = Object.assign({}, errors.sickLeave, { startDate: dateError });
          }

          if (values.sickLeave?.endDate && !isValidDate(values.sickLeave?.endDate)) {
            errors.sickLeave = Object.assign({}, errors.sickLeave, { endDate: dateError });
          }
        }

        if (values.type === 'Hospital') {
          if (!values.discharge.date) {
            errors.discharge = Object.assign({}, errors.discharge, { date: requiredError });
          }

          if (values.discharge.date && !isValidDate(values.discharge.date)) {
            errors.discharge = Object.assign({}, errors.discharge, { date: dateError });
          }

          if (!values.discharge.criteria) {
            errors.discharge = Object.assign({}, errors.discharge, { criteria: requiredError });
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <SelectEntry label="Type" name="type" options={entryOptions} />
            <FieldPerEntry />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button onClick={modalClose} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" color="green" floated="right" disabled={!dirty || !isValid}>
                  Submit
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
