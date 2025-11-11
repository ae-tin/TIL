from django.urls import path
from . import views


app_name = 'accounts'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('delete/', views.delete, name='delete'),
    path('update/', views.update, name='update'),
    path('password/', views.password, name='password'),
    # variable routing 할 때에 <username>/ 이 맨 위로 가게 되면
    # 항상 주소가 str로 시작하기 때문에 login, logout이런거도 username으로 인식해버려서
    # 맨 아래 오거나 명확하게 구분할 수 있는 문자가 따로 섞여 있는 것이 좋다
    ## username은 unique속성을 가지기 때문에 pk와 마찬가지로 구별은 가능하지만 삭제가 됐을 때
    ## 같은 username으로 다시 등록을 할 수 있음. pk의 유일성과는 성격이 조금 다름
    path('profile/<username>', views.profile, name='profile'),
    path('<int:user_pk>/follow>', views.follow, name='follow'),
]
