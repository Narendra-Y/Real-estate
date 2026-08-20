from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import Agent, Property, ContactInquiry
from .serializers import AgentSerializer, PropertySerializer, ContactInquirySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Get query parameters
        search = self.request.query_params.get('search', None)
        property_type = self.request.query_params.get('property_type', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        bedrooms = self.request.query_params.get('bedrooms', None)
        city = self.request.query_params.get('city', None)
        sort_by = self.request.query_params.get('sort_by', None)

        # Search filter (name, city, location)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(city__icontains=search) |
                Q(location__icontains=search)
            )

        # Property Type filter
        if property_type:
            queryset = queryset.filter(property_type=property_type)

        # Price range filter
        if min_price:
            try:
                queryset = queryset.filter(price__gte=float(min_price))
            except ValueError:
                pass
        if max_price:
            try:
                queryset = queryset.filter(price__lte=float(max_price))
            except ValueError:
                pass

        # Bedrooms filter
        if bedrooms:
            if bedrooms == '4+':
                queryset = queryset.filter(bedrooms__gte=4)
            else:
                try:
                    queryset = queryset.filter(bedrooms=int(bedrooms))
                except ValueError:
                    pass

        # City filter
        if city:
            queryset = queryset.filter(city__iexact=city)

        # Sorting
        if sort_by == 'price_asc':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_desc':
            queryset = queryset.order_by('-price')
        elif sort_by == 'newest':
            queryset = queryset.order_by('-created_at')
        else:
            queryset = queryset.order_by('-id')  # Default sort

        return queryset

class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

    def perform_create(self, serializer):
        inquiry = serializer.save()
        from django.core.mail import send_mail
        subject = f"ApexRealty: New Inquiry from {inquiry.name}"
        message = (
            f"You received a new inquiry on ApexRealty.\n\n"
            f"Property: {inquiry.property.name if inquiry.property else 'General'}\n"
            f"Client Name: {inquiry.name}\n"
            f"Client Email: {inquiry.email}\n"
            f"Client Phone: {inquiry.phone}\n\n"
            f"Message:\n{inquiry.message}"
        )
        send_mail(
            subject,
            message,
            'narendrayadala5@gmail.com',
            ['narendrayadala5@gmail.com'],
            fail_silently=True
        )

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

@api_view(['GET'])
def get_unique_cities(request):
    cities = Property.objects.values_list('city', flat=True).distinct()
    # Filter out empty/null values
    cities = [c for c in cities if c]
    return Response(sorted(cities), status=status.HTTP_200_OK)
