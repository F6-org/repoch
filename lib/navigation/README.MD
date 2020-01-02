#url,跳转相关操作

```javascript
import {  scheme, schemekk, navigationCloseAndOpen, weiboShare, generateUrl, openUserProfile} from 'wbpay-repoch/navigation'

window.location.href = scheme('http://www.weibo.com')
window.location.href=  schemekk('http://www.weibo.com')//kk打开也页面

openUserProfile(192123333)//打开用户profile页面，端外可用
navigationCloseAndOpen(url)//关闭当前页面并打开新的webview

weiboShare('文案 #话题# @用户' , 'c0184b30gy1ft18w53zu3j20ru0fowjr')
weiboShare('文案 #话题# @用户' , ['c0184b30gy1ft18w53zu3j20ru0fowjr','c0184b30gy1ft18w53zu3j20ru0fowjr'])

/*
 * 生成目标页地址
 * 用于保留当前页面url query
 * 
 * @params url[string] 目标页url
 * @params addition[object] 增加字段
 * @params reserve[string/array] 保留query
 * 
 * @return url[string]
 */
//假设当前页面地址： http://www.weibo.com?a=1&b=2&c=3
window.location.href = generateUrl('/newpage', {add: 'test'}, ['a','c'])//http://www.weibo.com/newpage?a=1&c=3&add=test
```
