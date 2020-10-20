import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import { Row, Col } from 'react-bootstrap'
//import Message from '../components/Message'

const ToastPopup = ({ style, showToast, handleClose, title, body }) => {
	return (
		<>
			<Toast
				style={style}
				onClose={handleClose}
				show={showToast}
				delay={3000}
				autohide
			>
				<Toast.Header>
					<img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
					<strong className='mr-auto'>{title}</strong>
				</Toast.Header>
				<Toast.Body>{body}</Toast.Body>
			</Toast>
		</>
	)
}

export default ToastPopup
