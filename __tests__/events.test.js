const eventsAPI = require("../src/events");

const eventData = require("../data/events.json");

describe("Events API", () => {
  describe("getEvents()", () => {
    it("correctly gets all events in persistent data", () => {
      expect(eventsAPI.getEvents()).toEqual(eventData)
    })
  })

  describe("getEvent()", () => {
    it("correctly gets a single event from persistent data", () => {
      const expected = {"locationId":"LE0w","name":"Bob Dole","type":"entry","id":"PKuj"};
      const actual = eventsAPI.getEvent("PKuj")
      expect(actual).toEqual(expected);
    })

    it("correctly gives an error string back when event cannot be found", () => {
      const expected = "Error: No event with ID invalid exists"
      const actual = eventsAPI.getEvent("invalid");

      expect(actual).toEqual(expected);
    })
  })
})