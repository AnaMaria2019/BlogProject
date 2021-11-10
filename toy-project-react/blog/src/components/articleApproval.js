import React, { useState, useEffect } from 'react';

import Articles from './articles';
import LoaderComponent from './loader';
import axiosInstance from '../axios';


function ArticleApproval() {
    const loggedInUser = localStorage.getItem('username', null)
	const showUser = loggedInUser ? <h1>Logged in user is: {loggedInUser}</h1> : ''
    const ArticleLoading = LoaderComponent(Articles);
    const [appState, setAppState] = useState({
        loading: false,
        articles: null,
    });

    useEffect(() => {
        setAppState({ loading: true });
        const username = localStorage.getItem('username');
        const apiUrl = `article-approval?username=${username}`;
        
        axiosInstance.get(apiUrl).then((response) => {
            const articles = response.data
            setAppState({ loading: false, articles: articles })
        }).catch(err => setAppState({ loading: false }))
    }, [setAppState]);


    return (
        <div className="App">
            {showUser}
            <h2>Articles In-Review</h2>
            <ArticleLoading
                isLoading={appState.loading}
                articles={appState.articles}
            />
        </div>
    );
}


export default ArticleApproval;

