import React,{Component}from 'react';
import Title from './Title';
import Product from './Product';
import Cart from './Cart';
class App extends Component {
  render(){
    return (
   <div className="row">
        <Title />

        <Product />
        <Cart />
  </div>

)

}
}

export default App;
