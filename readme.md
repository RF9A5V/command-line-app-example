# The Checkpoint Security Administrative Service (CSAS)

CSAS is a command-line application that provides a mechanism to log ingress and egress events to various locations. With CSAS, you can manage locations, and log entry and exit events, offering a simple but powerful way to monitor location-based activities.

## Features
- Command-line interface for user-friendly interaction.
- Ability to add, modify, or remove locations.
- Log ingress (entry) and egress (exit) events for each location.
- Retrieve logs and history for a specific location.

## Available Commands
- npm run create location <locationName> <locationAddress>
- npm run create event <personName> <eventType> <locationId>
- npm run get location
- npm run get location <locationId>
- npm run get event
- npm run get event <eventId>
- npm run update location <locationId> <locationName> <locationAddress>
- npm run update event <eventId> <personName> <eventType> <locationId>
- npm run delete location <locationId>
- npm run delete event <eventId>
- npm run getLocationOfEvent <eventId>