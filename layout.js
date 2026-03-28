// ═══════════════════════════════════════
// KOVE — Shared Layout (included in all pages)
// ═══════════════════════════════════════
var SB_URL='https://votiamtckjctbidhuxap.supabase.co';
var SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdGlhbXRja2pjdGJpZGh1eGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzU3NDcsImV4cCI6MjA4OTUxMTc0N30.iOcJ51FsEj2qsv8G2UqBshFe5NGw9x1OUw57z9vvu0Q';
var sb=window.supabase.createClient(SB_URL,SB_KEY);
var KOVE_ADMIN_ID='';
var _user=null,_profile=null,_servers=[],_currentServer=null;
var COLORS=['#3ecfc6','#c8a84b','#7c6fe0','#f87171','#22c55e','#f97316','#ec4899','#06b6d4'];

function getColor(s){if(!s)return COLORS[0];var h=0;for(var i=0;i<s.length;i++)h=s.charCodeAt(i)+((h<<5)-h);return COLORS[Math.abs(h)%COLORS.length];}
function getLetter(n){return n?n.charAt(0).toUpperCase():'?';}
function timeStr(ts){return new Date(ts).toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'})+' م';}

// ── SVG ICONS ──
var ICONS={
  chat:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  friends:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  dm:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  servers:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  me:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',
  channel:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  settings:'<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  mic:'<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  plus:'<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  close:'<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check:'<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  search:'<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
};

// ── INIT SESSION ──
async function layoutInit(onReady){
  var {data:{session}}=await sb.auth.getSession();
  if(!session){window.location.href='login.html';return;}
  _user=session.user;
  var {data:p}=await sb.from('profiles').select('*').eq('id',_user.id).single();
  _profile=p;
  await _loadServers();
  _renderRail();
  _renderBottomNav();
  _updateUserBar();
  if(onReady) onReady();
}

async function _loadServers(){
  var {data}=await sb.from('server_members').select('server_id,servers(id,name,icon_url,owner_id)').eq('user_id',_user.id);
  _servers=(data||[]).map(function(d){return d.servers;}).filter(Boolean);
}

// ── RAIL ──
function _renderRail(){
  var rail=document.getElementById('rail');
  if(!rail) return;
  var page=window.location.pathname.split('/').pop()||'index.html';
  var inServer=!!_currentServer;

  rail.innerHTML='';

  // Logo
  var logo=document.createElement('a');
  logo.href='index.html';logo.className='r-logo';logo.title='الرئيسية';
  logo.innerHTML='<img src="img/file_000000008270720a8e1e80fd9d619876-removebg-preview (1).png" alt="Kove" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"/><span class="r-logo-fb">K</span>';
  rail.appendChild(logo);

  _sep(rail);

  // Home / Friends
  _railLink(rail,'home.html',ICONS.friends,'الأصدقاء',page==='home.html','teal');
  // DMs
  _railLink(rail,'dm.html',ICONS.dm,'الرسائل الخاصة',page==='dm.html','teal');
  // Me
  _railLink(rail,'profile.html',ICONS.me,'ملفي الشخصي',page==='profile.html');

  _sep(rail);

  // Servers
  var srvWrap=document.createElement('div');
  srvWrap.id='railSrvs';
  _servers.forEach(function(s){
    var ic=document.createElement('div');
    ic.className='r-ic'+((_currentServer&&_currentServer.id===s.id)?' act':'');
    ic.title=s.name;
    ic.textContent=getLetter(s.name);
    if(!(_currentServer&&_currentServer.id===s.id)){
      var col=getColor(s.name);
      ic.style.background=col+'22';ic.style.color=col;
    }
    ic.onclick=function(){window.location.href='app.html?server='+s.id;};
    srvWrap.appendChild(ic);
  });
  rail.appendChild(srvWrap);

  _sep(rail);

  // Add server
  var add=document.createElement('div');
  add.className='r-add';add.title='إضافة سيرفر';
  add.innerHTML=ICONS.plus;
  add.onclick=function(){window.location.href='create-server.html';};
  rail.appendChild(add);
}

function _railLink(parent,href,icon,title,isAct,colorClass){
  var a=document.createElement('a');
  a.href=href;a.className='r-ic'+(isAct?' act':'')+(colorClass?' '+colorClass:'');
  a.title=title;a.innerHTML=icon;
  parent.appendChild(a);
}

function _sep(parent){
  var d=document.createElement('div');d.className='r-sep';parent.appendChild(d);
}

// ── SIDEBAR ──
// inServer=true → show channels, inServer=false → show servers list
function _renderSidebar(inServer, channels, currentChannel, onChannelClick){
  var sb_hdr=document.getElementById('sidebarTitle');
  var list=document.getElementById('chList');
  if(!list) return;

  if(inServer && _currentServer){
    if(sb_hdr) sb_hdr.textContent=_currentServer.name;
    list.innerHTML='';
    if(!channels||channels.length===0){
      list.innerHTML='<div style="padding:16px;font-size:13px;color:var(--muted);text-align:center;">لا توجد قنوات</div>';
      return;
    }
    var cat=document.createElement('div');cat.className='ch-cat';cat.textContent='قنوات نصية';list.appendChild(cat);
    channels.forEach(function(ch){
      var row=document.createElement('div');
      row.className='ch-row'+(currentChannel&&currentChannel.id===ch.id?' act':'');
      row.innerHTML=ICONS.channel+ch.name;
      row.onclick=function(){if(onChannelClick)onChannelClick(ch);};
      list.appendChild(row);
    });
  } else {
    if(sb_hdr) sb_hdr.textContent='السيرفرات';
    list.innerHTML='';
    if(_servers.length===0){
      list.innerHTML='<div style="padding:16px;font-size:13px;color:var(--muted);text-align:center;">مفيش سيرفرات بعد</div>';
      return;
    }
    _servers.forEach(function(s){
      var col=getColor(s.name);
      var row=document.createElement('div');
      row.className='ch-row'+(_currentServer&&_currentServer.id===s.id?' act':'');
      row.innerHTML='<div style="width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,'+col+','+col+'99);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--bg);flex-shrink:0;">'+getLetter(s.name)+'</div>'+s.name;
      row.style.gap='10px';
      row.onclick=function(){window.location.href='app.html?server='+s.id;};
      list.appendChild(row);
    });
    // add server button
    var addRow=document.createElement('div');
    addRow.className='ch-row';
    addRow.style.color='var(--teal)';
    addRow.innerHTML=ICONS.plus+' إضافة سيرفر';
    addRow.onclick=function(){window.location.href='create-server.html';};
    list.appendChild(addRow);
  }
}

// ── USER BAR ──
function _updateUserBar(){
  if(!_profile) return;
  var col=getColor(_profile.name||_profile.username||'k');
  ['uavEl','dUav'].forEach(function(id){
    var el=document.getElementById(id);
    if(!el) return;
    el.style.background='linear-gradient(135deg,'+col+','+col+'aa)';
  });
  ['uavL','dUavL'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=getLetter(_profile.name);});
  ['uNameEl','dUname'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=_profile.name||'';});
  ['uTagEl','dUtag'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent='@'+(_profile.username||'');});
}

