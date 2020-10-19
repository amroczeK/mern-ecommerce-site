import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Switch>
						<Route exact path='/' component={HomeScreen} />
						<Route path='/product/:id' component={ProductScreen} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
