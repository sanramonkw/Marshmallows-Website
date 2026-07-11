const h=document.getElementById("booking-widget");if(h){let $=function(){if(t.result){k.innerHTML="";return}k.innerHTML=Y.map((e,n)=>{const o=n+1,r=o===t.step,f=o<t.step;return`<li class="flex items-center gap-1 sm:gap-2">
          <span class="flex h-7 w-7 items-center justify-center rounded-full ${r?"bg-pink text-white":f?"bg-brown-deep text-white":"bg-pink-pale text-black/40"}">${o}</span>
          <span class="${r?"text-pink":"text-black/40"} hidden sm:inline">${a(s[e])}</span>
        </li>${o<5?'<li class="h-px w-3 bg-pink-pale sm:w-6" role="presentation"></li>':""}`}).join("")},H=function(){k.innerHTML="",l.innerHTML=`<p class="py-8 text-center text-lg leading-relaxed">${a(s.offline)}</p>`},C=function(){l.innerHTML=p(s.chooseBranch)+u()+'<div class="grid gap-4 sm:grid-cols-2">'+t.branches.map((e,n)=>`
        <button type="button" data-action="branch" data-i="${n}"
          class="rounded-2xl border-2 ${t.branch?.id===e.id?"border-pink bg-pink-card":"border-pink-pale bg-white"} p-6 text-start transition-all hover:border-pink hover:shadow-md">
          <span class="block text-lg font-bold text-ink">${a(e.name)||a(s.stepBranch)}</span>
          ${e.address?`<span class="mt-1 block text-sm text-black/50">${a(e.address)}</span>`:""}
        </button>`).join("")+"</div>"},E=function(){let e;t.category?e=p(t.category.name)+'<div class="grid gap-3 sm:grid-cols-2">'+t.category.services.map((n,o)=>`
          <button type="button" data-action="service" data-i="${o}"
            class="flex items-center justify-between gap-4 rounded-2xl border-2 ${t.service?.id===n.id?"border-pink bg-pink-card":"border-pink-pale bg-white"} p-4 text-start transition-all hover:border-pink hover:shadow-md">
            <span>
              <span class="block font-bold text-ink">${a(n.name)}</span>
              ${n.duration?`<span class="mt-1 block text-xs text-black/50">${n.duration} ${a(s.minutes)}</span>`:""}
            </span>
            <span class="shrink-0 font-bold text-brown-deep">${S(n.price)}</span>
          </button>`).join("")+`</div><div class="mt-6 text-center">${m("back-to-categories",s.backToCategories)}</div>`:e=p(s.chooseCategory)+'<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">'+t.categories.map((n,o)=>`
          <button type="button" data-action="category" data-i="${o}"
            class="rounded-2xl border-2 border-pink-pale bg-white p-6 text-start transition-all hover:border-pink hover:shadow-md">
            <span class="block font-bold text-ink">${a(n.name)}</span>
            <span class="mt-1 block text-sm text-black/50">${n.services.length} ${a(s.treatments)}</span>
          </button>`).join("")+"</div>",l.innerHTML=u()+e+(t.categories.length&&!t.category?`<div class="mt-8 text-center">${m("back")}</div>`:"")},N=function(){const e=new Date;e.setHours(0,0,0,0);const n=new Date(e);n.setDate(n.getDate()+t.maxAdvance);const o=new Date(t.month.y,t.month.m,1),r=new Date(t.month.y,t.month.m+1,0).getDate(),f=o.toLocaleDateString(x,{month:"long",year:"numeric"}),g=new Date(2026,5,28);let j="";for(let c=0;c<7;c++){const d=new Date(g);d.setDate(g.getDate()+c),j+=`<span class="text-xs font-bold text-black/40">${a(d.toLocaleDateString(x,{weekday:"narrow"}))}</span>`}let y="";for(let c=0;c<o.getDay();c++)y+="<span></span>";for(let c=1;c<=r;c++){const d=new Date(t.month.y,t.month.m,c),B=U(d),K=d<e||d>n||t.closedDays.includes(d.getDay()),Q=t.date===B;y+=K?`<span class="flex h-9 items-center justify-center rounded-lg text-sm text-black/25">${c}</span>`:`<button type="button" data-action="date" data-date="${B}"
              class="flex h-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${Q?"bg-pink text-white":"bg-pink-card text-ink hover:bg-pink-pale"}">${c}</button>`}const _=new Date(t.month.y,t.month.m+1,0)>e,G=new Date(t.month.y,t.month.m+1,1)<=n;return`
        <div class="mb-3 flex items-center justify-between">
          <button type="button" data-action="month" data-dir="-1" ${_?"":"disabled"}
            class="rounded-full px-3 py-1 font-bold text-pink disabled:opacity-25" aria-label="prev">&lsaquo;</button>
          <span class="font-bold text-ink">${a(f)}</span>
          <button type="button" data-action="month" data-dir="1" ${G?"":"disabled"}
            class="rounded-full px-3 py-1 font-bold text-pink disabled:opacity-25" aria-label="next">&rsaquo;</button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center" dir="ltr">${j}${y}</div>`},P=function(){return t.slotsLoading?L():t.date?!t.slots||t.slots.length===0?`<p class="py-8 text-center text-sm text-black/50">${a(s.noSlots)}</p>`:'<div class="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">'+t.slots.map(e=>`
        <button type="button" data-action="slot" data-time="${a(e)}"
          class="rounded-xl border-2 px-2 py-2 text-sm font-bold transition-colors ${t.time===e?"border-brown-deep bg-brown-deep text-white":"border-pink-pale bg-white text-ink hover:border-brown-deep"}">${a(I(e))}</button>`).join("")+"</div>":`<p class="py-8 text-center text-sm text-black/50">${a(s.pickDateFirst)}</p>`},A=function(){const e=t.branch?.staffSelect&&t.staff.length?`<label class="mb-4 block">
              <span class="mb-1 block text-sm font-bold text-ink">${a(s.specialist)}</span>
              <select data-action="staff" class="w-full rounded-xl border-2 border-pink-pale bg-white p-3">
                <option value="any" ${t.staffId==="any"?"selected":""}>${a(s.noPreference)}</option>
                ${t.staff.map(n=>`<option value="${a(n.id)}" ${t.staffId===n.id?"selected":""}>${a(n.name)}</option>`).join("")}
              </select>
            </label>`:"";l.innerHTML=p(s.pickDate)+u()+e+`<div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl bg-pink-card/60 p-4">${N()}</div>
          <div>
            <h3 class="mb-3 text-center font-bold text-ink">${a(s.availableSlots)}</h3>
            ${P()}
          </div>
        </div>
        <div class="mt-8 flex items-center justify-center gap-4">
          ${m("back")}
          <button type="button" data-action="to-details" ${t.time?"":"disabled"}
            class="rounded-full bg-pink px-8 py-2 font-bold text-white transition-colors hover:bg-brown-deep disabled:cursor-not-allowed disabled:opacity-40">${a(s.next)}</button>
        </div>`},q=function(){l.innerHTML=p(s.yourDetails)+u()+`<form id="bw-form" class="mx-auto max-w-md space-y-4" novalidate>
          <label class="block">
            <span class="mb-1 block text-sm font-bold text-ink">${a(s.fullName)} *</span>
            <input name="name" type="text" required value="${a(t.customer.name)}"
              class="w-full rounded-xl border-2 border-pink-pale bg-white p-3 focus:border-pink focus:outline-none" />
          </label>
          <label class="block">
            <span class="mb-1 block text-sm font-bold text-ink">${a(s.phone)} *</span>
            <input name="phone" type="tel" dir="ltr" required value="${a(t.customer.phone)}"
              placeholder="+965 …"
              class="w-full rounded-xl border-2 border-pink-pale bg-white p-3 text-start focus:border-pink focus:outline-none" />
          </label>
          <label class="block">
            <span class="mb-1 block text-sm font-bold text-ink">${a(s.email)}</span>
            <input name="email" type="email" dir="ltr" value="${a(t.customer.email)}"
              class="w-full rounded-xl border-2 border-pink-pale bg-white p-3 text-start focus:border-pink focus:outline-none" />
          </label>
          <div class="flex items-center justify-center gap-4 pt-2">
            ${m("back")}
            <button type="submit" class="rounded-full bg-pink px-8 py-2 font-bold text-white transition-colors hover:bg-brown-deep">${a(s.next)}</button>
          </div>
        </form>`},F=function(){const e=t.staffId==="any"?s.noPreference:t.staff.find(o=>o.id===t.staffId)?.name||s.noPreference,n=(o,r)=>`
        <div class="flex items-start justify-between gap-4 border-b border-pink-pale/60 py-3 last:border-0">
          <span class="text-sm font-bold text-black/50">${a(o)}</span>
          <span class="text-end font-bold text-ink">${r}</span>
        </div>`;l.innerHTML=p(s.confirmTitle)+u()+`<div class="mx-auto max-w-md rounded-2xl bg-pink-card/60 p-6">
          ${n(s.branch,a(t.branch?.name||""))}
          ${n(s.service,a(t.service?.name||""))}
          ${n(s.specialist,a(e))}
          ${n(s.dateTime,`${a(O(t.date))}<br/><span dir="ltr">${a(I(t.time))}</span>`)}
          ${n(s.customer,`${a(t.customer.name)}<br/><span dir="ltr">${a(t.customer.phone)}</span>`)}
          ${n(s.total,a(S(t.service?.price||0)))}
        </div>
        <p class="mx-auto mt-4 max-w-md text-center text-sm text-black/60">${a(s.payAtSalon)}</p>
        <div class="mt-8 flex items-center justify-center gap-4">
          ${m("back")}
          <button type="button" data-action="book" ${t.submitting?"disabled":""}
            class="rounded-full bg-pink px-8 py-3 font-bold text-white transition-colors hover:bg-brown-deep disabled:opacity-50">
            ${a(t.submitting?s.submitting:s.confirmBook)}</button>
        </div>`},R=function(){$(),l.innerHTML=`
        <div class="py-8 text-center">
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brown-deep text-3xl text-white">&#10003;</div>
          <h2 class="mb-3 text-2xl font-bold text-ink">${a(s.successTitle)}</h2>
          <p class="mx-auto max-w-md leading-relaxed text-black/70">${a(s.successMsg)}</p>
          ${t.result?.orderId?`<p class="mt-4 font-bold text-brown-deep">${a(s.successRef)}: <span dir="ltr">${a(t.result.orderId)}</span></p>`:""}
          <button type="button" data-action="restart"
            class="mt-8 rounded-full bg-pink px-8 py-3 font-bold text-white transition-colors hover:bg-brown-deep">${a(s.bookAnother)}</button>
        </div>`},i=function(){if($(),t.result)return R();switch(t.step){case 1:return C();case 2:return E();case 3:return A();case 4:return q();case 5:return F()}};const v=JSON.parse(document.getElementById("bw-config").textContent||"{}"),s=v.strings||{},w=v.locale||"ar",x=w==="ar"?"ar":"en",k=document.getElementById("bw-steps"),l=document.getElementById("bw-body"),t={step:1,branches:[],branch:null,categories:[],category:null,service:null,staff:[],staffId:"any",closedDays:[],maxAdvance:30,month:{y:new Date().getFullYear(),m:new Date().getMonth()},date:"",slots:null,slotsLoading:!1,time:"",customer:{name:"",phone:"",email:""},submitting:!1,error:"",result:null},a=e=>String(e??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),D=e=>String(e).padStart(2,"0"),U=e=>`${e.getFullYear()}-${D(e.getMonth()+1)}-${D(e.getDate())}`,S=e=>`${Number.isInteger(e)?e:e.toFixed(2)} ${s.kd}`,I=e=>w==="ar"?e.replace(/\bAM\b/g,s.am).replace(/\bPM\b/g,s.pm):e,O=e=>{const[n,o,r]=e.split("-").map(Number);return new Date(n,o-1,r).toLocaleDateString(x,{weekday:"long",year:"numeric",month:"long",day:"numeric"})};async function b(e,n){const o=await fetch(`/api/salonist${e.replace(/^\/([a-z]+)/,"/$1/")}`,n),r=await o.json().catch(()=>null);if(!o.ok||!r||r.ok!==!0)throw new Error(r&&r.error||`http_${o.status}`);return r}const Y=["stepBranch","stepService","stepTime","stepDetails","stepConfirm"],p=e=>`<h2 class="mb-6 text-center text-xl font-bold text-ink">${a(e)}</h2>`,m=(e,n=s.back)=>`<button type="button" data-action="${e}" class="rounded-full border border-pink px-6 py-2 font-bold text-pink transition-colors hover:bg-pink-pale">${a(n)}</button>`,u=()=>t.error?`<p class="mb-4 rounded-xl bg-pink-card p-3 text-center text-sm font-bold text-pink">${a(t.error)}</p>`:"",L=()=>`<p class="py-12 text-center text-black/50">${a(s.loading)}</p>`;async function T(){if(!(!t.date||!t.branch||!t.service)){t.slotsLoading=!0,t.slots=null,t.time="",i();try{const e=new URLSearchParams({branch:t.branch.id,service:t.service.id,date:t.date,staff:t.staffId,duration:String(t.service.duration||"")}),n=await b(`/slots?${e}`);t.slots=n.slots}catch{t.slots=[]}t.slotsLoading=!1,i()}}async function M(e){t.branch=e,t.category=null,t.service=null,t.error="",l.innerHTML=L();try{const[n,o]=await Promise.all([b(`/services?branch=${encodeURIComponent(e.id)}`),b(`/hours?branch=${encodeURIComponent(e.id)}`).catch(()=>null)]);t.categories=n.categories,o&&(t.closedDays=o.closedDays||[],t.maxAdvance=o.maxAdvance||30),t.step=2}catch{t.error=s.errorMsg,t.step=1}i()}async function J(e){if(t.service=e,t.staff=[],t.staffId="any",t.date="",t.slots=null,t.time="",t.error="",t.month={y:new Date().getFullYear(),m:new Date().getMonth()},t.step=3,i(),t.branch?.staffSelect)try{const n=await b(`/staff?branch=${encodeURIComponent(t.branch.id)}&service=${encodeURIComponent(e.id)}`);t.staff=n.staff,t.step===3&&i()}catch{}}async function z(){if(!(t.submitting||!t.branch||!t.service)){t.submitting=!0,t.error="",i();try{const e=await b("/book",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({branchId:t.branch.id,service:{id:t.service.id,name:t.service.name,price:t.service.price},staffId:t.staffId,date:t.date,time:t.time,customer:t.customer})});t.result={orderId:e.orderId||""}}catch{t.error=s.errorMsg}t.submitting=!1,i()}}h.addEventListener("click",e=>{const n=e.target.closest("[data-action]");if(!n||n.hasAttribute("disabled"))return;const o=n.dataset.action,r=Number(n.dataset.i??-1);switch(o){case"branch":M(t.branches[r]);break;case"category":t.category=t.categories[r],i();break;case"back-to-categories":t.category=null,i();break;case"service":t.category&&J(t.category.services[r]);break;case"month":{const f=Number(n.dataset.dir),g=t.month.m+f;t.month={y:t.month.y+Math.floor(g/12),m:(g%12+12)%12},i();break}case"date":t.date=n.dataset.date,T();break;case"slot":t.time=n.dataset.time,i();break;case"to-details":t.time&&(t.step=4,t.error="",i());break;case"book":z();break;case"restart":t.result=null,t.category=null,t.service=null,t.date="",t.slots=null,t.time="",t.error="",t.step=t.branches.length>1?1:2,i();break;case"back":t.error="",t.step===2?t.step=1:t.step>2&&(t.step-=1),i();break}}),h.addEventListener("change",e=>{const n=e.target;n.matches('[data-action="staff"]')&&(t.staffId=n.value,t.date&&T())}),h.addEventListener("submit",e=>{const n=e.target;if(n.id!=="bw-form")return;e.preventDefault();const o=new FormData(n);t.customer={name:String(o.get("name")||"").trim(),phone:String(o.get("phone")||"").trim(),email:String(o.get("email")||"").trim()},t.customer.name.length<2?t.error=s.nameInvalid:/^\+?[0-9\s-]{7,15}$/.test(t.customer.phone)?(t.error="",t.step=5):t.error=s.phoneInvalid,i()}),(async()=>{try{const e=await b("/branches");t.branches=e.branches,t.branches.length===1?await M(t.branches[0]):i()}catch{H()}})()}
