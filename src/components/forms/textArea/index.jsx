import React from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function TextArea({ value, size, label, ...props }) {
    console.log("SIZE", size)
    return (
        <FloatingLabel controlId="floatingTextarea2" label={label}>
            <Form.Control
                {...props}
                value={value}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: size ? size : "70px" }}
            />
        </FloatingLabel>
    )
}