import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Message, Item, Icon, Divider, Button } from 'semantic-ui-react';

import { Patient, NewEntry, Entry } from '../types';
import { useStateValue, getPatientDetail, addEntry } from '../state';
import { apiBaseUrl } from '../constants';
import EntryContainer from './Entry';
import AddEntryModal from '../AddEntryModal';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const patient = patients[id];

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const entryFormSubmit = async (values: NewEntry) => {
    try {
      const { data: entryFromApi } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, entryFromApi));
      closeModal();
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  React.useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(getPatientDetail(patientFromApi));
        setError(undefined);
      } catch (error) {
        console.log(error);
      }
    };
    if (!patients[id]?.ssn) {
      fetchPatientDetail();
    }
  }, [dispatch, id, patients]);

  if (!patient) return null;

  return (
    <div>
      {error && <Message negative>{error}</Message>}
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {patient.name}{' '}
            <Icon
              name={
                patient.gender === 'male'
                  ? 'man'
                  : patient.gender === 'female'
                  ? 'woman'
                  : 'other gender'
              }
            ></Icon>
          </Card.Header>
          <Card.Meta>{patient.dateOfBirth}</Card.Meta>
          <Card.Description>SSN: {patient.ssn}</Card.Description>
          <Card.Description>Occupation: {patient.occupation}</Card.Description>
          <Card.Description>
            <h4>Entries: </h4>
            {patient.entries?.map((e) => (
              <Card fluid key={e.id}>
                <Card.Content>
                  <Item.Group divided key={e.id}>
                    <Item>
                      <Item.Content>
                        <Item.Header>
                          <span>{e.date}</span> <Icon name="doctor" />
                        </Item.Header>
                        <Item.Description>
                          <em>{e.description}</em>
                        </Item.Description>
                        <ul>
                          {e.diagnosisCodes?.map((d) => (
                            <li key={d}>
                              {d} - <span>{diagnoses[d]?.name}</span>
                            </li>
                          ))}
                        </ul>
                        <EntryContainer entry={e} />
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card.Content>
              </Card>
            ))}
          </Card.Description>
        </Card.Content>
      </Card>
      <Divider />
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={entryFormSubmit}
        modalClose={closeModal}
      />
      <Button onClick={openModal}>Add Entry</Button>
    </div>
  );
};

export default PatientDetail;
