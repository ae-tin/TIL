from django.urls import path
from . import views 

app_name = 'articles'
urlpatterns = [
    # 이미 프로젝트 url에서 articles/ 를 path지정 했기때문에
    path('', views.index, name= 'index'),
         
]

# {% url 'articles:index' %}