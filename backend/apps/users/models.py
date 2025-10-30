from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from django.utils import timezone

class Factory(models.Model):
    factory_code = models.CharField(max_length=20, unique=True, db_index=True)
    factory_name = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Factory"
        verbose_name_plural = "Factories"

    def __str__(self):
        return f"{self.factory_code} - {self.factory_name}"

class Branch(models.Model):
    branch_code = models.CharField(max_length=20)
    branch_name = models.CharField(max_length=100)
    factory = models.ForeignKey(Factory, on_delete=models.CASCADE, related_name="branch")

    class Meta:
        verbose_name = "Branch"
        verbose_name_plural = "Branches"

    def __str__(self):
        return f"{self.factory.factory_code}:{self.branch_code} - {self.branch_name}"

class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, password=None, **extra_fields):
        if not user_id:
            raise ValueError("User ID is required")
        user_id = str(user_id).strip()
        extra_fields.setdefault('is_active', True)
        user = self.model(user_id=user_id, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, password=None, **extra_fields):
        if not password:
            raise ValueError("Superuser must have a password")
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(user_id, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(max_length=10, unique=True, db_index=True,
                                                            validators=[RegexValidator(regex=r'^[A-Za-z0-9._-]+$')])
    user_name = models.CharField(max_length=30, db_index=True)
    user_email = models.EmailField(blank=True, null=True)
    user_first_name = models.CharField(max_length=50, blank=True)
    user_last_name = models.CharField(max_length=50, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    create_time = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ["user_id"]
        indexes = [
            models.Index(fields=["user_id"]),
            models.Index(fields=["user_name"]),
        ]

    def __str__(self):
        return f"{self.user_id} - {self.user_name}"



