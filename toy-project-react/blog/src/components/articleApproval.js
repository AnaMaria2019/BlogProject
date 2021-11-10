import React, { useState, useEffect } from 'react';

import Articles from './articles';
import LoaderComponent from './loader';
import axiosInstance from '../axios';


function ArticleApproval() {
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
            <h1>Articles In-Review</h1>
            <ArticleLoading
                isLoading={appState.loading}
                articles={appState.articles}
            />
        </div>
    );
}


export default ArticleApproval;

