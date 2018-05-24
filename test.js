import test from 'ava';
import { scheme , schemekk } from './navigation'
test('scheme', t => {
    console.log(scheme)
    t.is(scheme('http://www.baidu.com'),  'sinaweibo://browser?url=' + encodeURIComponent('http://www.baidu.com') )
});

test('schemekk', t => {
    t.is(schemekk('http://www.baidu.com'),  'sinaweibo://kk?url=' + encodeURIComponent('http://www.baidu.com') )
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});