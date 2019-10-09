import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import {
  Form,
  Divider,
  Table,
  Select,
  Alert,
  Tag,
  Icon,
  Input,
  Button,
  message,
  Skeleton,
  Switch,
  Card,
  Avatar,
  Radio,
  List,
  Modal,
  Dropdown,
  Menu,
  Row,
  Col,
  Drawer,
  notification,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { TableRowSelection } from 'antd/lib/table';
import Link from 'umi/link';
import router from 'umi/router';
import { getEventVariateListDao, addEventVariateDao } from '@/services/eventVariate';
import EventVariateForm from '@/components/EventVariateForm';

import styles from './style.less';

const { Option } = Select;

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '标识符',
    dataIndex: 'marker',
    key: 'marker',
    width: '300px',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: EventVariate) => (
      <span>
        <a>编辑</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];

export interface HomeProps extends ConnectProps {
  form: FormComponentProps['form'];
  projectList: ProjectType[];
  projectToken: string;
  loading: boolean;
  dispatch: Dispatch;
}

interface HomeStates {
  data: EventVariate[];
  rowSelection: TableRowSelection<EventVariate>;
  visible: boolean;
  selectedRows: EventVariate[];
  loading: boolean;
}

@connect(({ project, loading }: ConnectState) => ({
  projectList: project.projectList,
  projectToken: project.projectToken,
  loading: loading.effects['project/fetchProjectList'],
}))
class Home extends React.Component<HomeProps, HomeStates> {
  constructor(props: HomeProps) {
    super(props);
    const project = props.projectList.find(item => item.token === props.projectToken);
    this.state = {
      data: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            selectedRows,
          });
        },
        getCheckboxProps: record => ({
          disabled: !record.is_use, // Column configuration not to be checked
          name: record.name,
        }),
      },
      visible: false,
      selectedRows: [],
      loading: false,
    };
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'project/fetchProjectList',
    // });
    this.getEventVariate({
      project_token: this.props.projectToken,
    });
  }

  async getEventVariate(condition: GetEventVariateListConditions) {
    this.setState({ loading: true });
    const result = await getEventVariateListDao(condition);
    if (result.code === 200) {
      this.setState({
        loading: false,
        data: result.data,
      });
    }
  }

  handleModalVisible = (visible: boolean) => {
    this.setState({
      visible,
    });
  };

  addEventVariate = () => {};

  handleSearch = e => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const cond: GetEventVariateListConditions = {
        project_token: this.props.projectToken,
      };
      if (fieldsValue.name) cond.name = fieldsValue.name.trim();
      if (fieldsValue.is_use === 0 || fieldsValue.is_use === 1) cond.is_use = fieldsValue.is_use;
      this.getEventVariate(cond);
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.getEventVariate({
      project_token: this.props.projectToken,
    });
  };

  handleSubmit = async values => {
    const variate: EventVariate = {
      project_token: this.props.projectToken, // 项目id
      name: values.name, // 事件名称
      marker: values.marker, // 标识符 圈选就是路径
      type: 'customer', // 类型
    };
    const result = await addEventVariateDao(variate);
    if (result.code === 200) {
      const { form } = this.props;
      const fieldsValue = form.getFieldsValue();
      const cond: GetEventVariateListConditions = {
        project_token: this.props.projectToken,
      };
      if (fieldsValue.name) cond.name = fieldsValue.name.trim();
      if (fieldsValue.is_use === 0 || fieldsValue.is_use === 1) cond.is_use = fieldsValue.is_use;
      this.getEventVariate(cond);
      this.setState({
        visible: false,
      });
    } else {
      message.error(result.msg);
    }
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="事件名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="使用状态">
              {getFieldDecorator('is_use')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={0}>关闭</Option>
                  <Option value={1}>运行中</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { data, rowSelection, selectedRows, loading, visible } = this.state;

    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <div className={styles.tableListOperator}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
          {selectedRows.length > 0 && (
            <span>
              <Button>创建事件分析</Button>
              <Button>删除</Button>
            </span>
          )}
        </div>
        <Alert
          message={
            <Fragment>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项
            </Fragment>
          }
          type="warning"
          showIcon
        />
        <Table
          rowKey={record => record.marker}
          loading={loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
        <EventVariateForm
          name=""
          marker=""
          visible={visible}
          onClose={() => this.handleModalVisible(false)}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Form.create()(Home);
