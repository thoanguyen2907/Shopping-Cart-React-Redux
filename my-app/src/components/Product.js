import React,{Component}from 'react';
import {connect} from 'react-redux'; 
import ProductItem from './ProductItem';
import products from './../reducers/products'; 
import * as config from './../constants/Config';
class Product extends Component {
  render(){
let {products} = this.props; 
    return (
<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-primary"> 
          <div className="panel-heading"><h1 className="panel-title">List Products</h1></div> 
          <div className="panel-body" id="list-product">
            {/* PRODUCT : START */}
           {this.showProduct(products)}
          </div>
        </div>
      </div>
)}
showProduct(products){
let xhml = config.NOTI_EMPTY_PRODUCT; 
  if(products !==null && products.length>0){
  xhml=  products.map((product,index)=>{
      return <ProductItem key={index} product={product} index={index} />
    })
  }
  return xhml
}
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps,null)(Product);



