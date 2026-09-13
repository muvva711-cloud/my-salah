const SOURCES=[
  {name:'UK Visas and Immigration',url:'https://www.gov.uk/search/news-and-communications.atom?keywords=visa'},
  {name:'UK Foreign Office',url:'https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=foreign-commonwealth-development-office&keywords=travel'},
  {name:'European Commission',url:'https://ec.europa.eu/commission/presscorner/api/rss?language=en'}
];
const decode=s=>String(s||'').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const grab=(xml,tag)=>{const m=xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,'i'));return decode(m?.[1])};
function parse(xml,source){
  const blocks=xml.match(/<(entry|item)(?:\s[^>]*)?>[\s\S]*?<\/\1>/gi)||[];
  return blocks.slice(0,12).map(b=>{
    const link=(b.match(/<link[^>]+href=["']([^"']+)/i)||[])[1]||grab(b,'link')||'#';
    const title=grab(b,'title'),summary=grab(b,'summary')||grab(b,'description')||'Rasmiy manbadagi yangilik.';
    const date=grab(b,'updated')||grab(b,'published')||grab(b,'pubDate')||new Date().toISOString();
    return {id:Buffer.from(`${source}:${title}`).toString('base64url').slice(0,40),title,summary:summary.slice(0,360),source,date,url:link};
  }).filter(x=>x.title&&/(visa|travel|consul|passport|border|immigration|schengen|entry|touris)/i.test(`${x.title} ${x.summary}`));
}
export default async function handler(req,res){
  const settled=await Promise.allSettled(SOURCES.map(async s=>{const r=await fetch(s.url,{headers:{'user-agent':'MySalah/1.0'}});if(!r.ok)throw Error(`${s.name}: ${r.status}`);return parse(await r.text(),s.name)}));
  const items=settled.flatMap(x=>x.status==='fulfilled'?x.value:[]).sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,30);
  res.setHeader('Cache-Control','s-maxage=21600, stale-while-revalidate=86400');
  res.status(200).json({updatedAt:new Date().toISOString(),items:items.length?items:[{id:'official-portals',title:'Rasmiy viza portallarini kuzatish',summary:'Avtomatik lenta vaqtincha ma’lumot topmadi. Yangilikni rasmiy manbadan tekshiring.',source:'My Salah',date:new Date().toISOString(),url:'https://www.gov.uk/browse/visas-immigration'}]});
}
