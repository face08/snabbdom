import h from "./h";
import {init} from "./snabbdom";
import classModule from "./modules/class";
import attributesModule from "./modules/attributes";
import datasetModule from "./modules/dataset";
import eventListenersModule from "./modules/eventlisteners";
import propsModule from "./modules/props";
import styleModule from "./modules/style";
import toVNode from "./tovnode";


var patch = init([attributesModule, classModule, datasetModule, eventListenersModule, propsModule, styleModule]);
var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
    h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
    ' and this is just normal text',
    ' ----分割线-------',
    h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);

// console.log(vnode);
var container = document.getElementById('container');
patch(container, vnode);

var html = toVNode(container);

var newVnode = h('div#container.two.classes', {on: {click: anotherEventHandler}}, [
    h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
    h('a', {props: {href: '/bar'}}, 'I\'ll take you places!'),
    ' and this is still just normal text',
    h('div', {style: {color: '#f00'}}, 'face'),
]);


function someFn() {
    console.log('someFn');
}

function anotherEventHandler() {
    console.log('anotherEventHandler');
}

patch(vnode, newVnode);
