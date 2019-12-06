import React from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Alert } from 'reactstrap';
import Menu from '../../Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct, deleteProduct } from '../../../store/actions';
import ProductForm from '../../../components/ProductBox/Form';

class ProductDetails extends React.Component {

    state = {
        onEdit: false,
        alert: ''
    };

    componentDidMount() {
        const { params } = this.props.match;

        this.props.getProduct(params.id);
    }

    render() {
        // console.log(this.props);
        const { product } = this.props;
        
        if(!product) {
            return <div />;
        }

        return (
            <div>
                <Menu />
                <br />
                {this.renderAlert()}
                <h1>Detalhes do Produto #{product.id}</h1>
                <Card>
                    <CardHeader>{product.name}</CardHeader>
                    <CardBody>
                        <CardTitle>R$ {product.price},00</CardTitle>
                        <CardText>Qtd.: {product.quantity}</CardText>
                        <CardText>Adicionado no dia: {this.dateFormat(product.created_at)}</CardText>
                        <CardText>Ultima atualização no dia: {this.dateFormat(product.updated_at)}</CardText>

                        <Button color="info" onClick={() => this.setState({onEdit: true})}>Editar</Button>
                        <Button color="danger" onClick={() => this.onDelete()} className="float-right">Excluir</Button>
                    </CardBody>
                    <CardFooter className={`text-${product.status === 0 ? 'danger' : 'success'}`}>
                        Produto {product.status === 0 ? 'Indisponível' : 'Disponível'}
                    </CardFooter>
                </Card>
                <hr />

                {this.renderForm()}
                <br /><br /><br />
            </div>
        );
    }

    renderForm() {
        const { product } = this.props;

        if(!product  || !this.state.onEdit) {
            return <div />;
        }

        return (
            <div>
                <h3>Editar produto</h3>
                <ProductForm editModel={product} updateCallback={success => {
                    if(success) {
                        this.setState({onEdit: false, alert: 'Atualizando Produto...'});
                    }
                }} />
            </div>
        )
    }

    onDelete = () => {
        const { params } = this.props.match;

        this.props.deleteProduct(params.id, (success) => {
            if(success) {
                this.props.history.push('/products');
            }
        });
    }

    renderAlert(sec = 3) {
        const { alert } = this.state;

        if(alert === '') {
            return <div />;
        }

        setTimeout(() => {

            const { params } = this.props.match;

            this.props.getProduct(params.id);

            this.setState({alert: ''});
        }, sec * 1000);

        return <Alert color="info">{alert}</Alert>
    }

    dateFormat(date) {
        const format = new Date(date);

        return `${format.toLocaleDateString()} ${format.toLocaleTimeString()}`;
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        product: state.productsAPI.product,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({getProduct, deleteProduct}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);