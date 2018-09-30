!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a(a.s=111)}({111:function(e,t,a){e.exports=a(112)},112:function(e,t){!function(e,t){e.rails!==t&&e.error("jquery-ujs has already been loaded!");var a=void 0,n=e(document);e.rails=a={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",buttonClickSelector:"button[data-remote], button[data-confirm]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]",linkDisableSelector:"a[data-disable-with]",buttonDisableSelector:"button[data-remote][data-disable-with]",CSRFProtection:function(t){var a=e('meta[name="csrf-token"]').attr("content");a&&t.setRequestHeader("X-CSRF-Token",a)},refreshCSRFTokens:function(){var t=e("meta[name=csrf-token]").attr("content"),a=e("meta[name=csrf-param]").attr("content");e('form input[name="'+a+'"]').val(t)},fire:function(t,a,n){var r=e.Event(a);return t.trigger(r,n),!1!==r.result},confirm:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return confirm(e)}),ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(n){var r=void 0,i=void 0,o=void 0,l=void 0,s=void 0,u=void 0,c=void 0,d=void 0;if(a.fire(n,"ajax:before")){if(s=(l=n.data("cross-domain"))===t?null:l,u=n.data("with-credentials")||null,c=n.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,n.is("form")){r=n.attr("method"),i=n.attr("action"),o=n.serializeArray();var m=n.data("ujs:submit-button");m&&(o.push(m),n.data("ujs:submit-button",null))}else n.is(a.inputChangeSelector)?(r=n.data("method"),i=n.data("url"),o=n.serialize(),n.data("params")&&(o=o+"&"+n.data("params"))):n.is(a.buttonClickSelector)?(r=n.data("method")||"get",i=n.data("url"),o=n.serialize(),n.data("params")&&(o=o+"&"+n.data("params"))):(r=n.data("method"),i=a.href(n),o=n.data("params")||null);return d={type:r||"GET",data:o,dataType:c,beforeSend:function(e,r){if(r.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+r.accepts.script),!a.fire(n,"ajax:beforeSend",[e,r]))return!1;n.trigger("ajax:send",e)},success:function(e,t,a){n.trigger("ajax:success",[e,t,a])},complete:function(e,t){n.trigger("ajax:complete",[e,t])},error:function(e,t,a){n.trigger("ajax:error",[e,t,a])},crossDomain:s},u&&(d.xhrFields={withCredentials:u}),i&&(d.url=i),a.ajax(d)}return!1},handleMethod:function(n){var r=a.href(n),i=n.data("method"),o=n.attr("target"),l=e("meta[name=csrf-token]").attr("content"),s=e("meta[name=csrf-param]").attr("content"),u=e('<form method="post" action="'+r+'"></form>'),c='<input name="_method" value="'+i+'" type="hidden" />';s!==t&&l!==t&&(c+='<input name="'+s+'" value="'+l+'" type="hidden" />'),o&&u.attr("target",o),u.hide().append(c).appendTo("body"),u.submit()},formElements:function(t,a){return t.is("form")?e(t[0].elements).filter(a):t.find(a)},disableFormElements:function(t){a.formElements(t,a.disableSelector).each(function(t,n){a.disableFormElement(e(n))})},disableFormElement:function(e){var t=e.is("button")?"html":"val";e.data("ujs:enable-with",e[t]()),e[t](e.data("disable-with")),e.prop("disabled",!0)},enableFormElements:function(t){a.formElements(t,a.enableSelector).each(function(t,n){a.enableFormElement(e(n))})},enableFormElement:function(e){var t=e.is("button")?"html":"val";e.data("ujs:enable-with")&&e[t](e.data("ujs:enable-with")),e.prop("disabled",!1)},allowAction:function(e){var t=e.data("confirm"),n=!1,r=void 0;return!t||(a.fire(e,"confirm")&&(n=a.confirm(t),r=a.fire(e,"confirm:complete",[n])),n&&r)},blankInputs:function(t,a,n){var r=e(),i=void 0,o=a||"input,textarea",l=t.find(o);return l.each(function(t,a){if(i=e(a),!(i.is("input[type=checkbox],input[type=radio]")?i.is(":checked"):i.val())==!n){if(i.is("input[type=radio]")&&l.filter('input[type=radio]:checked[name="'+i.attr("name")+'"]').length)return!0;r=r.add(i)}}),!!r.length&&r},nonBlankInputs:function(e,t){return a.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return a.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.removeData("ujs:enable-with")),e.unbind("click.railsDisable")}},a.fire(n,"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,n){e.crossDomain||a.CSRFProtection(n)}),n.delegate(a.linkDisableSelector,"ajax:complete",function(){a.enableElement(e(this))}),n.delegate(a.buttonDisableSelector,"ajax:complete",function(){a.enableFormElement(e(this))}),n.delegate(a.linkClickSelector,"click.rails",function(n){var r=e(this),i=r.data("method"),o=r.data("params"),l=n.metaKey||n.ctrlKey;if(!a.allowAction(r))return a.stopEverything(n);if(!l&&r.is(a.linkDisableSelector)&&a.disableElement(r),r.data("remote")!==t){if(l&&(!i||"GET"===i)&&!o)return!0;var s=a.handleRemote(r);return!1===s?a.enableElement(r):s.error(function(){a.enableElement(r)}),!1}return r.data("method")?(a.handleMethod(r),!1):void 0}),n.delegate(a.buttonClickSelector,"click.rails",function(t){var n=e(this);if(!a.allowAction(n))return a.stopEverything(t);n.is(a.buttonDisableSelector)&&a.disableFormElement(n);var r=a.handleRemote(n);return!1===r?a.enableFormElement(n):r.error(function(){a.enableFormElement(n)}),!1}),n.delegate(a.inputChangeSelector,"change.rails",function(t){var n=e(this);return a.allowAction(n)?(a.handleRemote(n),!1):a.stopEverything(t)}),n.delegate(a.formSubmitSelector,"submit.rails",function(n){var r=e(this),i=r.data("remote")!==t,o=void 0,l=void 0;if(!a.allowAction(r))return a.stopEverything(n);if(r.attr("novalidate")==t&&(o=a.blankInputs(r,a.requiredInputSelector))&&a.fire(r,"ajax:aborted:required",[o]))return a.stopEverything(n);if(i){if(l=a.nonBlankInputs(r,a.fileInputSelector)){setTimeout(function(){a.disableFormElements(r)},13);var s=a.fire(r,"ajax:aborted:file",[l]);return s||setTimeout(function(){a.enableFormElements(r)},13),s}return a.handleRemote(r),!1}setTimeout(function(){a.disableFormElements(r)},13)}),n.delegate(a.formInputClickSelector,"click.rails",function(t){var n=e(this);if(!a.allowAction(n))return a.stopEverything(t);var r=n.attr("name"),i=r?{name:r,value:n.val()}:null;n.closest("form").data("ujs:submit-button",i)}),n.delegate(a.formSubmitSelector,"ajax:send.rails",function(t){this==t.target&&a.disableFormElements(e(this))}),n.delegate(a.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&a.enableFormElements(e(this))}),e(function(){a.refreshCSRFTokens()}))}(jQuery),jQuery(document).ready(function(e){e(".editable").editable().on("hidden",function(t,a){var n=e(event.currentTarget).data("locale");if("save"===a&&e(event.currentTarget).removeClass("status-0").addClass("status-1"),"save"===a||"nochange"===a){var r=e(event.currentTarget).closest("tr").next().find(".editable.locale-"+n);setTimeout(function(){r.editable("show")},300)}}),e(".group-select").on("change",function(t){var a=e(t.currentTarget).val();window.location.href=a?route("translations.group.view")+e(t.currentTarget).val():route("translations.list")}),e("a.delete-key").click(function(t){t.preventDefault();var a=e(t.currentTarget).closest("tr"),n=e(t.currentTarget).attr("href"),r=a.attr("id");e.post(n,{id:r},function(){a.remove()})}),e(".form-import").on("ajax:success",function(t,a){e("div.success-import strong.counter").text(a.counter),e("div.success-import").slideDown()}),e(".form-find").on("ajax:success",function(t,a){e("div.success-find strong.counter").text(a.counter),e("div.success-find").slideDown()}),e(".form-publish").on("ajax:success",function(){e("div.success-publish").slideDown()})})}});