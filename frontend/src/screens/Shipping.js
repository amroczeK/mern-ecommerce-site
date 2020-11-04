import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../redux/actions/cart'

const Shipping = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [secAddress, setSecAddress] = useState(shippingAddress.secAddress)
	const [city, setCity] = useState(shippingAddress.city)
	const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault() // Prevent browser reload/refresh
		dispatch(
			saveShippingAddress({ address, secAddress, city, zipCode, country })
		)
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='123 Main St'
						value={address || ''}
						required
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='secAddress'>
					<Form.Label>Address 2</Form.Label>
					<Form.Control
						type='text'
						placeholder='Apartment, studio, or floor'
						value={secAddress || ''}
						onChange={(e) => setSecAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Vancouver'
						value={city || ''}
						required
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='zip'>
					<Form.Label>Zip</Form.Label>
					<Form.Control
						type='text'
						placeholder='V5H 3Z7'
						value={zipCode || ''}
						required
						onChange={(e) => setZipCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Canada'
						value={country || ''}
						required
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default Shipping
