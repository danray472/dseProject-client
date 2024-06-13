import json
import random
import string
from faker import Faker

fake = Faker()

# Generate 1000 device cards with random details
device_cards = []
for _ in range(40):
    ticket_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
    device_card = {
        "ticketNumber": ticket_number,
        "deviceType": random.choice(["Smartphone", "Tablet", "Laptop"]),
        "customerName": fake.name(),
        "customerEmail": fake.email(),
        "deviceState": random.choice(["In-repair", "Completed", "Received"]),
        "date": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
    }
    device_cards.append(device_card)

# Save the device cards to a JSON file
with open("device_cards.json", "w") as json_file:
    json.dump(device_cards, json_file, indent=2)

print("Device cards generated and saved to device_cards.json")
