import axios from "axios";
import React, { Component } from "react";
import  { Navigate } from 'react-router-dom'
import { Col, Form, FormGroup, Label, Input, Card, Button, FormText, FormFeedback } from "reactstrap";
import { AUTH_API_URL } from "../../constants";

class Register extends Component {
    constructor(props) {
        super(props);

        this.registerUser = this.registerUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            form_data: {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
                password2: ''
            },
            errors: {}
        };
    }

    registerUser = (e) => {
        e.preventDefault();

        axios.post(`${AUTH_API_URL}register`, this.state.form_data)
            .then(() => this.setState({ success:true, errors: {} }))
            .catch(err => this.setState({ errors: err.response.data }))

    }

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState((prevState) => ({
            form_data: {
                ...prevState.form_data,
                [id]: value
            }
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Card body>
                    <h1 className="card-title mb-4">Register</h1>
                    <Form className="row" onSubmit={this.registerUser}>
                        <FormGroup className="col-6">
                            <Label for="first_name">First Name</Label>
                            <Input type="text" name="first_name" id="first_name" value={this.state.form_data.first_name} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.first_name} 
                                    invalid={!!this.state.errors.first_name} placeholder="Jane" />
                            {
                                !!this.state.errors.first_name &&
                                <FormFeedback valid={false}>{this.state.errors.first_name.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="last_name">Last Name</Label>
                            <Input type="text" name="last_name" id="last_name" value={this.state.form_data.last_name} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.last_name} 
                                    invalid={!!this.state.errors.last_name} placeholder="Doe" />
                            {
                                !!this.state.errors.last_name &&
                                <FormFeedback valid={false}>{this.state.errors.last_name.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={this.state.form_data.username} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.username} 
                                    invalid={!!this.state.errors.username} placeholder="JaneDoe" />
                            {
                                !!this.state.errors.username &&
                                <FormFeedback valid={false}>{this.state.errors.username.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={this.state.form_data.email} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.email} 
                                    invalid={!!this.state.errors.email} placeholder="janedoe@example.com" />
                            {
                                !!this.state.errors.email &&
                                <FormFeedback valid={false}>{this.state.errors.email.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={this.state.form_data.password} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.password} 
                                    invalid={!!this.state.errors.password} placeholder="Enter password..." />
                            {
                                !!this.state.errors.password &&
                                <FormFeedback valid={false}>{this.state.errors.password.join('<br/>')}</FormFeedback>
                            }
                            <FormText>Passwords must be 8 characters long</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password2">Confirm Password</Label>
                            <Input type="password" name="password2" id="password2" value={this.state.form_data.password2} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.password2} 
                                    invalid={!!this.state.errors.password2} placeholder="Confirm password..." />
                            {
                                !!this.state.errors.password2 &&
                                <FormFeedback valid={false}>{this.state.errors.password2.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>

                        <FormGroup row>
                            <Col>
                                <Button>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Card>
                { this.state.success && <Navigate to="/login" state={{new_account: true, username: this.state.form_data.username}}/> }
                { this.props.is_logged_in  && <Navigate to="/"/> }
            </React.Fragment>
        );
    }
}

export default Register;