import React from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FSButton} from "./FSComponents";

interface Props {
    title: string;
    description: string;
    acceptAction: string;
    showModal: boolean;
    onAccept: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<Props> = ({title, description, acceptAction, showModal, onAccept, onCancel}) => {

    return (
        <div>
            <Modal isOpen={showModal} toggle={onCancel}>
                <ModalHeader toggle={onCancel}>{title}</ModalHeader>
                <ModalBody>
                    {description}
                </ModalBody>
                <ModalFooter>
                    <FSButton color="primary" onClick={async () => {
                        await onAccept();
                        await onCancel();
                    }}>
                        {acceptAction}
                    </FSButton>{' '}
                    <FSButton color="secondary" onClick={onCancel}>Cancel</FSButton>
                </ModalFooter>
            </Modal>
        </div>
    );

};

export default ConfirmationModal;
