import React,{Component}from 'react';
import {connect} from 'react-redux';
import Helpers from './../libs/Helpers';
import * as configs from './../constants/Config';
import Validate from './../libs/Validate';
import {actRemoveProduct,actChangeNotify,actUpdateProduct} from './../actions/index'; 
class CartItem extends Component {
  constructor(props){
    super(props);    
    this.state={
      value:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  onDelete(id){
    this.props.onDelete(id);
    this.props.changeNotify(configs.NOTI_ACT_DELETE);
  }
  handleEdit(product,quantity){
    if(Validate.checkQuantity(quantity)===false){
      this.props.changeNotify(configs.NOTI_GREATER_THAN_ONE)
    } else {
    this.props.handleEdit(product,+quantity);
    this.props.changeNotify(configs.NOTI_ACT_UPDATE);
    }
  }
  render(){
   let {item,index} = this.props; 
   let {product} = item; 
   let quantity =(this.state.value !==0)?this.state.value : item.quantity;
    return (
  <tr>
                  <th scope="row">{index+1}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td><input name="value" value={quantity} onChange={this.handleChange} type="number" min={1}/></td>
                  <td><strong>{this.showSubTotal(product.price,quantity)}</strong></td>
                  <td>
                    <a onClick={()=>this.handleEdit(product,quantity)} className="label label-info update-cart-item" href="#" data-product>Update</a>
                    <a onClick={()=>this.onDelete(product.id)} className="label label-danger delete-cart-item" href="#" data-product>Delete</a>
                  </td>
  </tr>
)

}
showSubTotal(price,quantity){
  return Helpers.toCurrency(price*quantity,"USD","right")
}
}
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
   onDelete: (id) => {
     dispatch(actRemoveProduct(id))
   },
    changeNotify: (content) =>{
      dispatch(actChangeNotify(content))
    },
    handleEdit: (product,quantity) => {
      dispatch(actUpdateProduct(product,quantity))
    }
  }
}

export default connect(null,mapDispatchToProps)(CartItem);

