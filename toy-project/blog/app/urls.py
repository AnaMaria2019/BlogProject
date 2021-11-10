from django.urls import path

from .views import (
    Dashboard, ArticleDetail, ArticleApproval,
    ArticlesEdited, WriterCreate, BlacklistToken,
    ArticleCreate
)


app_name = 'app'

urlpatterns = [
    path('', Dashboard.as_view(), name='dashboard'),
    path('register', WriterCreate.as_view(), name='create_user'),
    path('logout/blacklist', BlacklistToken.as_view(), name='blacklist'),
    path('article/<int:pk>/', ArticleDetail.as_view(), name='article_detail'),
    path('article-create', ArticleCreate.as_view(), name='article_create'),
    path('article-approval', ArticleApproval.as_view(), name='article_approval'),
    path('articles-edited', ArticlesEdited.as_view(), name='articles_edited'),
]
