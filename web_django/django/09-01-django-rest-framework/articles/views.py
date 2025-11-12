from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Article
from .serializers import ArticleListSerializer, ArticleSerializer


# DRF의 모든 뷰 함수는 반드시 api_view 데코레이터가 필수
@api_view(['GET', 'POST'])
def article_list(request):
    if request.method == "GET":
        articles = Article.objects.all()
        # Serializer의 첫번째 인자가 QuerySet이면 many를 꼭 True로 해줘야함
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','DELETE','PATCH'])
def article_detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    if request.method == "GET":
        # Serializer의 첫번째 인자가 QuerySet이면 many를 꼭 True로 해줘야함
        # 하지만 단일한 데이터이면 many 필요 없음
        serializer = ArticleSerializer(article)
        # 200 응답이면 기본이라 status 안넣어도 됨
        return Response(serializer.data)

    elif request.method == "DELETE":    
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PATCH":
        # 과거코드
        # form = articleform(request.POST, instance=article)
        # 사용자로부터 새로운 입력데이터를 받아 직렬화(+기존 데이터). 기존 데이터를 앞에 받음
        # serializer = ArticleSerializer(article, data=request.data)
        # 일부만 수정하려면 partial=True를 해줘야함. 하지만 PUT은 전체 데이터 업데이트를 권장하고
        # 일부 수정 가능은 PATCH method를 권장함
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # 200 응답이면 기본이라 status 안넣어도 됨
            return Response(serializer.data)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)