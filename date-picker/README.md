# date-picker使用手册

## 效果描述

![select_image](http://i1.buimg.com/1949/7ead187785720b2c.png)

## 使用方法

    import DatePicker from '@repoch/date-picker';

    <DatePicker 
        show={ this.state.showDatePicker }
        date={ this.props.crowdfundingStartDate }
        dateRange={ this.props.dateRange }
        dateFormat='yyyy-MM-dd.hh.mm'
        selectStyle={ [{width: "55%"}, {width: "18%"}, {width: "18%"}] }
        onSelect={ this.onSelectDate }
        onMaskClick={ this.closeDatePicker }
    />

## 参数说明
- date: 可选，默认空，代表当前时间，时间
- dateRange:  可选，string, 默认'1970-01-01~2050-01-01',是日期范围
- dateFormat: 可选，string, 默认'yyyy.MM.dd.hh.mm'，是时间展示的格式，
- onSelect:可选，确定选择完成的回调
- show: 可选，默认false，控制展示 or 隐藏组件
- onMaskClick: 选选，点击蒙层的回调
- selectStyleyle: 可选，数组，滚轮选择器li容器样式
