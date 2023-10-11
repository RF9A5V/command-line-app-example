const fs = require("fs");

const events = require("../data/events.json");
const { nanoid } = require("nanoid");

const { getLocation } = require("./locations");

/** 
 * 
 * The event object:
 * 
 * id: String, unique identifier for an event
 * type: String, one of either "entry" or "exit"
 * name: String, name of the person entering
 * locationId: String, id of the location in question
*/

// Get one event at the provided index
function getEvent(id) {
  const result = events.findIndex(event => event.id === id);
  if(result >= 0) {
    return events[result];
  }

  return `Error: No event with ID ${id} exists`;
}

// Get all events
function getEvents() {
  return events;
}

// Create an event with the details provided
function createEvent(eventDetails) {
  eventDetails.id = nanoid(4);
  events.push(eventDetails);
  saveEvents();
  return eventDetails;
}

// Update an existing event with the details provided
function updateEvent(id, eventDetails) {
  const result = events.findIndex(event => event.id === id);
  if(events[result]) {
    events[result] = {
      ...events[result],
      ...eventDetails
    };
    saveEvents();
    return events[result];
  }

  return `Error: event with ID ${id} not found`;
}

// Delete an existing event
function deleteEvent(id) {
  const result = events.findIndex(event => event.id === id);
  if(events[result]) {
    const deleted = events.splice(result, 1);
    saveEvents();
    return deleted;
  }

  return `Error: event with ID ${id} not found`;
}

function getLocationOfEvent(eventId) {
  const result = events.findIndex(event => event.id === eventId);
  if(result < 0) {
    return `Error: event with ID ${id} not found`;
  }
  return getLocation(events[result].locationId);
}

// Save the events to a file for persistence
function saveEvents() {
  const stringifiedEvents = JSON.stringify(events);
  fs.writeFileSync("./data/events.json", stringifiedEvents);
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getLocationOfEvent,
}

// Note that we don't have to export saveEvents
// That's because we only ever have to save to the file in this module, when any of the
// functions to update the events gets called
// So other parts of our code don't need to know about how to save the events file