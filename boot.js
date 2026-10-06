/* ELM boot */
(async function(){
  const b64=(window.__B||[]).join("");
  if(!b64){console.error('ELM: no payload');return;}
  const bin=atob(b64);
  const u=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  // Data is raw DEFLATE (no zlib header) → use deflate-raw
  const stream=new Blob([u]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const code=await new Response(stream).text();
  (0,eval)(code);
})().catch(function(e){
  console.error("ELM load error",e);
  document.body.insertAdjacentHTML("afterbegin",
    "<div style='padding:1rem;background:#b71c1c;color:#fff;font-family:sans-serif'>Failed to load app. Please hard-refresh (Ctrl+Shift+R).</div>");
});
