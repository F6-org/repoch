#cookie相关操作

```javascript
import {setCookie, getCookie} from 'wbpay-repoch/cookie'

var PHPSESSID = getCookie('PHPSESSID')

setCookie('PHPSESSID', PHPSESSID + 1)

```
