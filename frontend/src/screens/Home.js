import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { listProducts } from '../redux/actions/products'

const Home = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products &&
						products.length &&
						products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4}>
								<Product product={product} />
							</Col>
						))}
				</Row>
			)}
		</>
	)
}

export default Home
