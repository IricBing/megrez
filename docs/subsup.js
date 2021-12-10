/** 上下角标支持 */
function subsup(hook, vm) {
  hook.beforeEach(function (content) {
    return content.replace(/\~(\w)+\~/g, match => `<sub>${match.substring(1, match.length - 1)}</sub>`);
  });
  hook.afterEach(function (html, next) {
    next(html.replace(/\^(\w)+\^/g, match => `<sup>${match.substring(1, match.length - 1)}</sup>`));
  });
}
