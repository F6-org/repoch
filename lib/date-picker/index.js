'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _select = require('@repoch/select');

var _select2 = _interopRequireDefault(_select);

var _date2 = require('@repoch/format/date');

var _date3 = _interopRequireDefault(_date2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  date: string，初始时间
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  dateRange:  string，日期范围，默认1970-01-01~2050-01-01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  dateFormat: string, 'yyyy.MM.dd.hh.mm' 或 'yyyy-MM-dd.hh.mm',用点区分列
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  onSelect: func, 选择时间回调
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  show:bool, 展示 or 隐藏组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  onMaskClick: func, 点击蒙层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  selectStyleyle: array 滚轮选择器li容器样式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function formatNumber(n) {
    return n < 10 ? "0" + n : "" + n;
}

var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DatePicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.handleRange = function () {
            var ranges = _this.props.dateRange.split('~');
            var start = new Date(ranges[0]);
            var end = new Date(ranges[1]);

            return {
                start: {
                    date: start.getTime(),
                    year: start.getFullYear()
                },
                end: {
                    date: end.getTime(),
                    year: end.getFullYear()
                }
            };
        }, _this.getDays = function (max) {
            var days = [];
            for (var i = 1; i <= (max || 31); i++) {
                var val = formatNumber(i);
                days.push({ text: val, value: val });
            }
            return days;
        }, _this.getDaysByMonthAndYear = function (month, year) {
            var int_d = new Date(year, parseInt(month) + 1 - 1, 1);
            var d = new Date(int_d - 1);
            return this.getDays(d.getDate());
        }, _this.initMonthes = [{ text: '01', value: '01' }, { text: '02', value: '02' }, { text: '03', value: '03' }, { text: '04', value: '04' }, { text: '05', value: '05' }, { text: '06', value: '06' }, { text: '07', value: '07' }, { text: '08', value: '08' }, { text: '09', value: '09' }, { text: '10', value: '10' }, { text: '11', value: '11' }, { text: '12', value: '12' }], _this.initYears = function () {
            var arr = [];

            var _this$handleRange = _this.handleRange(),
                start = _this$handleRange.start,
                end = _this$handleRange.end;

            for (var i = start.year; i <= end.year; i++) {
                var year = i + '';
                arr.push({ text: year, value: year });
            }
            return arr;
        }, _this.initHours = function () {
            var arr = [];
            for (var i = 0; i <= 23; i++) {
                var val = formatNumber(i);
                arr.push({ text: val, value: val });
            }
            return arr;
        }(), _this.initMinutes = function () {
            var arr = [];
            for (var i = 0; i <= 59; i++) {
                var val = formatNumber(i);
                arr.push({ text: val, value: val });
            }
            return arr;
        }(), _this.initDate = function () {
            var that = _this;
            var dateArr = [];

            var _this$handleRange2 = _this.handleRange(),
                start = _this$handleRange2.start,
                end = _this$handleRange2.end;

            var years = _this.initYears();
            var months = _this.initMonthes;

            years.map(function (year, y) {
                months.map(function (month, m) {
                    var days = that.getDaysByMonthAndYear(month.value, year.value);
                    days.map(function (day, d) {
                        var value = year.value + '-' + month.value + '-' + day.value;
                        var cur = new Date(value).getTime();
                        if (cur < start.date || cur > end.date) return;
                        dateArr.push({
                            text: year.value + '\u5E74' + month.value + '\u6708' + day.value + '\u65E5',
                            value: value
                        });
                    });
                });
            });
            return dateArr;
        }, _this.initial = function () {
            var _date = _this.props.date ? new Date(_this.props.date) : new Date();
            var val = (0, _date3.default)(_this.props.dateFormat, _date).split('.');
            var obj = {};
            _this.props.dateFormat.split('.').forEach(function (key, idx) {
                obj[key] = val[idx];
            });
            return obj;
        }, _this.selectData = function () {
            var selectData = {};
            _this.props.dateFormat.split(".").forEach(function (key, idx) {
                selectData[key] = {};
            });
            return selectData; //{yyyy: {}, MM,: {},dd: {}, hh: {}, mm: {}}或{yyyy-MM-dd:{},hh:{},mm: {}}
        }, _this.handleGetData = function (key, father, select) {
            var years = _this.initYears();
            switch (key) {
                case 'yyyy':
                    return years;
                case 'MM':
                    return _this.initMonthes;
                case 'dd':
                    return _this.getDaysByMonthAndYear(father, years[select[0]].value);
                case 'hh':
                    return _this.initHours;
                case 'mm':
                    return _this.initMinutes;
                case 'yyyy-MM-dd':
                    return _this.initDate();
            }
        }, _this.onSelect = function (res) {
            var date = "";
            Object.keys(res).forEach(function (key, i) {
                var value = res[key].value;
                switch (key) {
                    case 'yyyy':
                    case 'MM':
                        date = date + value + "-";
                        break;

                    case 'dd':
                        date = date + value + " ";
                        break;

                    case 'hh':
                        date = date + value + ":";
                        break;

                    case 'mm':
                        date += value;
                        break;

                    case 'yyyy-MM-dd':
                        date = date + value + " ";
                        break;
                }
            });
            _this.props.onSelect(date);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DatePicker, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_select2.default, _extends({}, this.props, {
                initial: this.initial(),
                selectData: this.selectData(),
                onGetSelectorData: this.handleGetData,
                onSelect: this.onSelect,
                selectSt: this.props.selectStyle,
                onMaskClick: this.props.onMaskClick
            }));
        }
    }]);

    return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = {
    date: _propTypes2.default.string,
    dateRange: _propTypes2.default.string, //日期范围
    dateFormat: _propTypes2.default.string, // 格式，格式多样一些，可以写成更语义的，
    onSelect: _propTypes2.default.func, // 选择时间回调
    show: _propTypes2.default.bool, // 展示 or 隐藏组件
    onMaskClick: _propTypes2.default.func, // 点击蒙层
    selectStyleyle: _propTypes2.default.array //滚轮选择器li容器样式
};
DatePicker.defaultProps = {
    date: '',
    dateFormat: 'yyyy.MM.dd.hh.mm',
    dateRange: '1970-01-01~2050-01-01',
    onSelect: function onSelect() {},
    onMaskClick: function onMaskClick() {}
};
exports.default = DatePicker;
//# sourceMappingURL=index.js.map