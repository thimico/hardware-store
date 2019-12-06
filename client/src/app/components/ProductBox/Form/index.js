import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories, save } from '../../../store/actions';

const Model = {
    id: 0,
    name: '',
    price: 0.0,
    quantity: 0,
    category_id: 0,
};

class ProductForm extends React.Component {

    state = {
        model: Model,
        alert: ''
    };

    componentDidMount() {
        const { editModel } = this.props;

        if(editModel) {
            this.setState({model: editModel});
        }
    }

    submit = () => {
        console.log('form values: ', this.state.model);

        const data = this.parseValues();
        
        if(this.isValid()) {

            if(data.id !== 0) {
                this.onUpdate(data);
            } else {
                this.onCreate(data);
            }

            this.reset();
        } else {
            console.warn('Valores inválidos...');

            this.setState({alert: 'Valores inválidos! Verifique os campos.'})
        }

    }

    onCreate = (data) => {
        const { createCallback } = this.props;

        this.props.save(data, success => createCallback(success));
    }

    onUpdate = (data) => {
        const { updateCallback } = this.props;

        this.props.save(data, (success) => {
            updateCallback(success);
        });
    
    }

    parseValues = () => {
        const { model } = this.state;

        return {
            id: parseInt(model.id),
            name: model.name,
            price: parseFloat(model.price),
            quantity: parseInt(model.quantity),
            category_id: parseInt(model.category_id),
        };
    }

    isValid = () => {
        const { model } = this.state;

        return model.name !== '' && 
            !Number.isNaN(parseFloat(model.price)) &&
            Number.isInteger(parseInt(model.quantity)) &&
            parseInt(model.category_id) !== 0; 
    };

    setValues = (e, field) => {
        let model = { ...this.state.model };
        model[field] = e.target.value;
        this.setState({model});
    }

    reset = () => this.setState({model: Model});

    render() {
        const { model } = this.state;

        return (
            <Form onSubmit={e => e.preventDefault()}>
                {this.renderAlert()}
                <FormGroup>
                    <Label htmlFor="name">Nome</Label>
                    <Input type="text" value={model.name} onChange={e => this.setValues(e, 'name')} name="name" id="name" placeholder="Informe o nome do produto" />
                </FormGroup>
                <div className="form-row">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="price">Preço</Label>
                            <Input type="text" value={model.price} onChange={e => this.setValues(e, 'price')} name="price" id="price" placeholder="R$ 00,00" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="quantity">Quantidade</Label>
                            <Input type="number" value={model.quantity} onChange={e => this.setValues(e, 'quantity')} min={0} name="quantity" id="quantity" placeholder="Qtd. disponível" />
                        </FormGroup>
                    </div>
                </div>
                <FormGroup>
                    <Label htmlFor="category_id">Categorias</Label>
                    <Input type="select" value={model.category_id} onChange={e => this.setValues(e, 'category_id')} name="category_id" id="category_id">
                        <option value={0}>Selecione</option>
                        {this.renderSelectCategories()}
                    </Input>
                </FormGroup>
                <Button onClick={() => this.submit()} color="primary">Submit</Button>
            </Form>
        );
    }

    renderSelectCategories() {
        const { categories } = this.props;

        if(!categories) {
            return <div />;
        }

        return categories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)
    }

    renderAlert(sec = 3) {
        const { alert } = this.state;

        if(alert === '') {
            return <div />;
        }

        setTimeout(() => {
            this.setState({alert: ''});
        }, sec * 1000);

        return (<Alert color="danger">{alert}</Alert>);
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        categories: state.productsAPI.categories,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({getCategories, save}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);