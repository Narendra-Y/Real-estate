from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, AgentViewSet, ContactInquiryViewSet, get_unique_cities

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'agents', AgentViewSet, basename='agent')
router.register(r'inquiries', ContactInquiryViewSet, basename='inquiry')

urlpatterns = [
    path('', include(router.urls)),
    path('cities/', get_unique_cities, name='unique-cities'),
]
