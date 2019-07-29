import vnode, {VNode} from './vnode';
import htmlDomApi, {DOMAPI} from './htmldomapi';

/**
 * 参数是要求一个真实的dom对象
 * @param node 原生node
 * @param domApi 提供的dom的api操作
 */
export function toVNode(node: Node, domApi?: DOMAPI): VNode {
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;
  let text: string;
  if (api.isElement(node)) {
    const id = node.id ? '#' + node.id : '';
    const cn = node.getAttribute('class');
    const c = cn ? '.' + cn.split(' ').join('.') : '';
    // sel 变成tagName+id+class的形式，比如<div id=id class=class></div>的sel的值就变成了div#id.class
    const sel = api.tagName(node).toLowerCase() + id + c;
    const attrs: any = {};// [属性]=值
    const children: Array<VNode> = [];
    let name: string;
    let i: number, n: number;
    const elmAttrs = node.attributes;
    const elmChildren = node.childNodes;
    // 循环 dom属性
    for (i = 0, n = elmAttrs.length; i < n; i++) {
      name = elmAttrs[i].nodeName;
      if (name !== 'id' && name !== 'class') {
        attrs[name] = elmAttrs[i].nodeValue;
      }
    }
    // 遍历子节点
    for (i = 0, n = elmChildren.length; i < n; i++) {
      children.push(toVNode(elmChildren[i], domApi));
    }
    return vnode(sel, {attrs}, children, undefined, node);
  } else if (api.isText(node)) {
    text = api.getTextContent(node) as string;
    return vnode(undefined, undefined, undefined, text, node);
  } else if (api.isComment(node)) {
    text = api.getTextContent(node) as string;
    return vnode('!', {}, [], text, node as any);
  } else {
    return vnode('', {}, [], undefined, node as any);
  }
}

export default toVNode;
