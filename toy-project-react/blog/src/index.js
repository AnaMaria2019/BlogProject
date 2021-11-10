import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';

import SignUp from './components/register';
import SignIn from './components/login';
import LogOut from './components/logout';
import App from './App';
import Header from './components/header';
import ArticleApproval from './components/articleApproval';
import ListEditedArticles from './components/listEditedArticles';
import ArticleDetail from './components/articleDetail';


const routing = (
  <Router>
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/register" component={SignUp}></Route>
        <Route exact path="/login" component={SignIn}></Route>
        <Route exact path="/logout" component={LogOut}></Route>
        <Route exact path="/article-approval" component={ArticleApproval} />
        <Route exact path="/articles-edited" component={ListEditedArticles}></Route>
        <Route exact path="/article/:id" component={ArticleDetail}></Route>
      </Switch>
      
    </React.StrictMode>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
