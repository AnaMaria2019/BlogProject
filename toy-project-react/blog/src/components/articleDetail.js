import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Article from './article';
import LoaderComponent from './loader';
import axiosInstance from '../axios';


function ArticleDetail() {
    const loggedInUser = localStorage.getItem('username', null)
	const showUser = loggedInUser ? <h1>Logged in user is: {loggedInUser}</h1> : ''
    const ArticleLoading = LoaderComponent(Article);
    const { id } = useParams();
    const [appState, setAppState] = useState({
        loading: false,
        article: null,
    });

    useEffect(() => {
        console.log(id)
        setAppState({ loading: true });
        const apiUrl = `article/${id}/`;
        
        axiosInstance.get(apiUrl).then((response) => {
            const article = response.data
            setAppState({ loading: false, article: article })
        }).catch(err => setAppState({ loading: false }))
    }, [setAppState]);

    return (
        <div className="App">
            {showUser}
            <h2>Article {id} Detail Page</h2>
            <ArticleLoading
                isLoading={appState.loading}
                article={appState.article}
            />
        </div>
    );
}


export default ArticleDetail;
