from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q

from .serializers import (
    ArticleSerializer,
)

from .models import Article


@api_view(['GET'])
def index(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def and_query(request):
    """
    AND 조건 실습:
    '내용에 dja가 포함' AND '제목이 he로 시작'하는 Article 조회
    """
    articles = Article.objects.filter(

    )

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def or_query(request):
    """
    OR 조건 실습:
    '내용에 dja가 포함' OR '제목이 he로 시작'하는 Article 조회
    """
    articles = Article.objects.filter(

    )
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def not_query(request):
    """
    NOT 조건 실습:
    '제목이 he로 시작하지 않는' Article 조회
    """
    articles = Article.objects.filter(

    )
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def compound_query(request):
    """
    복합 조건 실습:
    """
    articles = Article.objects.filter(

    )
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
