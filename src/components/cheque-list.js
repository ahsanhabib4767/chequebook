import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import Pagination from "./pagination";

class CheckList extends React.Component {
    constructor(props)
    {
        super(props);
        this.recordPerPage = 10;
        this.allProducts = [];

        this.state = {
            products: [],
            totalPage: 1,
            currentPage: 1,
        }
    }

    componentDidMount()
    {
        this.getProducts();
    }

    getProducts = () => {
        Axios.get('https://fakestoreapi.com/products').then(res =>{
            const products = res.data;
            let totalPage = Math.ceil(products.length/this.recordPerPage);
            this.allProducts = [...products];
            this.setState({
                products: products,
                totalPage: totalPage
            });
        });
     }

     generateProductRows = () => {
        let products = this.state.products;
        products = products.slice((this.state.currentPage-1)*this.recordPerPage, this.state.currentPage*this.recordPerPage);
        return products.map((product, index) => {
            return (<tr key={index}>
                <td>{product.id}</td>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                    <Link to={`profile/${product.id}`}>
                        Edit
                    </Link>
                </td>
            </tr>)
        });
    }

    changePage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    render()
    {
        return (
            <section>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateProductRows()}
                </tbody>
            </table>
                <Pagination key={this.state.totalPage}
                            pageCount={this.state.totalPage}
                            currentPage={this.state.currentPage}
                            changePage={this.changePage}
                />
            </section>
            
        )
    }

}

export default CheckList;