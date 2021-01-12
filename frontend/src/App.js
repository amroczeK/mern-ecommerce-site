import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import UserListScreen from './screens/UserListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/order/:id' component={Order} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/payment' component={Payment} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='/product/:id' component={Product} />
            <Route path='/cart' component={Cart} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route exact path='/' component={Home} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
