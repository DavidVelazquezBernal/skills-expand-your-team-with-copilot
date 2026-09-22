(function (global) {
  function getSharedActivityNameFromSearch(search) {
    return new URLSearchParams(search).get("activity") || "";
  }

  function buildActivityShareUrl(currentHref, activityName) {
    const shareUrl = new URL(currentHref);
    shareUrl.searchParams.set("activity", activityName);
    return shareUrl.toString();
  }

  function buildActivityShareMessage(activityName, description) {
    if (!description) {
      return `Check out ${activityName} at Mergington High School!`;
    }

    return `Check out ${activityName} at Mergington High School! ${description}`;
  }

  function buildActivityEmailShareUrl(activityName, description, shareUrl) {
    const shareMessage = buildActivityShareMessage(activityName, description);
    return `mailto:?subject=${encodeURIComponent(
      `Check out ${activityName}`
    )}&body=${encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const shareUtils = {
    getSharedActivityNameFromSearch,
    buildActivityShareUrl,
    buildActivityShareMessage,
    buildActivityEmailShareUrl,
    escapeHtml,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = shareUtils;
    return;
  }

  global.ShareUtils = shareUtils;
})(typeof window !== "undefined" ? window : globalThis);
