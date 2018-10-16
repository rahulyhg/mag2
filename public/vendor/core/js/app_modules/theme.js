/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 105);
/******/ })
/************************************************************************/
/******/ ({

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(106);


/***/ }),

/***/ 106:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThemeManagement = function () {
    function ThemeManagement() {
        _classCallCheck(this, ThemeManagement);
    }

    _createClass(ThemeManagement, [{
        key: 'init',
        value: function init() {
            $(document).on('click', '.btn-trigger-active-theme', function (event) {
                event.preventDefault();
                var _self = $(event.currentTarget);
                _self.addClass('button-loading');

                $.ajax({
                    url: route('theme.active'),
                    data: {
                        'theme': _self.data('theme')
                    },
                    type: 'POST',
                    success: function success(data) {
                        if (data.error) {
                            Botble.showNotice('error', data.message);
                        } else {
                            Botble.showNotice('success', data.message);
                            window.location.reload();
                        }
                        _self.removeClass('button-loading');
                    },
                    error: function error(data) {
                        Botble.handleError(data);
                        _self.removeClass('button-loading');
                    }
                });
            });

            $(document).on('click', '.btn-trigger-remove-theme', function (event) {
                event.preventDefault();
                $('#confirm-remove-theme-button').data('theme', $(event.currentTarget).data('theme'));
                $('#remove-theme-modal').modal('show');
            });

            $(document).on('click', '#confirm-remove-theme-button', function (event) {
                event.preventDefault();
                var _self = $(event.currentTarget);
                _self.addClass('button-loading');

                $.ajax({
                    url: route('theme.remove', { theme: _self.data('theme') }),
                    type: 'POST',
                    success: function success(data) {
                        if (data.error) {
                            Botble.showNotice('error', data.message);
                        } else {
                            Botble.showNotice('success', data.message);
                            window.location.reload();
                        }
                        _self.removeClass('button-loading');
                        $('#remove-theme-modal').modal('hide');
                    },
                    error: function error(data) {
                        Botble.handleError(data);
                        _self.removeClass('button-loading');
                        $('#remove-theme-modal').modal('hide');
                    }
                });
            });
        }
    }]);

    return ThemeManagement;
}();

$(document).ready(function () {
    new ThemeManagement().init();
});

/***/ })

/******/ });