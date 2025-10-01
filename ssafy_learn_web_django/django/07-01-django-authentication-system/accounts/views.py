from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
# Create your views here.
def login(request):
    if request.method == 'POST':
        # form 인스턴스를 생성하고, 요청으로 들어온 데이터(request.POST)를 채움
        # AuthenticationForm의 부모는 Form(db저장X), ModelForm과 인자가 다름
        form = AuthenticationForm(request, request.POST)
        # 유효성 검사를 통과했다면
        if form.is_valid():
            # 세션을 생성, 별도의 함수 존재
            auth_login(request, form.get_user())
            # 생성된 게시글의 상세 페이지로 리다이렉트
            return redirect('accounts:index')
    else:
        # GET 요청일 때 로그인 페이지를 응답
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html' ,context)