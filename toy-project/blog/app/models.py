from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Writer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='writer')
    is_editor = models.BooleanField()
    name = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.name} is an editor {self.is_editor}'


class Article(models.Model):
    class ArticleObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('in-review', 'In Review'),
        ('published', 'Published'),
        ('rejected', 'Rejected')
    )

    created_at = models.DateTimeField(default=timezone.now())
    title = models.CharField(max_length=250, blank=True, null=True)
    content = models.TextField(default='')
    status = models.CharField(max_length=10, choices=options, default='in-review')
    written_by = models.ForeignKey(Writer, on_delete=models.CASCADE, related_name='articles', blank=True, null=True)
    edited_by = models.ForeignKey(Writer, on_delete=models.CASCADE, related_name='articles_edited', blank=True, null=True)

    objects = models.Manager()
    article_objects = ArticleObjects()

    def __str__(self):
        return self.title


