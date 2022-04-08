from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class UserPermissions(BasePermission):
    def has_permission(self, request, view):
        is_authenticated = IsAuthenticated.has_permission(self, request, view)
        is_admin = IsAdminUser.has_permission(self, request, view)

        authenticated_routes = ['GET', 'POST', 'PUT']
        admin_routes = ['DELETE']

        if request.method in authenticated_routes and is_authenticated:
            return True

        if request.method in admin_routes and is_authenticated and is_admin:
            return True

        return False

