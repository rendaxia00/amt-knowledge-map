(() => {
  const { phases, chapters, glossary } = window.AMT_DATA;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const byId = new Map(chapters.map(c => [c.id, c]));
  const phaseById = new Map(phases.map(p => [p.id, p]));
  const storageKey = "amt-atlas-progress-v1";
  let activeId = location.hash.slice(1) && byId.has(location.hash.slice(1)) ? location.hash.slice(1) : (localStorage.getItem("amt-last") || "l1");
  let activeView = "map";
  let completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

  const phaseMap = $("#phaseMap");
  const chapterList = $("#chapterList");
  const glossaryList = $("#glossaryList");
  const readerContent = $("#readerContent");
  const searchInput = $("#searchInput");
  const emptyState = $("#emptyState");
  const atlas = $("#atlas");
  const reader = $("#reader");
  const toast = $("#toast");

  function escapeHtml(value="") {
    return value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function renderMap(filter="") {
    const q = filter.trim().toLowerCase();
    const stageIcon=index=>[
      '<svg viewBox="0 0 32 32"><path d="M4 24 12 10l5 8 3-5 8 11Z"/><path d="M9 24h14"/></svg>',
      '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="4"/><path d="M16 3v5M16 24v5M3 16h5M24 16h5"/></svg>',
      '<svg viewBox="0 0 32 32"><path d="M6 25V15h5v10M14 25V8h5v17M22 25V12h5v13M4 25h25"/></svg>',
      '<svg viewBox="0 0 32 32"><path d="M16 4 26 8v7c0 7-4 11-10 14C10 26 6 22 6 15V8Z"/><path d="m11 16 3 3 7-7"/></svg>',
      '<svg viewBox="0 0 32 32"><path d="M16 27V14M16 18c-6 0-9-4-9-9 6 0 9 3 9 9ZM16 14c1-6 4-9 10-9 0 6-4 9-10 9Z"/></svg>'
    ][index];
    const points=[]; const stageMarks=[]; let y=24;
    phases.forEach((phase,phaseIndex)=>{
      const items=chapters.filter(c=>c.phase===phase.id);
      const cols=7, rows=Math.ceil(items.length/cols), reverse=phaseIndex%2===1;
      const stageX=reverse?840:55;
      stageMarks.push({phase,phaseIndex,x:stageX,y:y+8,reverse});
      items.forEach((c,i)=>{
        const row=Math.floor(i/cols), col=i%cols;
        const actualCol=row%2===0?col:Math.min(cols-1,items.length-row*cols-1)-col;
        const baseX=reverse?760:240, dir=reverse?-1:1;
        points.push({c,phase,phaseIndex,x:baseX+dir*actualCol*92,y:y+54+row*44,order:points.length});
      });
      y+=88+(rows-1)*44;
    });
    const height=y+48, activePoint=points.find(p=>p.c.id===activeId), activeIndex=activePoint?.order??0;
    const segment=(a,b)=>{const dx=Math.max(34,Math.abs(b.x-a.x)*.45);const c1=a.x+(b.x>=a.x?dx:-dx),c2=b.x-(b.x>=a.x?dx:-dx);return `M ${a.x} ${a.y} C ${c1} ${a.y}, ${c2} ${b.y}, ${b.x} ${b.y}`};
    const paths=[];
    for(let i=1;i<points.length;i++) paths.push(`<path class="map-route ${points[i].order<=activeIndex?"passed":""}" d="${segment(points[i-1],points[i])}"/>`);
    const related=(activePoint?.c.related||[]).map(id=>points.find(p=>p.c.id===id)).filter(Boolean).map(p=>`<path class="relation-route" d="${segment(activePoint,p)}"/>`).join("");
    const visible=points.filter(p=>matches(p.c,q)).length;
    phaseMap.innerHTML=`<div class="route-field" style="height:${height}px">
      <div class="coordinate-note north">N<br><span>39.9042°</span></div><div class="coordinate-note east">E 116.4074°</div>
      <svg class="route-svg" viewBox="0 0 1000 ${height}" preserveAspectRatio="none" aria-hidden="true"><g>${paths.join("")}</g><g>${related}</g></svg>
      ${stageMarks.map(({phase,phaseIndex,x,y,reverse})=>`<div class="atlas-stage ${reverse?"right":""}" style="--phase:${phase.color};left:${x/10}%;top:${y}px"><span class="stage-mark">${stageIcon(phaseIndex)}<em>0${phaseIndex+1}</em></span><div><h2>${phase.name}</h2><p>${phase.desc}</p></div></div>`).join("")}
      ${points.map(p=>`<button class="atlas-node ${p.c.id===activeId?"active":""} ${p.c.derived?"derived":""} ${completed.has(p.c.id)?"completed":""} ${q&&!matches(p.c,q)?"filtered-out":""}" style="--phase:${p.phase.color};left:${p.x/10}%;top:${p.y}px" data-chapter="${p.c.id}" title="${escapeHtml(p.c.title)}"><span class="node-core"></span><span class="node-code">${p.c.no}</span><span class="node-title">${p.c.tags[0]}</span></button>`).join("")}
    </div>`;
    emptyState.hidden = visible > 0 || activeView !== "map";
  }

  function renderChapterList(filter="") {
    const q = filter.trim().toLowerCase();
    const items = chapters.filter(c => matches(c,q));
    chapterList.innerHTML = items.map(c => {
      const p=phaseById.get(c.phase);
      return `<button class="chapter-row" style="--phase:${p.color}" data-chapter="${c.id}">
        <span class="row-num">${completed.has(c.id)?"✓ ":""}${c.no}</span>
        <span><strong>${c.title}</strong><small>${escapeHtml(c.en)}</small></span>
        <span class="row-phase">${p.name}</span><time>${c.duration}</time>
      </button>`;
    }).join("");
    emptyState.hidden = items.length > 0 || activeView !== "chapters";
  }

  function renderGlossary(filter="") {
    const q=filter.trim().toLowerCase();
    const items=glossary.filter(([term,desc])=>!q || `${term} ${desc}`.toLowerCase().includes(q));
    glossaryList.innerHTML=items.map(([term,desc])=>`<section class="term"><h3>${term}</h3><p>${desc}</p></section>`).join("");
    emptyState.hidden = items.length > 0 || activeView !== "glossary";
  }

  function matches(c,q) {
    if(!q) return true;
    return [c.no,c.title,c.en,c.summary,...c.tags,...c.points.flatMap(p=>[p.title,p.detail])].join(" ").toLowerCase().includes(q);
  }

  function renderReader(id, scroll=true) {
    const c=byId.get(id) || chapters[0];
    const p=phaseById.get(c.phase);
    activeId=c.id;
    document.documentElement.style.setProperty("--active-phase",p.color);
    $("#breadcrumb").innerHTML=`<b style="color:${p.color}">${p.name}</b>　›　${c.no} ${c.title}`;
    readerContent.innerHTML=`<div class="reader-content" style="--phase:${p.color}">
      <h1 class="chapter-title">${c.title}</h1><p class="chapter-en">${escapeHtml(c.en)}</p>
      <div class="chapter-meta"><span>LESSON ${c.no}</span><span>${c.duration}</span><span>${c.derived?"TITLE-DERIVED":"EN SUBTITLE REVIEWED"}</span></div>
      <p class="chapter-summary">${c.summary}</p>
      ${c.derived?`<div class="source-warning"><strong>来源说明：</strong>本章目录中只有视频，没有 <code>en.srt</code>；本页内容仅依据标题提炼，不冒充逐字稿总结。</div>`:""}
      <section class="reader-section"><h2>核心知识点</h2>${c.points.map((pt,i)=>`<div class="knowledge-point"><span class="point-index">0${i+1}</span><div><h3>${pt.title}</h3><p>${pt.detail}</p></div></div>`).join("")}</section>
      <section class="reader-section"><h2>练习清单</h2><ul class="practice-list">${c.practice.map(x=>`<li>${x}</li>`).join("")}</ul></section>
      <section class="reader-section"><h2>常见误区</h2><ul class="pitfall-list">${c.pitfalls.map(x=>`<li>${x}</li>`).join("")}</ul></section>
      <section class="reader-section"><h2>关键词</h2><div class="tags">${c.tags.map(x=>`<span class="tag">${x}</span>`).join("")}</div></section>
      ${c.related.length?`<section class="reader-section"><h2>继续连接</h2><div class="related">${c.related.map(r=>{const rc=byId.get(r);return rc?`<button data-chapter="${rc.id}">${rc.no} · ${rc.title}</button>`:""}).join("")}</div></section>`:""}
      <button class="complete-button ${completed.has(c.id)?"done":""}" id="completeButton">${completed.has(c.id)?"✓ 已完成本章":"标记为已完成"}</button>
    </div>`;
    localStorage.setItem("amt-last",c.id);
    if(location.hash!==`#${c.id}`) history.replaceState(null,"",`#${c.id}`);
    if(scroll) reader.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    renderMap(searchInput.value); renderChapterList(searchInput.value); updateProgress(); updateNavButtons();
  }

  function updateNavButtons(){
    const i=chapters.findIndex(c=>c.id===activeId);
    $("#prevChapter").disabled=i<=0; $("#nextChapter").disabled=i>=chapters.length-1;
  }

  function updateProgress(){
    $("#completedCount").textContent=completed.size;
  }

  function setView(view){
    activeView=view;
    $$(".view").forEach(v=>v.classList.toggle("active",v.id===`${view}View`));
    $$(".nav-item").forEach(b=>{const on=b.dataset.view===view;b.classList.toggle("active",on);b.setAttribute("aria-pressed",on)});
    emptyState.hidden=true;
    const q=searchInput.value;
    if(view==="map")renderMap(q);if(view==="chapters")renderChapterList(q);if(view==="glossary")renderGlossary(q);
    atlas.scrollTo({top:0,behavior:"auto"});
  }

  function notify(message){
    toast.textContent=message; toast.classList.add("show"); clearTimeout(notify.timer); notify.timer=setTimeout(()=>toast.classList.remove("show"),2600);
  }

  document.addEventListener("click",e=>{
    const chapterButton=e.target.closest("[data-chapter]");
    if(chapterButton){renderReader(chapterButton.dataset.chapter);if(innerWidth<901)reader.scrollIntoView({behavior:"smooth"});return;}
    const nav=e.target.closest(".nav-item"); if(nav){setView(nav.dataset.view);return;}
    if(e.target.closest("#completeButton")){
      completed.has(activeId)?completed.delete(activeId):completed.add(activeId);
      localStorage.setItem(storageKey,JSON.stringify([...completed])); renderReader(activeId,false);
      notify(completed.has(activeId)?"进度已保存到本机":"已取消完成标记");
    }
  });

  searchInput.addEventListener("input",()=>{
    const q=searchInput.value; if(activeView==="map")renderMap(q); if(activeView==="chapters")renderChapterList(q); if(activeView==="glossary")renderGlossary(q);
  });
  document.addEventListener("keydown",e=>{
    if(e.key==="/" && document.activeElement!==searchInput){e.preventDefault();searchInput.focus();}
    if(e.key==="Escape" && document.activeElement===searchInput){searchInput.value="";searchInput.blur();searchInput.dispatchEvent(new Event("input"));}
  });
  $("#prevChapter").addEventListener("click",()=>{const i=chapters.findIndex(c=>c.id===activeId);if(i>0)renderReader(chapters[i-1].id)});
  $("#nextChapter").addEventListener("click",()=>{const i=chapters.findIndex(c=>c.id===activeId);if(i<chapters.length-1)renderReader(chapters[i+1].id)});
  $("#themeHint").addEventListener("click",()=>notify("学习顺序：语境 → 位置 → 订单流 → 执行 → 复盘。按 / 可快速搜索。"));
  $("#mobileMenu").addEventListener("click",e=>{const rail=$(".rail");const on=rail.classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",on)});
  addEventListener("hashchange",()=>{const id=location.hash.slice(1);if(byId.has(id)&&id!==activeId)renderReader(id)});

  $("#lessonCount").textContent=chapters.length;
  renderGlossary(); setView("map"); renderReader(activeId,false);
})();
