import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import { Dispatch } from 'redux';
import { Tabs } from 'antd';
import AllLog from './AllLog';

import styles from './styles.less';

// const viewDetail = function (props) {
//   return <div>viewDetail</div>
// }

class ViewDetail extends PureComponent {
  state = {
    currentKey: '1',
  };

  changeTag = (key: string) => {
    this.setState({
      currentKey: key,
    });
  };

  render() {
    const { TabPane } = Tabs;
    const { currentKey } = this.state;
    return (
      <div className={styles.viewdetal_container}>
        <Tabs defaultActiveKey="1" onChange={this.changeTag}>
          <TabPane tab="全部日志" key="1">
            {currentKey === '1' && <AllLog />}
          </TabPane>
          <TabPane tab="Js错误日志" key="2">
            {currentKey === '2' && <AllLog types="error" />}
          </TabPane>
          <TabPane tab="API日志" key="3">
            {currentKey === '3' && <AllLog types="api" />}
          </TabPane>
          <TabPane tab="页面性能日志" key="4">
            {currentKey === '4' && <AllLog types="perf" />}
          </TabPane>
          <TabPane tab="PV日志" key="5">
            {currentKey === '5' && <AllLog types="pv" />}
          </TabPane>
        </Tabs>
      </div>
      // <div>
      //   <div>viewDetail</div>
      // </div>
    );
  }
}

export default ViewDetail;
