import React from 'react';
import { connect } from 'dva';
import { getProjectInfo, updateProject } from '@/services/project';
import ProjectForm from './ProjectForm';

import { message } from 'antd';

interface ProjectSettingStates {
  token: string;
  projectInfo: {
    is_use: number;
    project_name: string;
    url: string;
  };
}

@connect(({ project, loading }: ConnectState) => ({
  projectList: project.projectList,
}))
class ProjectSetting extends React.Component<ConnectProps, ProjectSettingStates> {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.query.token,
      projectInfo: {
        is_use: 1,
        project_name: '',
        url: '',
      },
    };
  }

  componentDidMount() {
    this.getProjectInfo();
  }

  getProjectInfo = async () => {
    const projectInfo = await getProjectInfo(this.state.token);
    this.setState({
      projectInfo: projectInfo.data,
    });
  };

  handleSubmit = async value => {
    const { state } = this;
    const data = await updateProject({
      ...state.projectInfo,
      ...value,
    });
    message('修改成功');
  };

  render() {
    const { projectInfo } = this.state;
    return (
      <div>
        <ProjectForm {...projectInfo} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ProjectSetting;
