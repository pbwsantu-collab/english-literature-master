/* ELM runtime loader — fixed deflate-raw */
(async function () {
  try {
    var b64 = (window.__B || []).join("");
    if (!b64) {
      console.error("ELM: no payload (__B empty)");
      return;
    }
    var bin = atob(b64);
    var u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    var stream = new Blob([u]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    var code = await new Response(stream).text();
    (0, eval)(code);
  } catch (e) {
    console.error("ELM load error", e);
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<div style='padding:1rem;background:#b71c1c;color:#fff;font-family:sans-serif;z-index:9999;position:relative'>" +
        "App failed to load: " + (e && e.message ? e.message : e) +
        ". Hard-refresh with Ctrl+Shift+R.</div>"
    );
  }
})();
