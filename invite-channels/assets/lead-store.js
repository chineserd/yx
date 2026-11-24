(() => {
const key='chineserd-invite-standalone-scan-leads-v1';const defaults=[{id:'REG20261029001',parentName:'陈女士',phone:'+852 6123 2186',age:'6–8 歲',needs:'希望提升中文口語表達',inviter:'HKC108625',inviterName:'测试',poster:'暑假中文陪学',posterId:1,time:'2026-10-29 09:26',status:'待跟进',note:''},{id:'REG20261027002',parentName:'李先生',phone:'+852 9123 3062',age:'3–5 歲',needs:'想了解識字課程',inviter:'HKC108625',inviterName:'测试',poster:'认字课',posterId:5,time:'2026-10-27 14:18',status:'跟进中',note:'已介绍课程安排，家长希望周末联系。'},{id:'REG20261022003',parentName:'林女士',phone:'+852 6123 7520',age:'9–12 歲',needs:'加強閱讀與寫作',inviter:'HKC107276',inviterName:'黄钰莹',poster:'阅读写作',posterId:6,time:'2026-10-22 11:08',status:'已联系',note:'已通过 WhatsApp 联系，等待家长回复。'}];
const statuses=['新线索','跟进中','释放线索','无效','已报名','已试堂','静默'];
function normalize(row){
 const prior=row.legacyFollowStatus||row.status;
 const status=statuses.includes(row.status)?row.status:({'待跟进':'新线索','已联系':'跟进中'}[row.status]||'');
 return {...row,status,...(prior!==status?{legacyFollowStatus:prior}:{})};
}
function readAll(){try{const data=JSON.parse(localStorage.getItem(key));return (Array.isArray(data)?data:defaults).map(normalize);}catch{return defaults.map(normalize)}}
function writeAll(rows){localStorage.setItem(key,JSON.stringify(rows));window.dispatchEvent(new Event('leads-updated'));}
function read(){return readAll().filter(r=>r.origin!=='manual')}
function write(rows){writeAll([...rows,...readAll().filter(r=>r.origin==='manual')])}
function add(row){const rows=read();rows.unshift(row);write(rows)}

// One-time refresh of QA-only fixtures; never rewrite subsequent registrations.
const fixtureVersion='chineserd-invite-standalone-scan-leads-fixtures-20261029';
if(!localStorage.getItem(fixtureVersion)){
 const rows=read();let index=0;
 const names=['何女士','周先生','郑女士','梁女士','许先生','吴女士'];
 const phones=['6382 7194','9275 4638','5619 8247','6843 9521','9176 3285','5328 6419'];
 for(const row of rows){
  if(['测试家长','演示家长'].includes(row.parentName)&&/^\+852\s*0{8}$/.test(row.phone)){
   row.parentName=names[index%names.length];row.phone='+852 '+phones[index%phones.length];index++;
  }
 }
 localStorage.setItem(key,JSON.stringify(rows));
 localStorage.setItem(fixtureVersion,'1');
}
// Stable November review fixtures. Preserve any follow-up edits on subsequent loads.
const novemberSamples=[
 ['Facebook','方女士','2026-11-02 09:12','qr'],
 ['Instagram','罗先生','2026-11-02 10:35','link'],
 ['朋友圈','程女士','2026-11-02 11:20','qr'],
 ['WhatsApp','杨先生','2026-11-02 14:08','link'],
 ['保存','杜女士','2026-11-02 15:40','qr'],
 ['WhatsApp','周女士','2026-11-02 17:26','qr'],
 ['Facebook','林先生','2026-11-02 18:15','link']
];
const existing=readAll();
const samples=novemberSamples.map(([channel,parentName,time,entry],i)=>({
 id:'DEMO-CHANNEL-1102-'+i,parentName,time,channel,entry,phone:'+852 5600 810'+i,
 age:i%2?'6–8 歲':'3–5 歲',needs:i%2?'了解识字课程':'提升中文口语',
 inviter:i%2?'HKC107276':'HKC108625',inviterName:i%2?'黄钰莹':'测试',
 posterId:i%2?5:1,poster:i%2?'认字课':'暑假中文陪学',status:'新线索',note:''
})).filter(sample=>!existing.some(row=>row.id===sample.id));
if(samples.length)writeAll([...samples,...existing]);
window.ScanLeads={key,read,write,readAll,writeAll,add,statuses};})();