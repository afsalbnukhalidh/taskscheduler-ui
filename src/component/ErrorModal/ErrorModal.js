// src/components/ErrorModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ErrorModal = ({ show, onClose, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="text-danger">
            <strong>Error:</strong> {message}
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
