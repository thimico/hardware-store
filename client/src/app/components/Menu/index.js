import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import './styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories } from '../../store/actions';
import { Link } from 'react-router-dom';

class Menu extends React.Component {

    state = {
        isOpen: false,
    };

    componentDidMount() {
        this.props.getCategories();
    }

    toggle = () => this.setState({isOpen: !this.state.isOpen});

    render() {
        //console.log(this.props);
        
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/" className="title">Hardware Store</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink href="/" className="btn btn-1 btn-dark text-light">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/products" className="btn btn-2 btn-dark text-light">Produtos</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="btn btn-3 btn-dark text-light">
                                Categorias
                            </DropdownToggle>
                            <DropdownMenu right>
                                {this.renderDropdownItems()}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

    renderDropdownItems() {
        const { categories } = this.props;
        if(!categories) {
            return <div />;
        }

        return categories.map(c => <DropdownItem key={c.id}><Link to={`/categories/${c.id}`}>{c.description}</Link></DropdownItem>);
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        categories: state.productsAPI.categories,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({getCategories}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);