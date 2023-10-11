const fs = require("fs");
const { nanoid } = require("nanoid");

const locations = require("../data/locations.json");

// const { getEvents } = require("./events");

/** 
 * The Location Object
 * 
 * id: String, unique identifier for a location
 * name: String, name of the location
 * address: String, where the location is at
*/

// To get a single location, we have the getLocation function
// Note that this function refers to a location (singular) and takes an index as a parameter
function getLocation(id) {
  const result = locations.find(loc => loc.id === id);
  if(result) {
    return result;
  }
  return null;
}

// To get all locations, we have the getLocations function
// Note that this function refers to locations (plural) and takes no parameters
function getLocations() {
  return locations;
}

// To create a new location, we have the createLocation function
// Note that it only expects an argument for locationDetails. Since we're adding a new
// location to our list, we expect to create a new spot in our array for this item, hence a new index.
function createLocation(locationDetails) {
  // Generate an ID and put it on the locationDetails
  locationDetails.id = nanoid(4);
  // Add our new locationDetails to our array of locations
  locations.push(locationDetails);
  // Update the locations.json file
  saveLocations();
  // Give the user access to the location we just created
  return locationDetails;
}

// To update an existing location, we have the updateLocation function.
// Note that it takes an index param and a locationDetails param.
// Updating an entry in our array should only work if an entry already exists at that index.
function updateLocation(id, locationDetails) {
  // See if there's a location with the ID we provided in our list
  // Should give us -1 if not found, and anything else if found
  const result = locations.findIndex(loc => loc.id === id);
  // If we find the location
  if(result >= 0) {
    // We update the location at that index and set it equal to a new object
    locations[result] = {
      // In this new object, we copy all the keys and values of the old object
      ...locations[result],
      // And overwrite any conflicting keys and values with the object we get from the params
      ...locationDetails,
    }
    // Update the locations.json file
    saveLocations();
    // Then we return the location we just updated
    return locations[result];
  }
  // Otherwise, if we can't find the location
  else {
    // We just spit out an error that says there's no location at the index they gave us
    return `Error: Location with ID ${id} not found`;
  }
}

// To remove an existing location from our list of locations, we have the deleteLocation function
function deleteLocation(id) {
  // See if there's a location with the ID we provided in our list
  // Should give us -1 if not found, and anything else if found
  const result = locations.findIndex(loc => loc.id === id);
  if(result >= 0) {
    // We remove that location by splicing it from our array, and we save what we removed in a variable
    const deleted = locations.splice(result, 1);
    // Update the locations.json file
    saveLocations();
    // Then we return that deleted item so the user can see/use exactly what they just deleted
    return deleted;
  }
  else {
    return `Error: Location with ID ${id} not found`;
  }
}

// function getEventsAtLocation(id) {
//   // See if there's a location with the ID we provided in our list
//   // Should give us -1 if not found, and anything else if found
//   const result = locations.findIndex(loc => loc.id === id);
//   if(result < 0) {
//     return "Error: no location found at index " + index;
//   }
//   console.log(getEvents)
//   const events = getEvents();
//   return events.filter(event => event.locationId === id);
// }

// The function saveLocations is here to help us keep the locations.json file up to date with the data
// we've got in the locations array at the top of the file.
function saveLocations() {
  // We get our array of locations ready to write to a file by making it a string using JSON.stringify
  const stringifiedLocations = JSON.stringify(locations);
  // We use fs.writeFileSync to take our location data string and overwrite what's already in data/locations.json
  fs.writeFileSync("./data/locations.json", stringifiedLocations);
}

module.exports = {
  getLocation,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
}