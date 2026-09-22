const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getSharedActivityNameFromSearch,
  buildActivityShareUrl,
  buildActivityShareMessage,
} = require("./share-utils");

test("reads the shared activity name from the query string", () => {
  assert.equal(
    getSharedActivityNameFromSearch("?activity=Chess%20Club"),
    "Chess Club"
  );
});

test("returns an empty shared activity name when not provided", () => {
  assert.equal(getSharedActivityNameFromSearch("?day=Monday"), "");
});

test("builds a direct link to the shared activity", () => {
  assert.equal(
    buildActivityShareUrl("https://example.com/static/index.html", "Art Club"),
    "https://example.com/static/index.html?activity=Art+Club"
  );
});

test("omits missing descriptions from the shared message", () => {
  assert.equal(
    buildActivityShareMessage("Drama Club"),
    "Check out Drama Club at Mergington High School!"
  );
});
