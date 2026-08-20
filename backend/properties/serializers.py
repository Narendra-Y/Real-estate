from rest_framework import serializers
from .models import Agent, Property, PropertyImage, ContactInquiry

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image_url']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)
    agent_id = serializers.PrimaryKeyRelatedField(
        queryset=Agent.objects.all(),
        write_only=True,
        source='agent'
    )
    property_type_display = serializers.CharField(source='get_property_type_display', read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'name', 'description', 'property_type', 'property_type_display',
            'price', 'location', 'city', 'address', 'bedrooms', 'bathrooms',
            'area', 'amenities', 'agent', 'agent_id', 'images', 'created_at', 'updated_at'
        ]

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'
