"""
URL configuration for firstpjt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
# 명시적 상대 경로
from . import views

# app_name은 정해진 변수명. 변경 불가
app_name = 'articles' # path의 name이 다른 앱과 겹쳤을 때 app_name을 key로 'app_name:name'으로 인식한다 
urlpatterns = [
    # url로 articles/까지 일치 되었을 때 두번째 인자에 있는
    path('', views.index, name='home'),
    path('dinner/', views.dinner, name='dinner'),
    path('search/', views.search, name='search'),
    path('throw/', views.throw, name='throw'),
    path('catch/', views.catch, name='catch'),
    path('<int:num>', views.detail, name='<int:num>')

]
