import React from 'react';
import Menu from '../../components/Menu';
import SearchBar from '../../components/SearchBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { search } from '../../store/actions';
import ProductList from '../../components/ProductBox/List';

class Home extends React.Component {

    render() {
        //console.log(this.props);

        return (
            <div>
                <Menu />
                <hr />

                <SearchBar onSearch={v => this.props.search(v)} />

                <ProductList products={this.props.products} />
            </div>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        products: state.productsAPI.products,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({search}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);