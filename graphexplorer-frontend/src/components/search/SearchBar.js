import { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

class SearchBar extends Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            query: ''
        };
    }

    handleSubmit = (e) => {
        if (this.state.query.trim() === '') {
            e.preventDefault();
        }
    }

    render() {
        return (
            <Form action="/search" method="get" onSubmit={this.handleSubmit} className="row g-3">
                <FormGroup className="col">
                    <Input type="text" name="query" placeholder="Search for Wikidata Entities..." value={this.state.query}  onChange={e => this.setState({ query: e.target.value })}/>
                </FormGroup>
                <FormGroup className="col-auto">
                    <Button type="primary" disabled={this.state.query.trim() === ''}>Search</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default SearchBar
