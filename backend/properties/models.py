from django.db import models

class Agent(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company = models.CharField(max_length=255, default='ApexRealty Group')
    avatar = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

class Property(models.Model):
    PROPERTY_TYPES = [
        ('apartment', 'Apartment'),
        ('villa', 'Villa'),
        ('independent_house', 'Independent House'),
        ('commercial', 'Commercial'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    price = models.DecimalField(max_digits=12, decimal_places=2)  # In Rupees (INR)
    location = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    address = models.TextField()
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    area = models.PositiveIntegerField()  # Sq.ft.
    amenities = models.JSONField(default=list)  # Stored as list of strings, e.g. ["Pool", "Gym"]
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='properties')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Properties"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image_url = models.CharField(max_length=500)

    def __str__(self):
        return f"Image for {self.property.name}"

class ContactInquiry(models.Model):
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry by {self.name} for {self.property.name if self.property else 'General'}"
