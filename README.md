# BlogProject

**NOTE**: The frontend part of the project is build using <strong>React</strong>, and the backend part with <strong>Django</strong>.

You can find pictures of the project's web pages [here](https://github.com/AnaMaria2019/BlogProject/tree/master/pictures).

### Prerequisites

* Django Backend Project:
  * `Django==3.1`
  * `djangorestframework==3.11.0`
  * `django-rest-auth==0.9.5`
  * `djangorestframework-simplejwt==4.4.0`
  * `PyJWT==1.7.1`
  * `django-cors-headers==3.10.0`
  * `coverage==6.1.1`


### Actions the user of this blog app can perform:

1. `/` is the main page that is accessible to all users (writers and editors) where a summary of all users activity on the platform is shown in a table format.
2. `article-approval` is accessible only for the editor users - this page lists the articles that are still in 'in-review' status. An editor can reject or accept an article.
3. `articles-edited` is accessible only for the editor user - this page lists all the articles edited by the logged-in editor user.
4. `article/<id>` redirects the user to the article detail page where he can either edit the article or create a new one.
5. `register` is the page dedicated for registering a new user into the platform.
6. `login` redirects the user to the login form.
