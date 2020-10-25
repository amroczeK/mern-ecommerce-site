import React from 'react'
import Toast from 'react-bootstrap/Toast'

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
					<strong className='mr-auto'>{title}</strong>
				</Toast.Header>
				<Toast.Body>{body}</Toast.Body>
			</Toast>
		</>
	)
}

export default ToastPopup
