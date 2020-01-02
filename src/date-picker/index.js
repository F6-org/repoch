/**
 *  date: string，初始时间
 *  dateRange:  string，日期范围，默认1970-01-01~2050-01-01
 *  dateFormat: string, 'yyyy.MM.dd.hh.mm' 或 'yyyy-MM-dd.hh.mm',用点区分列
 *  onSelect: func, 选择时间回调
 *  show:bool, 展示 or 隐藏组件
 *  onMaskClick: func, 点击蒙层
 *  selectStyleyle: array 滚轮选择器li容器样式
 */

import ScrollSelect from '@repoch/select';
import date from '@repoch/format/date';
import PropTypes from 'prop-types';
import React from 'react';

function formatNumber(n) {
    return n < 10 ? "0" + n : "" + n;
}

export default class DatePicker extends React.Component {
    static propTypes = {
        date: PropTypes.string,
        dateRange:  PropTypes.string,//日期范围
        dateFormat: PropTypes.string, // 格式，格式多样一些，可以写成更语义的，
        onSelect: PropTypes.func, // 选择时间回调
        show: PropTypes.bool, // 展示 or 隐藏组件
        onMaskClick: PropTypes.func, // 点击蒙层
        selectStyleyle: PropTypes.array //滚轮选择器li容器样式
    }

    static defaultProps = {
        date: '',
        dateFormat: 'yyyy.MM.dd.hh.mm',
        dateRange: '1970-01-01~2050-01-01',
        onSelect: function() {},
        onMaskClick: function() {}
    };

    handleRange = () => {
        let ranges = this.props.dateRange.split('~');
        let start = new Date(ranges[0]);
        let end = new Date(ranges[1]);
        
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
    }

    getDays = function(max) {
        var days = [];
        for(var i=1; i<= (max||31);i++) {
            let val = formatNumber(i);
            days.push({ text: val, value: val });
        }
        return days;
    }

    getDaysByMonthAndYear = function(month, year) {
        var int_d = new Date(year, parseInt(month)+1-1, 1);
        var d = new Date(int_d - 1);
        return this.getDays(d.getDate());
    }

    initMonthes = [
        {text: '01', value: '01'},
        {text: '02', value: '02'},
        {text: '03', value: '03'},
        {text: '04', value: '04'},
        {text: '05', value: '05'},
        {text: '06', value: '06'},
        {text: '07', value: '07'},
        {text: '08', value: '08'},
        {text: '09', value: '09'},
        {text: '10', value: '10'},
        {text: '11', value: '11'},
        {text: '12', value: '12'}
    ]

    initYears = () => {
        var arr = [];
        let { start, end } = this.handleRange();
        for (var i = start.year; i <= end.year; i++) { 
            let year = i + '';
            arr.push({text: year, value: year}); 
        }
        return arr;
    }

    initHours = (function () {
        var arr = [];
        for (var i = 0; i <= 23; i++) {
            let val = formatNumber(i);
            arr.push({text: val, value: val}); 
        }
        return arr;
    })()

    initMinutes = (function () {
        var arr = [];
        for (var i = 0; i <= 59; i++) { 
            let val = formatNumber(i);
            arr.push({text: val, value: val}); 
        }
        return arr;
    })()

    initDate = () => {
        let that = this;
        let dateArr = [];
        let {start, end} = this.handleRange();
        let years = this.initYears();
        let months = this.initMonthes;

        years.map((year, y) => {
            months.map((month, m)=> {
                let days = that.getDaysByMonthAndYear(month.value, year.value);
                days.map((day, d)=> {
                    let value = `${year.value}-${month.value}-${day.value}`;
                    let cur = new Date(value).getTime();
                    if (cur < start.date || cur > end.date) return;
                    dateArr.push({
                        text: `${year.value}年${month.value}月${day.value}日`, 
                        value: value
                    });
                });
            });
        });
        return dateArr;
    }

    initial = () => {
        let _date = this.props.date ? new Date(this.props.date) : new Date();
        let val = date(this.props.dateFormat, _date).split('.');
        let obj = {};
        this.props.dateFormat.split('.').forEach((key, idx) => {
            obj[key] = val[idx];
        });
        return obj;
    }

    selectData = () => {
        let selectData = {};
        this.props.dateFormat.split(".").forEach((key, idx) => {
            selectData[key] = {};
        });
        return selectData;//{yyyy: {}, MM,: {},dd: {}, hh: {}, mm: {}}或{yyyy-MM-dd:{},hh:{},mm: {}}
    }

    handleGetData = (key, father, select) => {
        let years = this.initYears();
        switch(key) {
            case 'yyyy':
                return years;
            case 'MM':
                return this.initMonthes;
            case 'dd':
                return this.getDaysByMonthAndYear(father, years[select[0]].value);
            case 'hh':
                return this.initHours;
            case 'mm':
                return this.initMinutes;
            case 'yyyy-MM-dd':
                return this.initDate();
        }
    }

    onSelect = (res) => {
        let date = "";
        Object.keys(res).forEach((key, i) => {
            let value = res[key].value;
            switch(key) {
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
        this.props.onSelect(date);
    }

    render() {
        return (
            <ScrollSelect { ...this.props } 
                initial={ this.initial() }
                selectData={ this.selectData() }
                onGetSelectorData={ this.handleGetData }
                onSelect={ this.onSelect }
                selectSt={ this.props.selectStyle }
                onMaskClick={ this.props.onMaskClick }
            />
        );
    }
}
