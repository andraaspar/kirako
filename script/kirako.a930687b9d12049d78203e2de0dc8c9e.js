/// <reference path='IAJAXSettingsBeforeSendFunction.ts'/>
/// <reference path='IAJAXSettingsCompleteFunction.ts'/>
/// <reference path='IAJAXSettingsContentsObject.ts'/>
/// <reference path='IAJAXSettingsDataFilterFunction.ts'/>
/// <reference path='IAJAXSettingsXHRFunction.ts'/>
/// <reference path='IXHRDoneFunction.ts'/>
/// <reference path='IXHRFailFunction.ts'/>
/// <reference path='IAJAXTransportCompleteFunction.ts'/>
/// <reference path='IAJAXTransportObject.ts'/>
/// <reference path='ICSSHookObject.ts'/>
/// <reference path='IEvent.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IAnimationOptions.ts'/>
/// <reference path='ITween.ts'/>
/// <reference path='IAnimationDoneFunction.ts'/>
/// <reference path='IAnimationProgressFunction.ts'/>
/// <reference path='IAnimationStartFunction.ts'/>
/// <reference path='IAnimationStepFunction.ts'/>
/// <reference path='ISpecialEasingObject.ts'/>
/// <reference path='IPositionObject.ts'/>
/// <reference path='IEvent.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IAddClassFunction.ts'/>
/// <reference path='IAJAXCompleteFunction.ts'/>
/// <reference path='IAJAXErrorFunction.ts'/>
/// <reference path='IAJAXSuccessFunction.ts'/>
/// <reference path='IAnimationOptions.ts'/>
/// <reference path='IAppendFunction.ts'/>
/// <reference path='IAttrFunction.ts'/>
/// <reference path='IClassToggleFunction.ts'/>
/// <reference path='ICSSFunction.ts'/>
/// <reference path='ICSSObject.ts'/>
/// <reference path='IEachFunction.ts'/>
/// <reference path='IHTMLFunction.ts'/>
/// <reference path='IIsFunction.ts'/>
/// <reference path='ILoadCompleteFunction.ts'/>
/// <reference path='IOffsetFunction.ts'/>
/// <reference path='IOnEventsObject.ts'/>
/// <reference path='IQueueCallbackFunction.ts'/>
/// <reference path='IReplaceWithFunction.ts'/>
/// <reference path='ISizeFunction.ts'/>
/// <reference path='ITextFunction.ts'/>
/// <reference path='IValFunction.ts'/>
/// <reference path='IWidthFunction.ts'/>
/// <reference path='IWrapFunction.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IStaticEventSpecialHandleObject.ts'/>
/// <reference path='IStaticEventSpecialSetupFunction.ts'/>
/// <reference path='IStaticEventSpecialTeardownFunction.ts'/>
/// <reference path='IStaticEventSpecialAddFunction.ts'/>
/// <reference path='IStaticEventSpecialAddFunction.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IStaticEventSpecialObject.ts'/>
/// <reference path='IStaticEventSpecial.ts'/>
/// <reference path='IXHRAlwaysFunction.ts'/>
/// <reference path='IXHRDoneFunction.ts'/>
/// <reference path='IXHRFailFunction.ts'/>
/// <reference path='IAJAXSettings.ts'/>
/// <reference path='IAJAXPrefilterFunction.ts'/>
/// <reference path='IAJAXTransportHandler.ts'/>
/// <reference path='ICallbacks.ts'/>
/// <reference path='ICSSHooksObject.ts'/>
/// <reference path='IDeferred.ts'/>
/// <reference path='IDeferredBeforeStartFunction.ts'/>
/// <reference path='IEachFunction.ts'/>
/// <reference path='IEachPropertyFunction.ts'/>
/// <reference path='IEventConstructor.ts'/>
/// <reference path='IFXObject.ts'/>
/// <reference path='IGetSuccessFunction.ts'/>
/// <reference path='IGrepFunction.ts'/>
/// <reference path='IInstance.ts'/>
/// <reference path='IMapFunction.ts'/>
/// <reference path='IStaticEvent.ts'/>
/// <reference path='IXHR.ts'/>
var illa;
(function (illa) {
    /**
     * A reference to the global object.
     * This is the window in a browser, and the global in node.
     */
    illa.GLOBAL = (function () {
        return this;
    })();
    illa.classByType = (function () {
        var classes = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
        var result = {};
        for (var i = 0, n = classes.length; i < n; i++) {
            result['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
        }
        return result;
    })();
    /**
     * Returns true if the value is a string primitive.
     */
    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;
    /**
     * Returns true if the value is a boolean primitive.
     */
    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;
    /**
     * Returns true if the value is a number primitive.
     */
    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;
    /**
     * Returns true if the value is a function.
     */
    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;
    /**
     * Returns true if the value is an array.
     * Array subclasses are not recognized as arrays.
     */
    function isArray(v) {
        return illa.getType(v) == 'array';
    }
    illa.isArray = isArray;
    if (Array.isArray)
        illa.isArray = Array.isArray;
    /**
     * Returns true if the value is undefined.
     */
    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;
    /**
     * Returns true if the value is null.
     */
    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;
    /**
     * Returns true if the value is undefined or null.
     */
    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;
    /**
     * Returns true if the value is an object and not null. Includes functions.
     */
    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;
    /**
     * Returns the type of value.
     */
    function getType(v) {
        var result = '';
        if (v == null) {
            result = v + '';
        }
        else {
            result = typeof v;
            if (result == 'object' || result == 'function') {
                result = illa.classByType[illa.classByType.toString.call(v)] || 'object';
            }
        }
        return result;
    }
    illa.getType = getType;
    /**
     * Returns the value if ‘instanceof’ is true for the given constructor.
     */
    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;
    /**
     * Binds a function to a ‘this’ context.
     * No argument binding allows us to keep function type safety.
     */
    function bind(fn, obj) {
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    illa.bind = bind;
    /**
     * Binds a function to a ‘this’ context, and also prepends the specified arguments
     * This is not type safe because of argument binding.
     */
    function partial(fn, obj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    }
    illa.partial = partial;
    if (Function.prototype.bind) {
        illa.bind = illa.partial = function (fn, obj) {
            return fn.call.apply(fn.bind, arguments);
        };
    }
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
var illa;
(function (illa) {
    var Log = (function () {
        function Log() {
        }
        Log.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.log) {
                if (console.log.apply) {
                    console.log.apply(console, args);
                }
                else {
                    console.log(args.join(' '));
                }
            }
        };
        Log.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.info) {
                if (console.info.apply) {
                    console.info.apply(console, args);
                }
                else {
                    console.info(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.warn) {
                if (console.warn.apply) {
                    console.warn.apply(console, args);
                }
                else {
                    console.warn(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.error) {
                if (console.error.apply) {
                    console.error.apply(console, args);
                }
                else {
                    console.error(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.logIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.log.apply(this, [test].concat(args));
            }
        };
        Log.infoIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.info.apply(this, [test].concat(args));
            }
        };
        Log.warnIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.warn.apply(this, [test].concat(args));
            }
        };
        Log.errorIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.error.apply(this, [test].concat(args));
            }
        };
        return Log;
    })();
    illa.Log = Log;
})(illa || (illa = {}));
var kirako;
(function (kirako) {
    var presenter;
    (function (presenter) {
        var ScreenData = (function () {
            function ScreenData() {
            }
            ScreenData.prototype.equals = function (other) {
                for (var i in this) {
                    if (this.hasOwnProperty(i)) {
                        if (illa.isArray(this[i])) {
                            if (this[i].join() != other[i].join())
                                return false;
                        }
                        else {
                            if (this[i] != other[i])
                                return false;
                        }
                    }
                }
                return true;
            };
            return ScreenData;
        })();
        presenter.ScreenData = ScreenData;
    })(presenter = kirako.presenter || (kirako.presenter = {}));
})(kirako || (kirako = {}));
var kirako;
(function (kirako) {
    var model;
    (function (model) {
        var Kirako = (function () {
            function Kirako() {
                this.version = 1;
            }
            return Kirako;
        })();
        model.Kirako = Kirako;
    })(model = kirako.model || (kirako.model = {}));
})(kirako || (kirako = {}));
/// <reference path='../presenter/ScreenData.ts'/>
/// <reference path='Kirako.ts'/>
var kirako;
(function (kirako) {
    var model;
    (function (model) {
        var Solver = (function () {
            function Solver() {
                this.brush = ' ';
                this.color = 'black';
                this.background = 'white';
                this.palette = ['White', 'Gray', 'Black', 'Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink', 'LightPink', 'HotPink', 'DeepPink', 'PaleVioletRed', 'MediumVioletRed', 'LightSalmon', 'Salmon', 'DarkSalmon', 'LightCoral', 'IndianRed', 'Crimson', 'FireBrick', 'DarkRed', 'Red', 'OrangeRed', 'Tomato', 'Coral', 'DarkOrange', 'Orange', 'Yellow', 'LightYellow', 'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Khaki', 'DarkKhaki', 'Gold', 'Cornsilk', 'BlanchedAlmond', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan', 'RosyBrown', 'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'DarkOliveGreen', 'Olive', 'OliveDrab', 'YellowGreen', 'LimeGreen', 'Lime', 'LawnGreen', 'Chartreuse', 'GreenYellow', 'SpringGreen', 'MediumSpringGreen', 'LightGreen', 'PaleGreen', 'DarkSeaGreen', 'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'MediumAquamarine', 'Aqua', 'Cyan', 'LightCyan', 'PaleTurquoise', 'Aquamarine', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'LightSteelBlue', 'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue', 'DeepSkyBlue', 'DodgerBlue', 'CornflowerBlue', 'SteelBlue', 'RoyalBlue', 'Blue', 'MediumBlue', 'DarkBlue', 'Navy', 'MidnightBlue', 'Lavender', 'Thistle', 'Plum', 'Violet', 'Orchid', 'Fuchsia', 'Magenta', 'MediumOrchid', 'MediumPurple', 'BlueViolet', 'DarkViolet', 'DarkOrchid', 'DarkMagenta', 'Purple', 'Indigo', 'DarkSlateBlue', 'RebeccaPurple', 'SlateBlue', 'MediumSlateBlue', 'White', 'MistyRose', 'Gainsboro', 'LightGrey', 'Silver', 'DarkGray', 'Gray', 'DimGray', 'LightSlateGray', 'SlateGray', 'DarkSlateGray', 'Black'];
                this.makeNewKirako();
                this.load();
                this.brushes = [' '];
                for (var i = 0; i < 95; i++) {
                    this.brushes.push(String.fromCharCode(0xe000 + i));
                }
                this.brush = this.brushes[1];
            }
            Solver.prototype.makeNewKirako = function () {
                this.kirako = new model.Kirako();
                this.kirako.name = 'kirako';
                this.kirako.pieces = [];
                this.kirako.colors = [];
                this.kirako.backgrounds = [];
                for (var lineId = 0; lineId < 25; lineId++) {
                    var line = [];
                    var colorsLine = [];
                    var backgroundsLine = [];
                    for (var charId = 0; charId < 40; charId++) {
                        line.push(' ');
                        colorsLine.push('black');
                        backgroundsLine.push('white');
                    }
                    this.kirako.pieces.push(line);
                    this.kirako.colors.push(colorsLine);
                    this.kirako.backgrounds.push(backgroundsLine);
                }
            };
            Solver.prototype.setStartCharId = function (value) {
                this.startCharId = value;
            };
            Solver.prototype.setEndCharId = function (value) {
                this.endCharId = Math.max(this.startCharId, value);
                this.startCharId = Math.min(this.startCharId, value);
            };
            Solver.prototype.setStartLineId = function (value) {
                this.startLineId = value;
            };
            Solver.prototype.setEndLineId = function (value) {
                this.endLineId = Math.max(this.startLineId, value);
                this.startLineId = Math.min(this.startLineId, value);
            };
            Solver.prototype.paint = function () {
                for (var lineId = this.startLineId; lineId <= this.endLineId; lineId++) {
                    for (var charId = this.startCharId; charId <= this.endCharId; charId++) {
                        this.kirako.pieces[lineId][charId] = this.brush;
                        this.kirako.colors[lineId][charId] = this.color;
                        this.kirako.backgrounds[lineId][charId] = this.background;
                    }
                }
            };
            Solver.prototype.setBrush = function (value) {
                this.brush = value;
            };
            Solver.prototype.setColor = function (value) {
                this.color = value;
            };
            Solver.prototype.setBackground = function (value) {
                this.background = value;
            };
            Solver.prototype.getScreenData = function () {
                var result = new kirako.presenter.ScreenData();
                result.pieces = this.kirako.pieces.slice(0);
                result.colors = this.kirako.colors.slice(0);
                result.backgrounds = this.kirako.backgrounds.slice(0);
                result.brushes = this.brushes.slice(0);
                result.palette = this.palette.slice(0);
                result.brush = this.brush;
                result.color = this.color;
                result.background = this.background;
                result.startCharId = this.startCharId;
                result.endCharId = this.endCharId;
                result.startLineId = this.startLineId;
                result.endLineId = this.endLineId;
                return result;
            };
            Solver.prototype.save = function () {
                localStorage.setItem('saved', JSON.stringify(this.kirako));
            };
            Solver.prototype.load = function () {
                var loaded = JSON.parse(localStorage.getItem('saved'));
                if (loaded && loaded.version == 1) {
                    this.kirako = loaded;
                }
            };
            Solver.prototype.shiftLeft = function () {
                for (var lineId = 0, lineCount = this.kirako.pieces.length; lineId < lineCount; lineId++) {
                    this.kirako.pieces[lineId].push(this.kirako.pieces[lineId].shift());
                    this.kirako.colors[lineId].push(this.kirako.colors[lineId].shift());
                    this.kirako.backgrounds[lineId].push(this.kirako.backgrounds[lineId].shift());
                }
            };
            Solver.prototype.shiftRight = function () {
                for (var lineId = 0, lineCount = this.kirako.pieces.length; lineId < lineCount; lineId++) {
                    this.kirako.pieces[lineId].unshift(this.kirako.pieces[lineId].pop());
                    this.kirako.colors[lineId].unshift(this.kirako.colors[lineId].pop());
                    this.kirako.backgrounds[lineId].unshift(this.kirako.backgrounds[lineId].pop());
                }
            };
            Solver.prototype.shiftUp = function () {
                this.kirako.pieces.push(this.kirako.pieces.shift());
                this.kirako.colors.push(this.kirako.colors.shift());
                this.kirako.backgrounds.push(this.kirako.backgrounds.shift());
            };
            Solver.prototype.shiftDown = function () {
                this.kirako.pieces.unshift(this.kirako.pieces.pop());
                this.kirako.colors.unshift(this.kirako.colors.pop());
                this.kirako.backgrounds.unshift(this.kirako.backgrounds.pop());
            };
            return Solver;
        })();
        model.Solver = Solver;
    })(model = kirako.model || (kirako.model = {}));
})(kirako || (kirako = {}));
var kirako;
(function (kirako) {
    var presenter;
    (function (presenter) {
        var ScreenPresenter = (function () {
            function ScreenPresenter() {
                this.solver = kirako.Main.getSolver();
                this.screen = kirako.Main.getScreen();
                this.onKirakoMouseMoveBound = illa.bind(this.onKirakoMouseMove, this);
                this.onKirakoMouseUpBound = illa.bind(this.onKirakoMouseUp, this);
                this.screen.kirako.on('mousedown', illa.bind(this.onKirakoMouseDown, this));
                this.screen.brushes.on('click', illa.bind(this.onBrushClicked, this));
                this.screen.palette.on('click', illa.bind(this.onPaletteClicked, this));
                this.screen.palette.on('contextmenu', illa.bind(this.onPaletteContextMenuClicked, this));
                jQuery(document).on('contextmenu', function (e) {
                    e.preventDefault();
                });
                jQuery(document).on('keydown', illa.bind(this.onKeyDown, this));
                this.render();
            }
            ScreenPresenter.prototype.render = function (force) {
                if (force === void 0) { force = false; }
                var data = this.solver.getScreenData();
                if (!force && this.lastData && this.lastData.equals(data)) {
                    return;
                }
                this.screen.kirako.width(32 * data.pieces[0].length);
                this.screen.kirako.height(32 * data.pieces.length);
                var kirakoArrkup = [];
                for (var lineId = 0, lineCount = data.pieces.length; lineId < lineCount; lineId++) {
                    for (var charId = 0, charCount = data.pieces[lineId].length; charId < charCount; charId++) {
                        var isSelected = lineId >= data.startLineId && lineId <= data.endLineId && charId >= data.startCharId && charId <= data.endCharId;
                        kirakoArrkup.push(['span', { 'class': isSelected ? 'ko-selected' : '', style: 'color: ' + data.colors[lineId][charId] + '; background: ' + data.backgrounds[lineId][charId], 'data-char-id': charId, 'data-line-id': lineId }, data.pieces[lineId][charId]]);
                    }
                    kirakoArrkup.push('\n');
                }
                this.screen.kirako.html(illa.Arrkup.createString(kirakoArrkup));
                var brushesArrkup = [];
                for (var brushId = 0, brushCount = data.brushes.length; brushId < brushCount; brushId++) {
                    var brush = data.brushes[brushId];
                    var isSelected = brush == data.brush;
                    brushesArrkup.push(['span', { 'class': isSelected ? 'ko-selected' : '', style: 'color: ' + data.color + '; background: ' + data.background, 'data-brush': brush }, brush]);
                    if (brushId % 2 == 1)
                        brushesArrkup.push(['br/']);
                }
                this.screen.brushes.html(illa.Arrkup.createString(brushesArrkup));
                var paletteArrkup = [];
                for (var colorId = 0, colorCount = data.palette.length; colorId < colorCount; colorId++) {
                    var color = data.palette[colorId];
                    paletteArrkup.push(['span', { style: 'background-color: ' + color, 'data-color': color }]);
                    if (colorId % 2 == 1)
                        paletteArrkup.push(['br/']);
                }
                this.screen.palette.html(illa.Arrkup.createString(paletteArrkup));
                this.lastData = data;
            };
            ScreenPresenter.prototype.onKirakoMouseDown = function (e) {
                e.preventDefault();
                this.screen.kirako.on('mousemove', this.onKirakoMouseMoveBound);
                jQuery(document).on('mouseup', this.onKirakoMouseUpBound);
                var piece = this.getClosestPiece(e.target);
                var charId = this.selectStartCharId = this.getPieceCharId(piece);
                var lineId = this.selectStartLineId = this.getPieceLineId(piece);
                this.solver.setStartCharId(charId);
                this.solver.setStartLineId(lineId);
                this.solver.setEndCharId(charId);
                this.solver.setEndLineId(lineId);
                this.render();
            };
            ScreenPresenter.prototype.onKirakoMouseMove = function (e) {
                e.preventDefault();
                var piece = this.getClosestPiece(e.target);
                this.solver.setStartCharId(this.selectStartCharId);
                this.solver.setStartLineId(this.selectStartLineId);
                this.solver.setEndCharId(this.getPieceCharId(piece));
                this.solver.setEndLineId(this.getPieceLineId(piece));
                this.render();
            };
            ScreenPresenter.prototype.onKirakoMouseUp = function (e) {
                e.preventDefault();
                if (e.which == 3) {
                    var prevBrush = this.lastData.brush;
                    this.solver.setBrush(' ');
                    this.solver.paint();
                    this.solver.setBrush(prevBrush);
                }
                else {
                    this.solver.paint();
                }
                this.solver.setStartCharId(-1);
                this.solver.setEndCharId(-1);
                this.solver.setStartLineId(-1);
                this.solver.setEndLineId(-1);
                this.render();
                this.screen.kirako.off('mousemove', this.onKirakoMouseMoveBound);
                jQuery(document).off('mouseup', this.onKirakoMouseUpBound);
                this.solver.save();
            };
            ScreenPresenter.prototype.getClosestPiece = function (target) {
                return jQuery(target).closest('[data-char-id]');
            };
            ScreenPresenter.prototype.getPieceCharId = function (piece) {
                var result = 0;
                if (piece) {
                    result = parseInt(piece.data('char-id'));
                }
                return result;
            };
            ScreenPresenter.prototype.getPieceLineId = function (piece) {
                var result = 0;
                if (piece) {
                    result = parseInt(piece.data('line-id'));
                }
                return result;
            };
            ScreenPresenter.prototype.onBrushClicked = function (e) {
                e.preventDefault();
                this.solver.setBrush(jQuery(e.target).closest('[data-brush]').data('brush'));
                this.render();
            };
            ScreenPresenter.prototype.onPaletteClicked = function (e) {
                e.preventDefault();
                this.solver.setColor(jQuery(e.target).closest('[data-color]').data('color'));
                this.render();
            };
            ScreenPresenter.prototype.onPaletteContextMenuClicked = function (e) {
                e.preventDefault();
                this.solver.setBackground(jQuery(e.target).closest('[data-color]').data('color'));
                this.render();
            };
            ScreenPresenter.prototype.onKeyDown = function (e) {
                var needRender = false;
                switch (e.which) {
                    case 37:
                        this.solver.shiftLeft();
                        needRender = true;
                        break;
                    case 38:
                        this.solver.shiftUp();
                        needRender = true;
                        break;
                    case 39:
                        this.solver.shiftRight();
                        needRender = true;
                        break;
                    case 40:
                        this.solver.shiftDown();
                        needRender = true;
                        break;
                }
                if (needRender) {
                    e.preventDefault();
                    this.render(true);
                }
            };
            return ScreenPresenter;
        })();
        presenter.ScreenPresenter = ScreenPresenter;
    })(presenter = kirako.presenter || (kirako.presenter = {}));
})(kirako || (kirako = {}));
var illa;
(function (illa) {
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        NumberUtil.toStringNoLetters = function (num) {
            var result = '';
            if (!isNaN(num) && isFinite(num)) {
                if (Math.abs(num) < 1.0) {
                    var e = parseInt(num.toString().split('e-')[1]);
                    if (e) {
                        num *= Math.pow(10, e - 1);
                        result = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
                    }
                    else {
                        result = num + '';
                    }
                }
                else {
                    var e = parseInt(num.toString().split('+')[1]);
                    if (e > 20) {
                        e -= 20;
                        num /= Math.pow(10, e);
                        result = num + (new Array(e + 1)).join('0');
                    }
                    else {
                        result = num + '';
                    }
                }
            }
            return result;
        };
        return NumberUtil;
    })();
    illa.NumberUtil = NumberUtil;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.escapeHTML = function (str) {
            return str.replace(/[&<>"']/g, function (s) {
                return StringUtil.CHAR_TO_HTML[s];
            });
        };
        StringUtil.castNicely = function (str) {
            return str == null ? '' : String(str);
        };
        StringUtil.trim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        StringUtil.escapeRegExp = function (str) {
            return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        StringUtil.CHAR_TO_HTML = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;' // IE8 does not support &apos;
        };
        return StringUtil;
    })();
    illa.StringUtil = StringUtil;
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
/// <reference path='NumberUtil.ts'/>
/// <reference path='StringUtil.ts'/>
var illa;
(function (illa) {
    var Arrkup = (function () {
        function Arrkup(source, allowRaw) {
            if (allowRaw === void 0) { allowRaw = true; }
            this.source = source;
            this.allowRaw = allowRaw;
        }
        Arrkup.prototype.createString = function () {
            return this.processArrkup(this.getSource());
        };
        Arrkup.prototype.processArrkup = function (source) {
            var result = '';
            if (illa.isArray(source)) {
                var sourceArr = source;
                if (illa.isString(sourceArr[0])) {
                    result = this.processTag(sourceArr);
                }
                else if (illa.isArray(sourceArr[0])) {
                    result = this.processGroup(sourceArr);
                }
                else if (illa.isNull(sourceArr[0])) {
                    if (this.getAllowRaw()) {
                        result = this.processRaw(sourceArr);
                    }
                }
            }
            else {
                result = this.processNonArrkup(source);
            }
            return result;
        };
        Arrkup.prototype.processTag = function (source) {
            var tagName = source[0];
            var isSelfClosing = tagName.charAt(tagName.length - 1) == '/';
            if (isSelfClosing)
                tagName = tagName.slice(0, -1);
            var result = '<' + tagName;
            var hasAttributes = illa.isObjectNotNull(source[1]) && !illa.isArray(source[1]);
            if (hasAttributes)
                result += this.processAttributes(source[1]);
            var contentIndex = hasAttributes ? 2 : 1;
            if (isSelfClosing) {
                result += '/>';
            }
            else {
                result += '>';
                result += this.processChildren(source, contentIndex);
                result += '</' + tagName + '>';
            }
            return result;
        };
        Arrkup.prototype.processGroup = function (source) {
            return this.processChildren(source, 0);
        };
        Arrkup.prototype.processRaw = function (source) {
            var result = '';
            for (var i = 1, n = source.length; i < n; i++) {
                result += source[i] + '';
            }
            return result;
        };
        Arrkup.prototype.processNonArrkup = function (source) {
            return illa.StringUtil.escapeHTML(source + '');
        };
        Arrkup.prototype.processAttributes = function (rawProps) {
            var result = '';
            for (var prop in rawProps) {
                if (rawProps.hasOwnProperty(prop)) {
                    result += this.processAttribute(prop, rawProps[prop]);
                }
            }
            return result;
        };
        Arrkup.prototype.processAttribute = function (key, value) {
            var result = '';
            if (key) {
                if (illa.isNumber(value)) {
                    value = illa.NumberUtil.toStringNoLetters(value);
                }
                if (illa.isString(value)) {
                    result = ' ' + key + '="' + illa.StringUtil.escapeHTML(value) + '"';
                }
                else if (illa.isBoolean(value)) {
                    if (value) {
                        result += ' ' + key;
                    }
                }
            }
            return result;
        };
        Arrkup.prototype.processChildren = function (rawChildren, startIndex) {
            var result = '';
            for (var i = startIndex, n = rawChildren.length; i < n; i++) {
                result += this.processArrkup(rawChildren[i]);
            }
            return result;
        };
        Arrkup.prototype.getSource = function () {
            return this.source;
        };
        Arrkup.prototype.setSource = function (value) {
            this.source = value;
        };
        Arrkup.prototype.getAllowRaw = function () {
            return this.allowRaw;
        };
        Arrkup.prototype.setAllowRaw = function (flag) {
            this.allowRaw = flag;
        };
        Arrkup.createString = function (source, allowRaw) {
            if (allowRaw === void 0) { allowRaw = true; }
            return new Arrkup(source, allowRaw).createString();
        };
        return Arrkup;
    })();
    illa.Arrkup = Arrkup;
})(illa || (illa = {}));
/// <reference path='IEventCallback.ts'/>
var illa;
(function (illa) {
    var EventCallbackReg = (function () {
        function EventCallbackReg(callback, thisObj) {
            this.callback = callback;
            this.thisObj = thisObj;
        }
        return EventCallbackReg;
    })();
    illa.EventCallbackReg = EventCallbackReg;
})(illa || (illa = {}));
/// <reference path='IEventCallback.ts'/>
/// <reference path='EventCallbackReg.ts'/>
/// <reference path='IEventHandler.ts'/>
var illa;
(function (illa) {
    var EventHandler = (function () {
        function EventHandler() {
            this.callbacksByType = {};
        }
        EventHandler.prototype.getCallbackRegsByType = function (type) {
            var result = this.callbacksByType[type];
            if (!illa.isArray(result))
                result = [];
            return result;
        };
        EventHandler.prototype.getEventParent = function () {
            return null;
        };
        EventHandler.prototype.addEventCallback = function (type, cb, thisObj) {
            var reg = new illa.EventCallbackReg(cb, thisObj);
            if (illa.isArray(this.callbacksByType[type])) {
                this.removeEventCallback(type, cb, thisObj);
                this.callbacksByType[type].push(reg);
            }
            else {
                this.callbacksByType[type] = [reg];
            }
        };
        EventHandler.prototype.removeEventCallback = function (type, cb, thisObj) {
            var callbacks = this.callbacksByType[type];
            if (illa.isArray(callbacks)) {
                for (var i = 0, n = callbacks.length; i < n; i++) {
                    var callback = callbacks[i];
                    if (callback.callback === cb && callback.thisObj === thisObj) {
                        callbacks.splice(i, 1);
                        break;
                    }
                }
            }
        };
        EventHandler.prototype.removeAllEventCallbacks = function () {
            this.callbacksByType = {};
        };
        return EventHandler;
    })();
    illa.EventHandler = EventHandler;
})(illa || (illa = {}));
/// <reference path='../../lib/illa/EventHandler.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='../../lib/jQuery.d.ts'/>
var berek;
(function (berek) {
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(jq) {
            _super.call(this);
            this.isDestroyed = false;
            this.jQuery = jq;
            this.jQuery.data(Widget.JQUERY_DATA_KEY, this);
            if (!(Widget.EVENT_DESTROYED in jQuery.event.special)) {
                jQuery.event.special[Widget.EVENT_DESTROYED] = {
                    remove: function (o) {
                        if (o.handler) {
                            o.handler(null);
                        }
                    }
                };
            }
            this.jQuery.on(Widget.EVENT_DESTROYED, illa.bind(this.onDestroyed, this));
        }
        Widget.prototype.getJQuery = function () {
            return this.jQuery;
        };
        Widget.prototype.getIsDestroyed = function () {
            return this.isDestroyed;
        };
        Widget.prototype.onDestroyed = function (e) {
            this.isDestroyed = true;
            this.removeAllEventCallbacks();
        };
        Widget.getFrom = function (source) {
            var result = null;
            if (source) {
                var stored = source.data(Widget.JQUERY_DATA_KEY);
                if (stored instanceof Widget) {
                    result = stored;
                }
            }
            return result;
        };
        Widget.JQUERY_DATA_KEY = 'berek_Widget';
        Widget.EVENT_DESTROYED = 'berek_Widget_EVENT_DESTROYED';
        return Widget;
    })(illa.EventHandler);
    berek.Widget = Widget;
})(berek || (berek = {}));
/// <reference path='../../../lib/berek/Widget.ts'/>
var kirako;
(function (kirako) {
    var view;
    (function (view) {
        var Widget = (function (_super) {
            __extends(Widget, _super);
            function Widget() {
                _super.apply(this, arguments);
            }
            Widget.prototype.initJqs = function () {
                var widgetsJq = this.getJQuery().find('[data-name]');
                for (var i = 0; i < widgetsJq.length; i++) {
                    var widgetJq = widgetsJq.eq(i);
                    var widgetName = widgetJq.data('name') + '';
                    this[widgetName] = widgetJq;
                }
            };
            return Widget;
        })(berek.Widget);
        view.Widget = Widget;
    })(view = kirako.view || (kirako.view = {}));
})(kirako || (kirako = {}));
/// <reference path='../../../lib/illa/Arrkup.ts'/>
/// <reference path='Widget.ts'/>
var kirako;
(function (kirako) {
    var view;
    (function (view) {
        var Screen = (function (_super) {
            __extends(Screen, _super);
            function Screen(jq) {
                _super.call(this, jq);
                this.getJQuery().html(illa.Arrkup.createString([
                    ['div', { 'class': 'ko-brushes', 'data-name': 'brushes' }],
                    ['div', { 'class': 'ko-palette', 'data-name': 'palette' }],
                    ['div', { 'class': 'ko-kirako-wrapper' }, ['div', { 'class': 'ko-kirako', 'data-name': 'kirako' }],]
                ]));
                this.initJqs();
            }
            return Screen;
        })(view.Widget);
        view.Screen = Screen;
    })(view = kirako.view || (kirako.view = {}));
})(kirako || (kirako = {}));
/// <reference path='../../lib/jQuery.d.ts'/>
/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='model/Solver.ts'/>
/// <reference path='presenter/ScreenPresenter.ts'/>
/// <reference path='view/Screen.ts'/>
var kirako;
(function (kirako) {
    var Main = (function () {
        function Main() {
            jQuery(illa.bind(this.onDomLoaded, this));
        }
        Main.prototype.onDomLoaded = function () {
            this.solver = new kirako.model.Solver();
            this.screen = new kirako.view.Screen(jQuery('body'));
            this.screenPresenter = new kirako.presenter.ScreenPresenter();
        };
        Main.getSolver = function () {
            return this.instance.solver;
        };
        Main.getScreen = function () {
            return this.instance.screen;
        };
        Main.getScreenPresenter = function () {
            return this.instance.screenPresenter;
        };
        Main.instance = new Main();
        return Main;
    })();
    kirako.Main = Main;
})(kirako || (kirako = {}));
