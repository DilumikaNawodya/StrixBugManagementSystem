import React from 'react';
import { useFormik } from 'formik';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';

function IssueForm(props) {

    const warningstyle = { color: 'red' }

    const validate = values => {

        const errors = {}
        if (!values.priority) {
            errors.priority = 'Required'
        }
        if (!values.title) {
            errors.title = 'Required'
        }
        if (!values.summary) {
            errors.summary = 'Required'
        }

        return errors;

    }

    const formik = useFormik({
        initialValues: {
            priority: '',
            type: '',
            title: '',
            summary: '',
        },
        validate,
        onSubmit: values => {
            props.setbuglist([...props.buglist, { priority: values.priority, type: values.type, summary: values.summary, title: values.title, id: Math.floor(Math.random() * 1000) }]);
            props.cl();
        }
    })

    const prioritylist = ['low', 'medium', 'high','critical'];
    const typelist = ['Bug', 'IT Supprot', 'etc..'];

    return (
        <div>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group >
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" name="priority" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.priority}>{/*set error handler*/}
                        {prioritylist.map((priority) => <option value={priority} label={priority} />)}

                    </Form.Control>
                    {formik.errors.project && formik.touched.project ? <Form.Text style={warningstyle}>{formik.errors.project}</Form.Text> : null}
                </Form.Group>

                <Form.Group >
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name="type" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.type}>{/*set error handler*/}
                        {typelist.map((type) => <option value={type} label={type} />)}

                    </Form.Control>
                    {formik.errors.project && formik.touched.project ? <Form.Text style={warningstyle}>{formik.errors.project}</Form.Text> : null}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.title}></Form.Control>
                    {formik.errors.title && formik.touched.title ? <Form.Text style={warningstyle}>{formik.errors.title}</Form.Text> : null}
                </Form.Group>

                {/* summary of the bug */}
                <Form.Group>
                    <Form.Label>Summary</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="summary of the bug" name="summary" onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.summary}></Form.Control>
                    {formik.errors.summary && formik.touched.summary ? <Form.Text style={warningstyle}>{formik.errors.summary}</Form.Text> : null}
                </Form.Group>
                {/* Resulting output */}
                {/* <Form.Group>
                            <Form.Label>Outputted Result</Form.Label>
                            <Form.Control type="text" name="result" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                value={formik.values.result}></Form.Control>
                            {formik.errors.result && formik.touched.result ? <Form.Text style={warningstyle}>{formik.errors.result}</Form.Text> : null}
                        </Form.Group> */}
                {/* Expected output */}
                {/* <Form.Group>
                            <Form.Label>Expected Result</Form.Label>
                            <Form.Control type="text" name="expected" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                value={formik.values.expected}></Form.Control>
                            {formik.errors.expected && formik.touched.expected ? <Form.Text style={warningstyle}>{formik.errors.expected}</Form.Text> : null}
                        </Form.Group> */}
                {/* File upload */}
                <Form.Group>
                    <Form.Label>Attachments</Form.Label>
                    <Form.File name="attachments" ></Form.File>
                </Form.Group>

                <Button type='submit' style={{ marginRight: '20px' }} >Add issue</Button>
                <Button type='button' onClick={props.cl} >Close</Button>
            </Form>
        </div>
    )
}
export default IssueForm;