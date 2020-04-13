import React,{Component}from 'react';
import {connect} from 'react-redux'; 
import Helpers from './../libs/Helpers'; 
import Validate from './../libs/Validate'; 
import * as types from './../constants/ActionType';
import * as config from './../constants/Config';
import {actBuyProduct,actChangeNotify} from './../actions/index'; 
class ProductItem extends Component {
  constructor(props){
    super(props); 
    this.state={
      value:1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleBuy(product,quantity){
    quantity = +this.state.value; 
    if(Validate.checkQuantity(quantity)===false){
     this.props.changeNotify(config.NOTI_GREATER_THAN_ONE);
    } else {
      this.props.handleBuy(product,quantity);
      this.props.changeNotify(config.NOTI_ACT_ADD);
      this.setState({
      value:1
    })}    
  }
  render(){
   let {product} = this.props;
   let quantity = this.state.value;
    return (
  
	<div className="media product">
              <div className="media-left">
                <a href="#">
                  <img className="media-object" src={`images/${product.image}`} alt= "{product.name}" />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{product.name}</h4>
                <p>{product.summary}</p>
                 {this.showBuy(product)}
              </div>
            </div>

)}
showBuy(product){
  let xhml = null; 
  let price = Helpers.toCurrency(product.price,"USD","right")
   let quantity = this.state.value; 
  if(product.canBuy===true){
    xhml = <p>
            <input name="value" value={this.state.value} onChange={this.handleChange} type="number" min={1} />
                <a onClick={()=>this.handleBuy(product,quantity)} href="#" className="price"> {price} </a>
            </p>
  } else{
      xhml = <span className="price"> {price} </span>
  }
  return xhml
}}
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
   handleBuy: (product,quantity) => {
     dispatch(actBuyProduct(product,quantity))
   },
    changeNotify: (content) =>{
      dispatch(actChangeNotify(content))
    }}}
export default connect(null,mapDispatchToProps)(ProductItem);
 