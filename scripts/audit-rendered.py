import json,pathlib,urllib.request,urllib.error,urllib.parse,xml.etree.ElementTree as ET,os
BASE_URL=os.environ.get("SEO_AUDIT_BASE_URL","http://127.0.0.1:3001").rstrip("/")
API_URL=os.environ.get("SEO_AUDIT_API_URL","http://127.0.0.1:8000").rstrip("/")
FRONTEND=pathlib.Path(__file__).resolve().parent.parent
from html.parser import HTMLParser
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.h1=0;self.main=0;self.rows=0;self.text=[];self.ignore=0
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='a' and a.get('href'):self.links.append(a['href'])
  if t=='h1':self.h1+=1
  if t=='main':self.main+=1
  if t=='tr':self.rows+=1
  if t in ['script','style']:self.ignore+=1
 def handle_endtag(self,t):
  if t in ['script','style']:self.ignore=max(0,self.ignore-1)
 def handle_data(self,d):
  if not self.ignore:self.text.append(d)
root=FRONTEND/'src/app';static={'/'}|{'/'+p.parent.relative_to(root).as_posix() for p in root.rglob('page.js') if '[' not in str(p) and p.parent!=root}
cat=json.load(urllib.request.urlopen(API_URL+'/api/seo/slugs',timeout=30))
allowed=static|{'/colleges/'+x['slug'] for x in cat['institutes']}|{'/branches/'+x['slug'] for x in cat['branches']}
allowed|={'/colleges/'+x.get('instituteSlug',x.get('institute_slug'))+'/'+x.get('branchSlug',x.get('branch_slug')) for x in cat['cutoffs']}
for path in sorted(static):
 with urllib.request.urlopen(BASE_URL+path,timeout=60) as r:p=Page();p.feed(r.read().decode())
 assert p.h1==1 and p.main==1,(path,p.h1,p.main)
 for link in p.links:
  parsed=urllib.parse.urlsplit(link)
  if parsed.netloc and parsed.netloc not in ['rankmatrix.in','www.rankmatrix.in']:continue
  if not parsed.netloc and not link.startswith('/'):continue
  target=urllib.parse.unquote(parsed.path).rstrip('/') or '/'
  assert target in allowed,(path,'unknown internal target',target)
 if path in ['/colleges','/branches']:
  assert p.rows>=26,(path,'missing SSR table',p.rows)
  assert 'No results match' not in ''.join(p.text),(path,'false empty state')
 print(path,'PASS links, h1, landmark'+(', initial table rows' if path in ['/colleges','/branches'] else ''))
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
xml=ET.parse(FRONTEND/'public/sitemap-0.xml');urls=[e.text for e in xml.findall('.//s:loc',ns)]
assert len(urls)==len(set(urls))
for url in urls:
 parsed=urllib.parse.urlsplit(url);assert parsed.netloc=='www.rankmatrix.in';assert (parsed.path.rstrip('/') or '/') in allowed,url
assert len(urls)==len(allowed),(len(urls),len(allowed))
print('Sitemap:',len(urls),'unique valid routes; every catalogue route included')
for path in ['/this-page-does-not-exist','/colleges/not-a-real-institute','/colleges/not-a-real-institute/not-a-real-branch']:
 req=urllib.request.Request(BASE_URL+path,headers={'User-Agent':'Googlebot'})
 try:urllib.request.urlopen(req,timeout=60);raise AssertionError((path,'expected404'))
 except urllib.error.HTTPError as e:
  assert e.code==404,(path,e.code);body=e.read().decode();assert 'noindex' in body;print(path,'PASS 404 and noindex')
