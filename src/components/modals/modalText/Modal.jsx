import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import "bootstrap/dist/css/bootstrap.min.css"
export default function ModalGlobal({ value, children, title, msg, type, body }) {
    const [show, setShow] = useState(value);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {type == "secondary" ?
                <Modal show={value} onHide={handleClose} centered >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {children.map((child, i) => {
                            if (i == 1) return
                            return child
                        })}
                    </Modal.Body>
                    <Modal.Footer centered>

                        {children.map((child, i) => {
                            console.log(children.length)
                            if (i == 0) return
                            return child
                        })}
                    </Modal.Footer>
                </Modal>
                :
                <Modal show={value} onHide={handleClose} centered >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    {msg ?
                        <Modal.Body>
                            {msg}{children.Body}
                        </Modal.Body>
                        : ""
                    }
                    <Modal.Footer>
                        {children}
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}