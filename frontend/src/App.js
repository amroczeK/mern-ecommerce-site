import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import Product from './screens/Product'
import Cart from './screens/Cart'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/product/:id' component={Product} />
						<Route path='/cart' component={Cart} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
