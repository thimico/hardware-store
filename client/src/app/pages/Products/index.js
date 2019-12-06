import React from 'react';
import Menu from '../../components/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { paginateProducts } from '../../store/actions';
import ProductList from '../../components/ProductBox/List';
import { Button } from 'reactstrap';
import ProductForm from '../../components/ProductBox/Form';
import { Alert } from 'reactstrap';

const LIMIT_ITEMS = 5;

class Products extends React.Component {

    state = {
        currentPage: 1,
        alert: ''
    };

    componentDidMount() {
        this.props.paginateProducts(this.state.currentPage, LIMIT_ITEMS);
    }

    render() {
        return (
            <div>
                <Menu />
                <hr />
                {this.renderAlert()}
                <h3 style={{fontWeight:'bolder'}}>Adicionar novo produto</h3>
                <ProductForm createCallback={success => {
                    if(success) {
                        this.setState({alert: 'Produto adicionado com sucesso!'});
                        this.props.paginateProducts(this.state.currentPage, LIMIT_ITEMS);
                    }
                }}/>
                <hr />
                <h3 style={{fontWeight:'bolder'}}>{this.getTotal()} Produtos adicionados</h3>
                {this.renderButtons()}
                <ProductList products={this.props.pagination.elements} />
            </div>
        ); 
    }

    getTotal() {
        const { pagination, app } = this.props;
    
        if(!pagination.metadata || app.loading) {
            return 'Carregando ';
        }

        return pagination.metadata.total;
    }

    renderAlert() {
        const { alert } = this.state;

        if(alert === '') {
            return <div />;
        }

        setTimeout(() => {
            this.setState({alert: ''});
        }, 3000);

        return <Alert color="success">{alert}</Alert>
    }

    renderButtons = () => {
        const { pagination } = this.props;
    
        if(!pagination.metadata) {
            return <div />
        }

        return (
            <div>
                <Button onClick={() => this.back()} disabled={this.state.currentPage === 1} color="btn btn-link">Voltar</Button>
                <Button onClick={() => this.next()} disabled={this.state.currentPage === pagination.metadata.pages} color="btn btn-link float-right">Próximo</Button>
            </div>
        );
    }

    next = () => {
        const { pages } = this.props.pagination.metadata;

        if(this.state.currentPage < pages) {
            const add = this.state.currentPage + 1;

            this.setState({currentPage: add});

            this.props.paginateProducts(add, LIMIT_ITEMS);
        }
    }

    back = () => {
        if(this.state.currentPage > 1) {
            const sub = this.state.currentPage - 1

            this.setState({currentPage: sub});

            this.props.paginateProducts(sub, LIMIT_ITEMS);
        }
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        pagination: state.productsAPI.pagination,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({paginateProducts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);