import React from 'react';
import { Container } from 'reactstrap';
import Routes from './routes';

class App extends React.Component {

    render() {
        return (
            <Container><Routes /></Container>
        );
    }
}

export default App;