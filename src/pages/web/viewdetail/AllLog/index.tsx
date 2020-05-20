import React, { PureComponent } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import DataTable from '@/components/DataTable';
import { viewDetailStateType } from '@/models/viewDetail';
// import SearchParam from './SearchParam';

// import styles from './index.less';

interface AllLogTypeProps {
  dispatch?: Dispatch<AnyAction>;
  viewdetail: viewDetailStateType;
}

interface AllLogTypeState {
  tableTitleColumns: Array<any>;
  pagination: Object;
}

@connect(({ viewdetail, project }: { viewdetail: viewDetailStateType }) => ({
  viewdetail,
  projectToken: project.projectToken,
}))
class AllLog extends PureComponent<AllLogTypeProps, AllLogTypeState> {
  constructor(props: AllLogTypeProps) {
    super(props);
    this.state = {
      tableTitleColumns: [
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.time' }),
          dataIndex: 'time',
          key: 'time',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.logTime' }),
          dataIndex: 'logTypes',
          key: 'logTypes',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.pageUrl' }),
          dataIndex: 'pageUrl',
          key: 'pageUrl',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.uid' }),
          dataIndex: 'uid',
          key: 'uid',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.device' }),
          dataIndex: 'device',
          key: 'device',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.jsFileUrl' }),
          dataIndex: 'jsFileUrl',
          key: 'jsFileUrl',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.jsErrMsg' }),
          dataIndex: 'jsErrMsg',
          key: 'jsErrMsg',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.pageLoadTime' }),
          dataIndex: 'pageLoadTime',
          key: 'pageLoadTime',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.geography' }),
          dataIndex: 'geography',
          key: 'geography',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiReqUrl' }),
          dataIndex: 'apiReqUrl',
          key: 'apiReqUrl',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiReponseTime' }),
          dataIndex: 'apiReponseTime',
          key: 'apiReponseTime',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiMsg' }),
          dataIndex: 'apiMsg',
          key: 'apiMsg',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiWhether' }),
          dataIndex: 'apiWhether',
          key: 'apiWhether',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.traceId' }),
          dataIndex: 'traceId',
          key: 'traceId',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.code' }),
          dataIndex: 'code',
          key: 'code',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.browser' }),
          dataIndex: 'browser',
          key: 'browser',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.osys' }),
          dataIndex: 'osys',
          key: 'osys',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.resolution' }),
          dataIndex: 'resolution',
          key: 'resolution',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.client' }),
          dataIndex: 'client',
          key: 'client',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.ref' }),
          dataIndex: 'ref',
          key: 'ref',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.ip' }),
          dataIndex: 'ip',
          key: 'ip',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.sid' }),
          dataIndex: 'sid',
          key: 'sid',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.alllog' }),
          dataIndex: 'alllog',
          key: 'alllog',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.tag' }),
          dataIndex: 'tag',
          key: 'tag',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.customLog' }),
          dataIndex: 'customLog',
          key: 'customLog',
          isShowHead: true,
          width: 200,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.operation' }),
          dataIndex: 'operation',
          key: 'operation',
          isShowHead: true,
          width: 200,
        },
      ],
      pagination: {},
    };
  }

  componentDidMount() {
    this.initAllLogDataAction();
  }

  handleTableChange = pagination => {
    this.initAllLogDataAction(pagination);
    this.setState(prev => ({
      pagination: {
        ...prev.pagination,
        current: pagination.current,
      },
    }));
  };

  washAllLogData = viewdetail => {
    const allLogData = viewdetail.allLogDataList;
    return allLogData.map(item => ({
      key: item._id,
      time: new Date(item.begin).toLocaleString(),
      logTypes: item.t,
      pageUrl: item.page,
      uid: item.uid,
      device: item.detector ? item.detector.device.name : '',
      jsFileUrl: item.file,
      jsErrMsg: item.msg,
      pageLoadTime: item.load,
      geography: item.ad_info ? item.ad_info.nation : '',
      apiReqUrl: item.api,
      apiReponseTime: item.time,
      apiMsg: item.apiMsg,
      apiWhether: item.apiWhether,
      traceId: item.traceId,
      code: item.code,
      browser: item.browser,
      osys: item.osys,
      resolution: item.sr,
      client: item.client,
      ref: item.ref,
      ip: item.ip,
      sid: item.sid,
      alllog: item.msg,
      tag: item.tag,
      customLog: item.customLog,
      operation: item.operation,
    }));
  };

  initAllLogDataAction(pagination = {}) {
    const { dispatch, projectToken } = this.props;
    if (dispatch) {
      dispatch({
        type: 'viewdetail/getAllLogAction',
        payload: {
          startTime: 1463390087795,
          endTime: new Date().getTime(),
          currentPage: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          order: 'desc',
          query: {},
          type: this.props.types || ['error', 'api', 'perf', 'pv'],
          projectToken,
        },
      });
    }

    // console.log('result:', AllLogResult)
  }

  render() {
    const { tableTitleColumns } = this.state;
    const { viewdetail } = this.props;
    const pagination = { ...this.state.pagination };
    pagination.total = viewdetail.allLog.total;
    const dataList = this.washAllLogData(viewdetail.allLog);

    return (
      <div>
        {/* <SearchParam /> */}
        <DataTable
          dataSource={dataList}
          columns={tableTitleColumns}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default AllLog;
