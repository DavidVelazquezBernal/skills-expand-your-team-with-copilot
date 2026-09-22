const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getSharedActivityNameFromSearch,
  buildActivityShareUrl,
  buildActivityShareMessage,
  buildActivityEmailShareUrl,
  escapeHtml,
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

test("preserves existing query parameters when building a direct link", () => {
  assert.equal(
    buildActivityShareUrl(
      "https://example.com/static/index.html?day=Monday&time=afternoon",
      "Art Club"
    ),
    "https://example.com/static/index.html?day=Monday&time=afternoon&activity=Art+Club"
  );
});

test("omits missing descriptions from the shared message", () => {
  assert.equal(
    buildActivityShareMessage("Drama Club"),
    "Check out Drama Club at Mergington High School!"
  );
});

test("builds the email share link from the same share message", () => {
  assert.equal(
    buildActivityEmailShareUrl(
      "Chess Club",
      "Learn strategies and compete in chess tournaments",
      "https://example.com/static/index.html?activity=Chess+Club"
    ),
    "mailto:?subject=Check%20out%20Chess%20Club&body=Check%20out%20Chess%20Club%20at%20Mergington%20High%20School!%20Learn%20strategies%20and%20compete%20in%20chess%20tournaments%0A%0Ahttps%3A%2F%2Fexample.com%2Fstatic%2Findex.html%3Factivity%3DChess%2BClub"
  );
});

test("escapes html-sensitive characters for rendered share controls", () => {
  assert.equal(
    escapeHtml(`Rock & "Roll" <Club>`),
    "Rock &amp; &quot;Roll&quot; &lt;Club&gt;"
  );
});
