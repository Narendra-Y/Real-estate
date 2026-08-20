from django.core.management.base import BaseCommand
from properties.models import Agent, Property, PropertyImage

class Command(BaseCommand):
    help = 'Seeds the database with high-quality mock real estate agents and properties'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # Clear existing data to avoid duplicates
        PropertyImage.objects.all().delete()
        Property.objects.all().delete()
        Agent.objects.all().delete()

        # 1. Create Agents
        agent_aarav = Agent.objects.create(
            name="Aarav Sharma",
            email="narendrayadala5@gmail.com",
            phone="+91 98765 43210",
            company="ApexRealty Group",
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        )
        agent_neha = Agent.objects.create(
            name="Neha Patel",
            email="narendrayadala5@gmail.com",
            phone="+91 87654 32109",
            company="ApexRealty Premium",
            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        )
        agent_rohan = Agent.objects.create(
            name="Rohan Das",
            email="narendrayadala5@gmail.com",
            phone="+91 76543 21098",
            company="ApexRealty Commercial",
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
        )

        self.stdout.write(self.style.SUCCESS(f"Created 3 agents."))

        # 2. Define Properties List
        properties_data = [
            {
                "name": "Skyline Elegance Penthouse",
                "description": "A luxurious 3 BHK penthouse overlooking the Arabian Sea. It features a private terrace, floor-to-ceiling windows, imported marble flooring, custom modular kitchen, and centralized climate control. Perfect for modern urban living in the heart of Mumbai.",
                "property_type": "apartment",
                "price": 12500000.00,  # 1.25 Cr
                "location": "Bandra West",
                "city": "Mumbai",
                "address": "14th Floor, Skyline Heights, Carter Road, Bandra West, Mumbai, MH - 400050",
                "bedrooms": 3,
                "bathrooms": 3,
                "area": 2200,
                "amenities": ["Sea View", "Swimming Pool", "24/7 Security", "Gym", "Private Terrace", "Covered Parking", "Modular Kitchen"],
                "agent": agent_neha,
                "images": [
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Serene Valley Villa",
                "description": "Nestled in the lush hills of Lonavala, this premium 4 BHK villa offers peace and tranquility. The property comes fully furnished, boasting a private swimming pool, a sprawling landscaped garden, separate servant quarters, and panoramic hill views. An ideal weekend retreat or luxury home.",
                "property_type": "villa",
                "price": 28000000.00,  # 2.8 Cr
                "location": "Gold Valley",
                "city": "Pune",
                "address": "Villa 12, Whispering Woods Enclave, Gold Valley, Lonavala, Pune, MH - 410401",
                "bedrooms": 4,
                "bathrooms": 4,
                "area": 4200,
                "amenities": ["Private Pool", "Private Garden", "Fully Furnished", "Hill View", "Power Backup", "Pet Friendly", "Barbeque Area"],
                "agent": agent_aarav,
                "images": [
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Heritage Garden House",
                "description": "A classic independent house featuring traditional red brick styling, a spacious wrap-around porch, and a private driveway. Surrounded by mature trees, this property is situated in the premium Koregaon Park area, offering high privacy, high ceilings, and beautiful antique-style woodwork.",
                "property_type": "independent_house",
                "price": 9500000.00,  # 95 Lakhs
                "location": "Koregaon Park",
                "city": "Pune",
                "address": "House No. 42, Lane 5, Koregaon Park, Pune, MH - 411001",
                "bedrooms": 3,
                "bathrooms": 2,
                "area": 1800,
                "amenities": ["Lawn", "Water Storage", "Garage", "Solar Water Heater", "Secured Gates", "Servant Quarter"],
                "agent": agent_aarav,
                "images": [
                    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Metro Business Plaza Shop",
                "description": "Premium ground floor retail shop space in a high-footfall commercial complex on Indiranagar 100 Feet Road. Fully visible frontage with massive display windows. Ideal for a high-end fashion boutique, cafe, dental clinic, or corporate showroom.",
                "property_type": "commercial",
                "price": 6500000.00,  # 65 Lakhs
                "location": "Indiranagar",
                "city": "Bangalore",
                "address": "Shop G-5, Metro Business Plaza, 100 Feet Road, Indiranagar, Bangalore, KA - 560038",
                "bedrooms": 0,
                "bathrooms": 1,
                "area": 850,
                "amenities": ["Central AC", "Elevator", "Fire Safety", "Visitor Parking", "High Speed Fiber Internet", "24/7 Security"],
                "agent": agent_rohan,
                "images": [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Silicon Valley Studio",
                "description": "Smart, modern 1 BHK studio apartment situated in Whitefield right next to major IT parks. Equipped with compact modular space-saving designs, high-speed internet provisions, and private balcony. Ideal for young tech professionals or high-yield rental investors.",
                "property_type": "apartment",
                "price": 4200000.00,  # 42 Lakhs
                "location": "Whitefield",
                "city": "Bangalore",
                "address": "A-302, TechCity Residency, ITPL Main Road, Whitefield, Bangalore, KA - 560066",
                "bedrooms": 1,
                "bathrooms": 1,
                "area": 600,
                "amenities": ["Gym", "Power Backup", "Intercom", "Elevator", "Play Area", "Supermarket Nearby", "Clubhouse"],
                "agent": agent_neha,
                "images": [
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Green Meadows Bungalow",
                "description": "Exquisite independent bungalow inside a premium gated community on Sarjapur Road. Features dual balconies, private parking garage, landscaped lawn, high woodwork ceilings, and premium sanitary fittings. Extremely safe environment for raising a family.",
                "property_type": "independent_house",
                "price": 18000000.00,  # 1.8 Cr
                "location": "Sarjapur Road",
                "city": "Bangalore",
                "address": "Villa 89, Green Meadows Enclave, Sarjapur Road, Bangalore, KA - 560035",
                "bedrooms": 4,
                "bathrooms": 4,
                "area": 3000,
                "amenities": ["Gated Community", "Clubhouse", "Tennis Court", "Jogging Track", "24/7 Security", "Water Purifier", "Private Balconies"],
                "agent": agent_aarav,
                "images": [
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Cosmopolitan Smart Space",
                "description": "Beautifully designed 2 BHK apartment on a high floor in Thane. Features a modern modular kitchen, built-in wardrobes in both bedrooms, premium vitrified tiles, and sliding French window doors that open to a scenic balcony. Great connectivity to Highway.",
                "property_type": "apartment",
                "price": 7800000.00,  # 78 Lakhs
                "location": "Thane West",
                "city": "Mumbai",
                "address": "804, Celestia Towers, Ghodbunder Road, Thane West, Mumbai, MH - 400607",
                "bedrooms": 2,
                "bathrooms": 2,
                "area": 1150,
                "amenities": ["Kids Play Area", "Gym", "Gas Pipeline", "CCTV", "Rainwater Harvesting", "Swimming Pool", "Elevator"],
                "agent": agent_neha,
                "images": [
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Royal Palms Luxury Estate",
                "description": "An architectural masterpiece in the ultra-posh Vasant Vihar of South Delhi. Double-height ceilings in the main drawing-room, private glass elevator, basement home theater, massive indoor heated swimming pool, Italian marble, and security vault. Experience ultimate opulence.",
                "property_type": "villa",
                "price": 45000000.00,  # 4.5 Cr
                "location": "Vasant Vihar",
                "city": "Delhi",
                "address": "Block C, House 14, Vasant Vihar, New Delhi, DL - 110057",
                "bedrooms": 5,
                "bathrooms": 6,
                "area": 6500,
                "amenities": ["Private Pool", "Home Automation", "Servant Quarters", "Multi-car Garage", "Private Lift", "High-End Security", "Home Theater"],
                "agent": agent_neha,
                "images": [
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Lotus Commercial Hub Suite",
                "description": "A premium, fully furnished corporate office suite in Connaught Place. Configured with a reception area, a spacious conference board room, 3 executive manager cabins, 22 modular desk workstations, server room, and private cafeteria. Centralized AC and elite building management.",
                "property_type": "commercial",
                "price": 15000000.00,  # 1.5 Cr
                "location": "Connaught Place",
                "city": "Delhi",
                "address": "Suite 402, Lotus Hub, Connaught Circus, New Delhi, DL - 110001",
                "bedrooms": 0,
                "bathrooms": 2,
                "area": 2100,
                "amenities": ["Central AC", "24/7 Power Backup", "Valet Parking", "Conference Room", "Server Room", "Cafeteria", "Reception Desk"],
                "agent": agent_rohan,
                "images": [
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80"
                ]
            },
            {
                "name": "Urban Nest Apartment",
                "description": "Cozy, compact 2 BHK apartment designed for tech professionals in Hinjewadi IT Phase 2. Smart storage layouts, scenic balcony view, high-quality fittings, modular kitchen, and excellent public transit connections. Perfect balance of utility and budget.",
                "property_type": "apartment",
                "price": 4800000.00,  # 48 Lakhs
                "location": "Hinjewadi",
                "city": "Pune",
                "address": "C-504, Hinjewadi Prime Heights, Phase 2, Hinjewadi, Pune, MH - 411057",
                "bedrooms": 2,
                "bathrooms": 2,
                "area": 950,
                "amenities": ["Power Backup", "Gym", "Solar Panels", "Clubhouse", "Security Guard", "Yoga Deck", "Balcony"],
                "agent": agent_aarav,
                "images": [
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80"
                ]
            }
        ]

        for p_data in properties_data:
            images = p_data.pop("images")
            prop = Property.objects.create(**p_data)
            for img_url in images:
                PropertyImage.objects.create(property=prop, image_url=img_url)

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(properties_data)} properties with images!"))
