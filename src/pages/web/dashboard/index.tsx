import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Row, Col, DatePicker } from 'antd';
import { getDashboardLogs, getDashboardLogInSeven } from '@/services/dashboard';

const { RangePicker } = DatePicker;

import styles from './style.less';

// 定义度量
const cols = {
  times: { alias: '发生次数' },
  actionType: { alias: '事件' },
};

const lineCols = {
  month: {
    range: [0, 1],
  },
};

interface chartDataItem {
  actionType: string;
  times: number;
}

interface lineDataItem {
  date: string;
  error: string;
  api: string;
  perf: string;
  pv: string;
}

interface DashboardStates {
  token: string;
  chartData: Array<chartDataItem>;
  lineData: Array<lineDataItem>;
}

class Dashboard extends React.Component<ConnectProps, DashboardStates> {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.query.token,
      chartData: [
        { actionType: '错误日志', times: 0 },
        { actionType: 'api日志', times: 0 },
        { actionType: '页面性能日志', times: 0 },
        { actionType: 'pv日志', times: 0 },
      ],
      lineData: [],
    };
  }

  componentDidMount() {
    this.handlerDateChange([], []);
    this.getDashboardLogInSeven();
  }

  getDashboardLogInSeven = async () => {
    const { data = [] } = await getDashboardLogInSeven(this.state.token);

    const lineData = data
      .map(item => {
        const type = ['error', 'api', 'perf', 'pv'];
        return type.map(value => ({
          type: value,
          date: item.date,
          times: item[value],
        }));
      })
      .flat();

    this.setState({
      lineData: lineData,
    });
  };

  getDashboardLogs = async (startTime, endTime) => {
    const acount = await getDashboardLogs(
      ['error', 'api', 'perf', 'pv'],
      this.state.token,
      startTime,
      endTime,
    );

    const enumAcount = {
      error: '错误日志',
      api: 'api日志',
      perf: '页面性能日志',
      pv: 'pv日志',
    };

    acount.data.forEach(item => {
      item.actionType = enumAcount[item.actionType];
    });
    this.setState({
      chartData: acount.data,
    });
  };

  handlerDateChange = (dates, dateStrings) => {
    let startTime = 0;
    let endTime = new Date().getTime();
    if (dates.length) {
      startTime = new Date(dateStrings[0]).getTime();
      endTime = new Date(dateStrings[1]).getTime();
    }
    this.getDashboardLogs(startTime, endTime);
  };

  render() {
    const { state, handlerDateChange } = this;
    const { chartData, lineData } = state;
    return (
      <div className={styles.flex_container}>
        <div className={styles.flex_center}>
          <div>
            <span className={styles.date_ranger}>时间范围选择:</span>
            <RangePicker showTime onChange={handlerDateChange} />
          </div>
          <Chart width={600} height={500} data={chartData} scale={cols}>
            <Axis name="actionType" title />
            <Axis name="times" title />
            <Legend position="bottom" />
            <Tooltip />
            <Geom type="interval" position="actionType*times" color="actionType" />
          </Chart>
        </div>
        <div className={styles.flex_center}>
          <div>
            <span className={styles.date_ranger}>近15天的变化曲线:</span>
          </div>
          <Chart width={600} height={500} data={lineData} scale={lineCols}>
            <Legend />
            <Axis name="date" />
            <Axis
              name="times"
              label={{
                formatter: val => `${val}次`,
              }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="line" position="date*times" size={2} color={'type'} shape={'smooth'} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Dashboard;
