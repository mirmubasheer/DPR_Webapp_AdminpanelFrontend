import React from 'react';
import { Modal, Button } from '@material-ui/core';

interface AddMessageModalProps {
    open: boolean;
    onClose: () => void;
}

const AddMessageModal: React.FC<AddMessageModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
                <h2>Add a New Message</h2>
                <textarea rows={4} cols={50} placeholder="Type your message here..." />
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddMessageModal;