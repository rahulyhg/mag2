!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=106)}({106:function(e,t,r){e.exports=r(107)},107:function(e,t){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){"use strict";var t=function(t,r){this.options=r,e(t).rvMedia({multiple:!0,onSelectFiles:function(t,a){if(void 0!==t)switch(a.data("editor")){case"summernote":!function(t,r){if(0===r.length)return;for(var a=t.data("target"),n=0;n<r.length;n++)if("youtube"===r[n].type||"video"===r[n].type){var i=r[n].full_url;i=i.replace("watch?v=","embed/"),e(a).summernote("pasteHTML",'<iframe width="420" height="315" src="'+i+'" frameborder="0" allowfullscreen></iframe>')}else"image"===r[n].type?e(a).summernote("insertImage",r[n].full_url,r[n].basename):e(a).summernote("pasteHTML",'<a href="'+r[n].full_url+'">'+r[n].full_url+"</a>")}(a,t);break;case"wysihtml5":!function(e,t){if(0===t.length)return;for(var r="",a=0;a<t.length;a++)if("youtube"===t[a].type||"video"===t[a].type){var n=t[a].full_url;n=n.replace("watch?v=","embed/"),r+='<iframe width="420" height="315" src="'+n+'" frameborder="0" allowfullscreen></iframe>'}else"image"===t[a].type?r+='<img src="'+t[a].full_url+'">':r+='<a href="'+t[a].full_url+'">'+t[a].full_url+"</a>";if(e.getValue().length>0){var i=e.getValue();e.composer.commands.exec("insertHTML",r),e.getValue()===i&&e.setValue(e.getValue()+r)}else e.setValue(e.getValue()+r)}(e(r.target).data("wysihtml5").editor,t);break;case"ckeditor":!function(t,r){e.each(r,function(e,r){var a=r.full_url,n=t.data("target").replace("#","");"youtube"===r.type||"video"===r.type?(a=a.replace("watch?v=","embed/"),CKEDITOR.instances[n].insertHtml('<iframe width="420" height="315" src="'+a+'" frameborder="0" allowfullscreen></iframe>')):"image"===r.type?CKEDITOR.instances[n].insertHtml('<img src="'+a+'" alt="'+r.name+'" />'):CKEDITOR.instances[n].insertHtml('<a href="'+a+'">'+r.name+"</a>")})}(a,t);break;case"tinymce":!function(t){e.each(t,function(e,t){var r=t.url,a="";"youtube"===t.type||"video"===t.type?(r=r.replace("watch?v=","embed/"),a='<iframe width="420" height="315" src="'+r+'" frameborder="0" allowfullscreen></iframe>'):a="image"===t.type?'<img src="'+r+'" alt="'+t.name+'" />':'<a href="'+r+'">'+t.name+"</a>",tinymce.activeEditor.execCommand("mceInsertContent",!1,a)})}(t)}}})};function a(a){return this.each(function(){var n=e(this),i=n.data("bs.media"),o=e.extend({},n.data(),"object"===(void 0===a?"undefined":r(a))&&a);i||n.data("bs.media",i=new t(this,o))})}t.VERSION="1.1.0",e.fn.addMedia=a,e.fn.addMedia.Constructor=t,e(window).on("load",function(){e('[data-type="rv-media"]').each(function(){var t=e(this);a.call(t,t.data())})})}(jQuery)}});