// ── BOTTOM NAV ──
function _renderBottomNav(){
  var nav=document.getElementById('bottomNav');
  if(!nav) return;
  var page=window.location.pathname.split('/').pop()||'';
  var items=[
    {icon:ICONS.chat,label:'الشات',href:'app.html',key:'app.html'},
    {icon:ICONS.friends,label:'الأصدقاء',href:'home.html',key:'home.html'},
    {icon:ICONS.dm,label:'DMs',href:'dm.html',key:'dm.html',dot:true},
    {icon:ICONS.servers,label:'السيرفرات',href:'#servers',key:'servers',drawer:true},
  ];
  nav.innerHTML='';
  items.forEach(function(item){
    var btn=document.createElement('button');
    btn.className='bnbtn'+(page===item.key?' act':'')+(item.dot?' bn-dot':'');
    btn.innerHTML=item.icon+'<span>'+item.label+'</span>';
    btn.onclick=function(){
      if(item.drawer){openDrw('srv');}
      else{window.location.href=item.href;}
    };
    nav.appendChild(btn);
  });
}

// ── DRAWERS ──
function openDrw(w){
  var ov=document.getElementById('ov');
  var drw=document.getElementById(w==='srv'?'dSrv':'dCh');
  if(ov) ov.classList.add('show');
  if(drw) drw.classList.add('open');
  if(w==='srv') _renderDrawerSrvs();
}
function closeDrws(){
  var ov=document.getElementById('ov');if(ov)ov.classList.remove('show');
  ['dSrv','dCh'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.remove('open');});
}
function _renderDrawerSrvs(){
  var el=document.getElementById('dSrvList');if(!el)return;
  el.innerHTML='';
  _servers.forEach(function(s){
    var col=getColor(s.name);
    var div=document.createElement('div');
    div.className='srv-item'+(_currentServer&&_currentServer.id===s.id?' act':'');
    div.innerHTML='<div class="srv-ic2" style="background:linear-gradient(135deg,'+col+','+col+'aa)">'+getLetter(s.name)+'</div><div><div class="srv-n2">'+s.name+'</div></div>';
    div.onclick=function(){window.location.href='app.html?server='+s.id;closeDrws();};
    el.appendChild(div);
  });
  var add=document.createElement('div');add.className='srv-add2';
  add.innerHTML='<div class="srv-add-ic">'+ICONS.plus+'</div><div><div class="srv-n2" style="color:var(--teal)">إضافة سيرفر</div></div>';
  add.onclick=function(){window.location.href='create-server.html';};
  el.appendChild(add);
}

// ── BADGES ──
function getBadges(uid,role,ownerOfSrv){
  var b='';
  if(uid===KOVE_ADMIN_ID&&KOVE_ADMIN_ID){
    b+='<span class="bdg bdg-kove"><svg width="8" height="8" viewBox="0 0 28 28" fill="none"><path d="M8 4L8 24M8 14L20 4M8 14L20 24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>Kove</span>';
  }
  if(ownerOfSrv){
    b+='<span class="bdg bdg-owner"><svg width="8" height="8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 16.8l-6.2 4.4 2.4-7.3L2 9.4h7.6z"/></svg>أونر</span>';
  } else if(role&&role.permissions&&(role.permissions.admin||role.permissions.manage_server)){
    b+='<span class="bdg bdg-admin"><svg width="8" height="8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>أدمن</span>';
  }
  return b;
}

// ── PERMISSIONS ──
function hasPerm(memberRole,p,isOwner){
  if(isOwner) return true;
  if(!memberRole||!memberRole.permissions) return false;
  var perms=memberRole.permissions;
  return perms.admin===true||perms[p]===true;
}
