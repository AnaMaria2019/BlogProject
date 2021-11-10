from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Article, Writer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class RegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer(write_only=True)

    class Meta:
        model = Writer
        fields = ('is_editor', 'name', 'user')

    def create(self, validated_data):
        user_dict = validated_data.pop('user', None)
        user = User.objects.create_user(username=user_dict['username'], password=user_dict['password'])
        instance = self.Meta.model(**validated_data, user=user)
        instance.save()
        return instance


class WriterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Writer
        fields = ('name', 'user')


class ArticleSerializer(serializers.ModelSerializer):
    written_by = WriterSerializer(read_only=True)

    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'content',
            'status',
            'written_by',
            'edited_by'
        )

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        editor = self.context.get('writer')
        instance.edited_by = editor

        instance.save()

        return instance


class ArticleCreateAndEditSerializer(serializers.ModelSerializer):
    written_by = WriterSerializer(read_only=True)

    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'content',
            'written_by',
            'status'
        )
        read_only_fields = ['status']

    def create(self, validated_data):
        writer = self.context.get('written_by')
        instance = self.Meta.model(**validated_data, written_by=writer)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
