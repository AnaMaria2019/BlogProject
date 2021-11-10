from rest_framework import generics
from rest_framework.permissions import BasePermission, SAFE_METHODS, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .models import Article, Writer
from .serializers import ArticleSerializer, RegisterSerializer, ArticleCreateAndEditSerializer

import datetime


# We allow a user (writer) to access only his articles through this 'article/<int:pk>' endpoint.
class ArticleUserViewPermission(BasePermission):
    message = 'You are allowed to view only your own articles!'

    def has_object_permission(self, request, view, obj):
        print('I am here')
        return obj.written_by.user == request.user


class EditorsViewPermission(BasePermission):
    message = 'Only editors can see this page'

    def has_permission(self, request, view):
        username = request.query_params.get('username')
        user = User.objects.get(username=username)
        writer = Writer.objects.get(user=user)

        return writer.is_editor


class WriterCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            new_writer = serializer.save()

            if new_writer:
                return Response(status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class BlacklistToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=HTTP_200_OK)
        except Exception as e:
            return Response(status=HTTP_400_BAD_REQUEST)


class Dashboard(APIView):
    def get(self, request):
        payload = []

        td = datetime.timedelta(-30)
        today = datetime.datetime.now().date()
        last_30_days = today + td

        writers_articles = [
            (writer.name, writer.id, len(writer.articles.all()), len(writer.articles.filter(created_at__gte=last_30_days, created_at__lte=today)))
            for writer in Writer.objects.all()
        ]

        for (name, id, all_articles, last_30_days_articles) in writers_articles:
            writer = {'id': id, 'name': name, 'totalArticles': all_articles, 'totalArticlesLast30': last_30_days_articles}

            payload.append(writer)

        return Response(payload)


class ArticleDetail(APIView):
    permission_classes = [ArticleUserViewPermission]

    def get(self, request, **kwargs):
        article_id = kwargs.get('pk')
        article = Article.objects.get(id=article_id)
        serializer = ArticleSerializer(article)

        return Response(serializer.data)

    def put(self, request, **kwargs):
        article_id = kwargs.get('pk')
        article = Article.objects.get(id=article_id)

        serializer = ArticleCreateAndEditSerializer(article, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ArticleCreate(APIView):
    def post(self, request):
        username = self.request.query_params.get('username')
        user = User.objects.get(username=username)
        writer = Writer.objects.get(user=user)

        serializer = ArticleCreateAndEditSerializer(data=request.data, context={'written_by': writer})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ArticleApproval(APIView):
    permission_classes = [EditorsViewPermission]

    def get(self, request):
        articles_to_be_reviewed = Article.objects.all().filter(status='in-review')
        serializer = ArticleSerializer(articles_to_be_reviewed, many=True)

        return Response(serializer.data)

    def put(self, request):
        article_id = self.request.query_params.get('id')
        username = self.request.query_params.get('username')

        article = Article.objects.get(pk=article_id)
        user = User.objects.get(username=username)
        writer = Writer.objects.get(user=user)

        serializer = ArticleSerializer(article, data=request.data, context={'writer': writer})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ArticlesEdited(APIView):
    permission_classes = [EditorsViewPermission]

    def get(self, request):
        username = self.request.query_params.get('username', None)
        user = User.objects.get(username=username)
        writer = Writer.objects.get(user=user)
        writer_articles = Article.objects.all().filter(edited_by=writer)
        serializer = ArticleSerializer(writer_articles, many=True)

        return Response(serializer.data)
