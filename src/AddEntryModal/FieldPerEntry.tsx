import React from 'react';
import { Field, useFormikContext } from 'formik';
import { SelectHealthRating, RatingOption, TextField } from '../AddPatientModal/FormField';
import { HealthCheckRating } from '../types';

const healthRatingOptions: RatingOption[] = [
  { label: 'Healthy', value: HealthCheckRating.Healthy },
  { label: 'Low Risk', value: HealthCheckRating.LowRisk },
  { label: 'High Risk', value: HealthCheckRating.HighRisk },
  { label: 'Critical Risk', value: HealthCheckRating.CriticalRisk },
];

const FieldPerEntry: React.FC = () => {
  const {
    values: { type },
  } = useFormikContext();

  switch (type) {
    case 'HealthCheck':
      return (
        <SelectHealthRating
          label="Health Rating"
          name="healthCheckRating"
          options={healthRatingOptions}
        />
      );
    case 'Hospital':
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Starts"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave Ends"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};

export default FieldPerEntry;
