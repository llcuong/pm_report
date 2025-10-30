import json
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


@ensure_csrf_cookie
@require_GET
def csrf(request):
    return JsonResponse({"detail": "CSRF cookie set"}, status=200)


@csrf_protect
@require_POST
def login_view(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except Exception:
        data = {}
    user_id = (data.get("user_id") or "").strip()
    password = data.get("password") or ""

    if not user_id or not password:
        return JsonResponse({"error": "Thiếu user_id hoặc password"}, status=400)

    user = authenticate(request, user_id=user_id, password=password)
    if user is None:
        return JsonResponse({"error": "Sai thông tin đăng nhập"}, status=401)
    if not user.is_active:
        return JsonResponse({"error": "Tài khoản bị vô hiệu hoá"}, status=403)

    login(request, user)
    print(f"user.is_superuser - {user.is_superuser}")
    return JsonResponse({
        "detail": "Success",
        "user": {
            "user_id": user.user_id,
            "user_name": user.user_name,
            "user_email": user.user_email,
            "is_staff": user.is_staff,
        }
    }, status=200)


@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"detail": "Success"}, status=200)


@login_required
@require_GET
def home(request):
    u = request.user
    return JsonResponse({
        "user": {
            "user_id": u.user_id,
            "user_name": u.user_name,
            "user_email": u.user_email,
            "is_staff": u.is_staff,
        }
    }, status=200)