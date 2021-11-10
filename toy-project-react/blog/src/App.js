import React, { useEffect, useState } from 'react';

import './App.css';
import axiosInstance from './axios';
import LoaderComponent from './components/loader';
import WritersTable from './components/dashboard';


export default function App() {
  const TableLoading = LoaderComponent(WritersTable);
  const [appState, setAppState] = useState({
		loading: true,
		rows: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const rows = res.data;
			setAppState({ loading: false, rows: rows });
			console.log(res.data);
		});
  }, [setAppState]);
  
  return (
    <div className="App">
        <TableLoading
            isLoading={appState.loading}
            rows={appState.rows}
        />
    </div>
  );
}
