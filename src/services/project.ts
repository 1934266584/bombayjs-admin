import request from '@/utils/request';

export async function addProjectDao(params: IProjectType) {
  return request('/api/v1/project/add', {
    method: 'POST',
    data: params,
  });
}

export async function deleteProject(token: Object) {
  return request('/api/v1/project/delete', {
    method: 'POST',
    data: {
      ...token,
    },
  });
}

export async function getWebProjectListDao(): Promise<any> {
  return request('/api/v1/project/web/list');
}

export async function getProjectInfo(token: string): Promise<any> {
  return request(`/api/v1/project/getProjectsForId?token=${token}`);
}

export async function updateProject(projectValue: any) {
  return request('/api/v1/project/update', {
    method: 'POST',
    data: {
      ...projectValue,
    },
  });
}
