import React from 'react';
import { Item } from 'semantic-ui-react';
import { HospitalEntryType } from '../types';

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  return (
    <Item>
      <Item.Description>Discharge Date: {entry.discharge.date}</Item.Description>
      <Item.Description>Discharge Criteria: {entry.discharge.criteria}</Item.Description>
    </Item>
  );
};

export default HospitalEntry;
