import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../axios';


export default function SignUp() {
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('logout/blacklist', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('username');
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
	});
	return <div>Logout</div>;
}