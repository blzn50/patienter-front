import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewEntry } from '../types';
import AddEntryForm from './AddEntryForm';

interface ModalProps {
  modalOpen: boolean;
  modalClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal: React.FC<ModalProps> = ({ modalOpen, onSubmit, modalClose, error }) => (
  <Modal open={modalOpen} onClose={modalClose}>
    <Modal.Header>Add Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} modalClose={modalClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
