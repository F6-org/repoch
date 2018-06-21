import test from 'ava';
import { scheme, schemekk, weiboShare } from './navigation'

test('scheme', t => {
    t.is(scheme('http://www.baidu.com'),  'sinaweibo://browser?url=' + encodeURIComponent('http://www.baidu.com') )
});

test('schemekk', t => {
    t.is(schemekk('http://www.baidu.com'),  'sinaweibo://kk?url=' + encodeURIComponent('http://www.baidu.com') )
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});

test('weiboShare', async t => {
    // console.log(weiboShare('#测试内容#链接地址：http://www.weibo.com'))
    t.is(await bar, 'bar');
});