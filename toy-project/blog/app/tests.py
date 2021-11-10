from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Writer, Article


# NOTE: In order for the following tests to work the project's permissions for rest_framework must be
#       set to ALLOW_ANY in the 'settings.py' file.
# Create your tests here.
class TestCreateWriter(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user_1 = User.objects.create_user(
            username='test_user', password='123456'
        )
        test_writer = Writer.objects.create(
            user_id=1,
            is_editor=False,
            name='Misha'
        )

    def test_writer_create(self):
        writer = Writer.objects.get(id=1)
        user = f'{writer.user}'
        is_editor = f'{writer.is_editor}'
        name = f'{writer.name}'

        self.assertEqual(user, 'test_user')
        self.assertEqual(is_editor, 'False')
        self.assertEqual(name, 'Misha')
        self.assertEqual(str(writer), 'Misha')  # checking if the __str__ method from Writer model returns the name


class TestCreateArticle(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user_2 = User.objects.create_user(
            username='test_user', password='123456'
        )
        test_user_3 = User.objects.create_user(
            username='test_user_2', password='123456'
        )
        test_writer_1 = Writer.objects.create(
            user_id=1,
            is_editor=False,
            name='Simple Writer'
        )
        test_writer_2 = Writer.objects.create(
            user_id=2,
            is_editor=True,
            name='True Editor'
        )
        test_article = Article.objects.create(
            title='Test Article',
            content='I love dogs!',
            status='published',
            written_by_id=1,
            edited_by_id=2
        )

    def test_article_create(self):
        article = Article.objects.get(id=1)
        title = f'{article.title}'
        content = f'{article.content}'
        status = f'{article.status}'
        written_by = f'{article.written_by}'
        edited_by = f'{article.edited_by}'

        self.assertEqual(title, 'Test Article')
        self.assertEqual(content, 'I love dogs!')
        self.assertEqual(status, 'published')
        self.assertEqual(written_by, 'Simple Writer')
        self.assertEqual(edited_by, 'True Editor')
        self.assertEqual(str(article), 'Test Article')


class ArticleTests(APITestCase):
    def test_view_articles(self):
        url = reverse('app:dashboard')  # 'app' is the name of the app defined in 'app/urls.py' -> "app_name='app'"
        response = self.client.get(url, format='json')  # 'client'-simulates a browser and 'get' is the request's method
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_article(self):
        self.test_user_1 = User.objects.create_user(
            username='test_user_1', password='123456'
        )
        self.test_user_2 = User.objects.create_user(
            username='test_user_2', password='123456'
        )
        self.writer_1 = Writer.objects.create(
            user_id=1,
            is_editor=False,
            name='Simple Writer'
        )
        self.writer_2 = Writer.objects.create(
            user_id=2,
            is_editor=True,
            name='True Editor'
        )
        data = {
            'title': 'Dogs Article',
            'content': 'I love dogs!',
            'status': 'published',
            'written_by': 1,            # the id of the writer
            'edited_by': 2              # the id of the editor
        }

        url = reverse('app:dashboard')
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
