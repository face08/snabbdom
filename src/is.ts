export const array = Array.isArray;
// 类型判断
export function primitive(s: any): s is (string | number) {
  return typeof s === 'string' || typeof s === 'number';
}
