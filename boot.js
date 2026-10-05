/* ELM boot */
(async function(){
  const b64=(window.__B||[]).join("");
  const bin=atob(b64);
  const u=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const code=await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("deflate"))).text();
  (0,eval)(code);
})().catch(e=>console.error("ELM",e));
