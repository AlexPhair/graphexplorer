import axios from "axios";
import React, { Component } from "react";
import  { Navigate } from 'react-router-dom'
import { Col, Form, FormGroup, Label, Input, Card, Button, FormFeedback, Alert } from "reactstrap";
import { AUTH_API_URL } from "../../constants";

class Login extends Component {
    constructor(props) {
        super(props);

        this.getAuthToken = this.getAuthToken.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            new_account: false,
            username: '',
            password: '',
            errors: {},
            token: ''
        };
    }

    getAuthToken = (e) => {
        e.preventDefault();

        const payload = { username: this.state.username, password: this.state.password };
        axios.post(`${AUTH_API_URL}token`, payload)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                this.setState({ token: res.data.token, errors: {} });
            })
            .catch(err => this.setState({ errors: err.response.data }))
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }

    render() {
        return (
            <React.Fragment>
                { 
                    this.state.new_account && 
                    <Alert color="success">
                        <h3 className="alert-heading">Success!</h3>
                        <p>Account successfully created. Please log in by using the form below.</p>
                    </Alert>
                }
                <Card body>
                    <h1 className="card-title mb-4">Login</h1>
                    <Form className="row" onSubmit={this.getAuthToken}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={this.state.username} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.username} 
                                    invalid={!!this.state.errors.username} placeholder="JaneDoe" />
                            {
                                !!this.state.errors.username &&
                                <FormFeedback valid={false}>{this.state.errors.username.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={this.state.password} 
                                    onChange={this.handleChange} valid={this.state.errors.length > 0 && !this.state.errors.password} 
                                    invalid={!!this.state.errors.password} placeholder="Enter password..." />
                            {
                                !!this.state.errors.password &&
                                <FormFeedback valid={false}>{this.state.errors.password.join('<br/>')}</FormFeedback>
                            }
                        </FormGroup>

                        <FormGroup row>
                            <Col>
                                <Button>Submit</Button>
                            </Col>
                        </FormGroup>

                        { this.state.errors && this.state.errors.non_field_errors && 
                            <p className="text-danger">{this.state.errors.non_field_errors.join('<br/>')}</p>}
                    </Form>
                </Card>
                
                { this.state.token !== '' && <Navigate to="/"/> }
                { this.props.is_logged_in  && <Navigate to="/"/> }
            </React.Fragment>
        );
    }
}

export default Login;