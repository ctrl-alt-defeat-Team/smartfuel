import React, { useState } from 'react';
import '../styles/Modal.css'; // Import CSS for modal styling

function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            {/* Modal */}
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>This is the content of the modal.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
