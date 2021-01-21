import React from 'react';
import { Item } from 'semantic-ui-react';
import { OccupationalHealthcareEntryType } from '../types';

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({
  entry,
}) => {
  return (
    <Item>
      <Item.Content>
        <Item.Description>Employer: {entry.employerName}</Item.Description>
      </Item.Content>
    </Item>
  );
};

export default OccupationalHealthcareEntry;
