import React from 'react';
import Menu from '../../components/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategory } from '../../store/actions';
import ProductList from '../../components/ProductBox/List';

class Categories extends React.Component {
    
    state = {
        currentId: undefined,
    };

    componentDidMount() {
        const { params } = this.props.match;

        this.setState({currentId: params.id});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { params } = nextProps.match;

        if(params.id !== this.state.currentId) {

            this.props.getCategory(params.id);

            this.setState({currentId: params.id});

        }
    }

    render() {
        const { category } = this.props;

        return (
            <div>
                <Menu />
                <hr />
                {this.hasCategory() ? <h1>{category.description}</h1> : ''}

                {this.hasCategory() ? <span>{category.products.length} itens</span> : ''}
                <ProductList products={category.products} />
            </div>
        );
    }

    hasCategory() {
        const { category } = this.props;

        return !!category;
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        category: state.productsAPI.category,
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({getCategory}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);