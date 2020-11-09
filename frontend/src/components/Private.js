import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../redux/actions/user'

const Private = ({ children }) => {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (userInfo && userInfo._id) {
      // Will get logged out if expired
			dispatch(getUserDetails('profile'))
		}
	}, [dispatch, userLogin, userInfo])

	return children
}

export default Private
