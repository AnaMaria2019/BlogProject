from django.contrib import admin

from .models import Article, Writer


# Register your models here.
@admin.register(Article)
class AuthorAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'created_at',
        'content',
        'status',
        'written_by',
        'edited_by'
    )


admin.site.register(Writer)
