import React, { useState, useEffect } from 'react';

import EditedArticles from './editedArticles';
import LoaderComponent from './loader';
import axiosInstance from '../axios';


function ListEditedArticles() {
    const loggedInUser = localStorage.getItem('username', null)
	const showUser = loggedInUser ? <h1>Logged in user is: {loggedInUser}</h1> : ''
    const ArticleLoading = LoaderComponent(EditedArticles);
    const [appState, setAppState] = useState({
        loading: false,
        editedArticles: null,
    });

    useEffect(() => {
        setAppState({ loading: true });
        const username = localStorage.getItem('username');
        const apiUrl = `articles-edited?username=${username}`;
        
        axiosInstance.get(apiUrl).then((response) => {
            const articles = response.data
            setAppState({ loading: false, editedArticles: articles })
        }).catch(err => setAppState({ loading: false }))
    }, [setAppState]);


    return (
        <div className="App">
            {showUser}
            <h2>Edited Articles</h2>
            <ArticleLoading
                isLoading={appState.loading}
                editedArticles={appState.editedArticles}
            />
        </div>
    );
}


export default ListEditedArticles;
