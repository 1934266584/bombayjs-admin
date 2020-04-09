import React from 'react';
import { Form, Input, Select, Options, Button } from 'antd';

const ProjectFrom = Form.create({
  name: 'global_state',
  mapPropsToFields(props) {
    return {
      project_name: Form.createFormField({
        ...props.project_name,
        value: props.project_name,
      }),
      is_use: Form.createFormField({
        ...props.is_use,
        value: props.is_use,
      }),
      url: Form.createFormField({
        ...props.url,
        value: props.url,
      }),
    };
  },
})(props => {
  const { getFieldDecorator } = props.form;

  const stop = e => {
    e.preventDefault();
    props.handleSubmit(props.form.getFieldsValue());
  };

  return (
    <Form onSubmit={stop}>
      <Form.Item label="项目名称">
        {getFieldDecorator('project_name')(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item label="项目地址">
        {getFieldDecorator('url')(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item label="使用状态">
        {getFieldDecorator('is_use')(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value={0}>关闭</Option>
            <Option value={1}>运行中</Option>
          </Select>,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit">
        修改
      </Button>
    </Form>
  );
});

export default ProjectFrom;
