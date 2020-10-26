import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../redux/actions/user'

const Header = () => {
	const dispatch = useDispatch()

	const cartItems = useSelector((state) => state.cart.cartItems)
	const cartSize = cartItems.reduce((acc, item) => acc + item.qty, 0)
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Shop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i
										className='fas fa-shopping-cart'
										style={{ padding: '0px 5px 0px 5px' }}
									/>
									Cart ({cartSize})
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i
											className='fas fa-user'
											style={{ padding: '0px 5px 0px 5px' }}
										/>
										Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
