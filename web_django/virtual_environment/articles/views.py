from django.shortcuts import render
import random
# Create your views here.
def index(request):
    context = {
        'name':'jane'
    }
    return render(request, 'articles/index.html',context)

def dinner(request):
    foods = [
        '국밥',
        '국수',
        '카레',
        '탕수육'
    ]
    picked = random.choice(foods)
    context = {
        'foods' : foods,
        'picked': picked,
    }
    return render(request, 'articles/dinner.html', context)

def search(request):
    return render(request, 'articles/search.html')


def throw(request):
    return render(request, 'articles/throw.html')

# throw의 사용자 입력 데이터를 추출해서 응답 페이지에 보여주기
def catch(request):
    # 사용자 입력 데이터는 어딨을까앙 민뇽앙 -> request 객체
    print(request.GET.get('message'))
    context = {
        'message': request.GET.get('message')
    }
    return render(request, 'articles/catch.html', context)


def detail(request, num):
    context = {
        'num':num,
    }
    return render(request, 'articles/detail.html', context)




