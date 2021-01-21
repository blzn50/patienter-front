import React from 'react';
import HealthRatingBar from '../components/HealthRatingBar';
import { HealthCheckEntryType } from '../types';

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
  return <HealthRatingBar rating={entry.healthCheckRating} showText={true} />;
};

export default HealthCheckEntry;
