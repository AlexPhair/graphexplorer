"""graphexplorer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import re_path
from rest_framework.authtoken import views as auth_views
from api import views as api_views

urlpatterns = [
    # Auth
    re_path(r'^api/auth/register', api_views.AuthRegister.as_view()),
    re_path(r'^api/auth/token', auth_views.obtain_auth_token),
    re_path(r'^api/auth/verify', api_views.VerifyAuthTokenPermissions.as_view()),

    # Graph Entities
    re_path(r'^api/graphentity/$', api_views.GraphEntityList.as_view()),
    re_path(r'^api/graphentity/([QP][0-9]+)$', api_views.GraphEntityDetail.as_view()),

    # Graph Facts
    re_path(r'^api/graphfact/$', api_views.GraphFactList.as_view()),
    re_path(r'^api/graphfact/([QP]?[0-9]+)$', api_views.GraphFactDetail.as_view()),
]
