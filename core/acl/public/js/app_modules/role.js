!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="/",n(n.s=88)}({88:function(e,n,t){e.exports=t(89)},89:function(e,n){var t=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),r=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return t(e,[{key:"init",value:function(){$("#auto-checkboxes li").tree({onCheck:{node:"expand"},onUncheck:{node:"expand"},dnd:!1,selectable:!1}),$("#mainNode .checker").change(function(e){var n=$(e.currentTarget),t=n.attr("data-set"),r=n.is(":checked");$(t).each(function(e,n){r?$(n).attr("checked",!0):$(n).attr("checked",!1)})})}}]),e}();$(document).ready(function(){(new r).init()})}});