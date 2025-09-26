from django.shortcuts import render, redirect
from .models import Article 

# Create your views here.

# 전체 게시글 조회(1) 후 메인 페이지 응답(2)
def index(request):
    # 1. DB에 전체 게시글을 조회
    articles = Article.objects.all()

    # 2. 전체 게시글 목록을 템플릿과 함께 응답
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)

# 게시글 상세페이지를 응답하는 함수
def detail(request, article_pk): # 매개변수: pk는 urls의 ''variable_routing의 변수명과 일치''해야함!!!
    '''
    1. 몇 번 게시물인지를 DB에서 조회
    2. 조회한 상세 게시글 데이터를 템플릿과 함께 응답
    '''
    # 1. DB에 단일 게시글을 조회 : QuerySet API method : get!
    # 1.1 맞는게 없을 때나, 1.2 맞는게 여러개일때 예외(에러)
    article = Article.objects.get(pk=article_pk)

    # 2. 단일 게시글 데이터와 템플릿과 함께 응답
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)


def new(request):
    return render(request, 'articles/new.html')

# 1. 사용자로부터 입력 받은 데이터를 추출
# 2. 추출한 데이터를 db에 저장
# 3. 저장이 완료됐다는 페이지를 응답
def create(request):
    # 1. 
    title = request.POST.get('title') # html의 input tag의 name이 key가 된다
    content = request.POST.get('content') # html의 input tag의 name이 key가 된다

    # 2.DB에 저장
    # 2.1 article = Article(), article.title = title, article.save()
    # 2.2 article = Article(title = title, content = content), article.save()
    # 2.3 Article.objects.create(title=title, content=content)
    # Article.objects.create(title=title, content=content)

    # 1 or 2번으로 진행해야함. 저장 전에 유효성 검사를 해야하기 때문.
    article = Article(title = title, content = content)
    article.save()
    # return redirect('articles:index')
    articles = Article.objects.all()

    # 2. 전체 게시글 목록을 템플릿과 함께 응답
    # context = {
    #     'articles': articles,
    # }
    # return render(request, 'articles/index.html', context)
    return redirect('articles:detail', article.pk)


# 삭제를 하려면 queryset 조회를 해야하기 때문에 
def delete(request, article_pk):
    # 1. 어떤 게시글 삭제할거니
    article = Article.objects.get(pk=article_pk)
    # 2. 조회한 게시글을 삭제
    article.delete()
    # 3. 메인페이지로 리다이렉트
    return redirect(request, 'articles/new.html')

# 사용자에게 수정하는 form이 담긴 페이지를 응답
def edit(request, article_pk):
    # 1. 어떤 게시글 수정할거니
    article = Article.objects.get(pk=article_pk)
    # 2. 조회한 게시글을 넘겨줌
    context = {
        'article': article,
    }
    return render(request, 'articles/edit.html', context)

def update(request, article_pk):
    # 1. 어떤 게시글 수정할거니
    article = Article.objects.get(pk=article_pk)
    
    title = request.POST.get('title')
    content = request.POST.get('content')
     
    article.title = title
    article.content = content
    article.save()
    # 3. 메인페이지로 리다이렉트
    return redirect('articles:detail', article_pk)