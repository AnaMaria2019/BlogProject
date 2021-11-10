import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Article from './article';
import LoaderComponent from './loader';
import axiosInstance from '../axios';


function ArticleDetail() {
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
            <h1>Article {id} Detail Page</h1>
            <ArticleLoading
                isLoading={appState.loading}
                article={appState.article}
            />
        </div>
    );
}


export default ArticleDetail;
