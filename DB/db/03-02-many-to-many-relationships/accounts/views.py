from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from .forms import CustomUserCreationForm, CustomUserChangeForm


# Create your views here.
def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')

    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect('articles:index')

    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)


@login_required
def logout(request):
    auth_logout(request)
    return redirect('articles:index')


def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)


@login_required
def delete(request):
    request.user.delete()
    return redirect('articles:index')


@login_required
def update(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/update.html', context)


@login_required
def password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/password.html', context)

from django.contrib.auth import get_user_model

@login_required
def profile(request, username):
    # 해당 프로필 페이지의 유저를 조회
    User = get_user_model()
    # username은 unique
    person = User.objects.get(username=username)
    context = {
        'person': person,
    }
    return render(request, 'accounts/profile.html', context)

def follow(request, user_pk):
    User = get_user_model()
    # 상대방(프로필 유저) 조회
    you = User.objects.get(pk=user_pk)
    me = request.user

    # 팔로우를 해야하는 지 / 언팔로우를 해야하는 지 
    # 내가 상대방의 팔로워 목록에 이미 있으면 -> 언팔로우
    # 내가 상대방의 팔로워 목록에 없으면 -> 팔로우
    # 나 자신을 팔로우 하면 안되기 때문에 상대방이 다른 사람인 경우에만
    if me != you:
        if me in you.followers.all():
            you.followers.remove(me)
            #me.follings.remove(you)도 같음
        else:
            you.followers.add(me)
            #me.follings.add(you)
    return redirect('accounts:profile', you.username)
    
    
    
