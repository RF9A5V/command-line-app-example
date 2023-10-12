// Interface details

const { 
  getEvent, 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getLocationOfEvent,
} = require("./src/events");
const locationAPI = require("./src/locations");

// node index.js create location "Pursuit HQ" "1 Main Street"
// [node, index.js, "create", "location", "Pursuit HQ", "1 Main Street"]

function processInput() {
  // Get the expected command from the command line
  const expectedCommand = process.argv[2];
  // Get the expected resource (should be either location or event) from the command line
  const expectedResource = process.argv[3];

  // Have a default value of an error in case we don't find the action we're looking for
  let result = "Error: Command not found";

  // If we input "create" as our command
  if(expectedCommand === "create") {
    // If we input "location" as our resource
    if(expectedResource === "location") {
      // We should expect to see a name and address value after the resource, and we grab them
      const [name, address] = process.argv.slice(4);
      // const name = process.argv[4];
      // const address = process.argv[5];
      // We take the name and address we got and send it to the createLocation function in an object
      result = locationAPI.createLocation({ name, address });
    }
    // Otherwise if we set our resource as "event"
    else if(expectedResource === "event") {
      // We should expect to see a name, a type, and a locationId after the resource
      // node index.js create event John Johnson entry bahs
      // [node, index.js, "create", "event", "John Johnson", "entry", "bahs"]
      const [name, type, locationId] = process.argv.slice(4);
      // Then we send those details to createEvent
      result = createEvent({ locationId, name, type })
    }
  }

  // If our command is "get"
  else if(expectedCommand === "get") {
    // For both locations and events, if we're getting only one entry, then we should expect an
    // id value right after the expected resource
    const possibleId = process.argv[4];

    // So if we're working with locations
    if(expectedResource === "location") {
      // And we have a value for our id
      if(possibleId) {
        // We get one location at that index
        result = locationAPI.getLocation(possibleId);
      }
      // Otherwise if possibleIndex isn't defined
      else {
        // We get all locations
        result = locationAPI.getLocations();
      }
    }
    // And if we're working with events
    else if(expectedResource === "event") {
      // If we have a value for possibleId
      if(possibleId) {
        // We try to get the event at that ID
        result = getEvent(possibleId);
      }
      // Otherwise if possibleId isn't defined
      else {
        // We get all the events
        result = getEvents();
      }
    }
  }
  // If our command is to update a resource
  else if(expectedCommand === "update") {
    // And the resource we're working with is "location"
    if(expectedResource === "location") {
      // We should expect to see an index value, a name, and an address after the resource
      const [id, name, address] = process.argv.slice(4);
      // And we'll send those values to the updateLocation function
      result = locationAPI.updateLocation(id, { name, address });
    }
    // Otherwise if we're working with an event resource
    else if(expectedResource === "event") {
      // We should expect to see an id value, a name for the person entering or exiting,
      // the type of event (entry or exit), and the ID of the location the event is at
      const [id, name, type, locationId] = process.argv.slice(4);
      // Then we take those values and pass them to updateEvent
      result = updateEvent(id, { name, type, locationId });
    }
  }
  // And if our command is "delete"
  else if(expectedCommand === "delete") {
    // We should expect an id value after the resource for both locations and events
    const id = process.argv[4];

    // If we're working with locations
    if(expectedResource === "location") {
      // We delete the location at the id we gave the command line
      result = locationAPI.deleteLocation(id);
    }
    // And if we're working with events
    else if(expectedResource === "event") {
      // We delete the event at the id we gave the command line
      result = deleteEvent(id);
    }
  }
  // else if(expectedCommand === "listEvents") {
  //   const expectedId = process.argv[3];
  //   console.log(expectedCommand, expectedId)
  //   result = locationAPI.getEventsAtLocation(expectedId);
  // }
  else if(expectedCommand === "getLocationOfEvent") {
    const expectedId = process.argv[3];
    result = getLocationOfEvent(expectedId);
  }

  // At this point, we should have either the result of running a command, or our
  // default error string from up top. And now we console.log it to show the user the
  // result of their command
  console.log(result);
}

// console.log(process.argv);
processInput();