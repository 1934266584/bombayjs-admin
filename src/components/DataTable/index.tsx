import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './index.less';

interface DataTableTypeProps {
  dataSource: Array<any>;
  columns: Array<any>;
  pagination?: Object;
  onChange?: any;
}

interface DataTableTypeState {}

class DataTable extends PureComponent<DataTableTypeProps, DataTableTypeState> {
  constructor(props: DataTableTypeProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { columns, dataSource, pagination, onChange } = this.props;
    if (pagination && onChange) {
      return (
        <div className={styles['table-container']}>
          <Table
            dataSource={dataSource}
            pagination={pagination}
            columns={columns}
            scroll={{ x: 1300, y: 600 }}
            onChange={onChange}
          />
        </div>
      );
    }
    return (
      <div className={styles['table-container']}>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300, y: 600 }} />
      </div>
    );
  }
}

export default DataTable;
