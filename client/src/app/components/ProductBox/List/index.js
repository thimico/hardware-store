import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {

    render() {
        if(!this.hasProducts()) {
            return <div />
        }

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Preço R$</th>
                            <th>Quantidade</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
            </div>
        );
    }

    hasProducts() {
        const { products } = this.props;

        return (products && Array.isArray(products) && products.length > 0);
    }

    renderRows() {
        const { products } = this.props;

        return products.map(p => {
            return (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>
                        <Link to={`/products/${p.id}`}>ver mais</Link>
                    </td>
                </tr>
            );
        });
    }
}

export default ProductList;