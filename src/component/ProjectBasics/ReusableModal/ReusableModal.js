import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const ReusableModal = ({ show, onClose, title, children, footer }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        {footer ? (
          footer
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModal;
