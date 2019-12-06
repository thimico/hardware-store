import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class SearchBar extends React.Component {

    render() {
        return (
            <Form onSubmit={e => e.preventDefault()}>
                <FormGroup>
                    <Label htmlFor="search">Pesquisar</Label>
                    <Input type="text" onChange={e => this.props.onSearch(e.target.value)} name="search" id="search" placeholder="Digite uma palavra..." />
                </FormGroup>
            </Form>
        );
    }
}

export default SearchBar;