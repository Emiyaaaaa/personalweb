import re
import requests

inputUrlList = ['https://www.bilibili.com/BV1u441117KA','https://vc.bilibili.com/mobile/detail?vc=2538442']

for inputUrl in inputUrlList:
	inputUrl = inputUrl.split('?',1)[0]
	inputUrl = inputUrl.split('/')[-1]
	videoNum = re.search(r'(\d+)', inputUrl, re.I)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}

a = {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"Accept-Encoding": "gzip, deflate, br",
"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7",
"Cache-Control": "no-cache",
"Connection": "keep-alive",
"Cookie": "buvid3=FE36A45F-2B96-4CBC-AE3E-C06DC4B5B030110242infoc; LIVE_BUVID=AUTO4415610056052857; sid=9ychn1fj; CURRENT_FNVAL=16; stardustvideo=1; rpdid=|(k|~luuYu|R0J'ulYu||l~|R; im_notify_type_11008681=0; fts=1562037271; balh_server_inner=https://www.biliplus.com; im_seqno_11008681=2888; im_local_unread_11008681=0; _uuid=D8E8A810-C676-5C18-CF1A-D593834ABAA264956infoc; LIVE_PLAYER_TYPE=1; laboratory=1-1; CURRENT_QUALITY=116; DedeUserID=11008681; DedeUserID__ckMd5=fbc32e38f8380c13; SESSDATA=13464c23%2C1600361966%2C9bccb*31; bili_jct=666e0327c3e52aa19011695b9f887114; Hm_lvt_8dabccb80a103a16cdfecde99700b220=1584965390; INTVER=1; _dfcaptcha=0ac8526f282676bbc949b0a36627af9f; bp_t_offset_11008681=369936506854245787; PVID=1",
"DNT": "1",
"Host": "vc.bilibili.com",
"Pragma": "no-cache",
"Sec-Fetch-Dest": "document",
"Sec-Fetch-Mode": "navigate",
"Sec-Fetch-Site": "none",
"Sec-Fetch-User": "?1",
"Upgrade-Insecure-Requests": "1",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"}


url = inputUrlList[0]
# print(requests.get(url,headers=headers).content.decode('utf-8'))

print(re.search('\d','https://live.bilibili.com/2708183',re.M | re.I).group(0))