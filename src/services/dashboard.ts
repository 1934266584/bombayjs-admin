import request from '@/utils/request';

export async function getDashboardLogs(
  type: Array<string>,
  projectToken: string,
  startTime: number,
  endTime: number,
) {
  return request('/api/v1/dashboard/countLog', {
    method: 'POST',
    data: {
      type,
      projectToken,
      startTime,
      endTime,
    },
  });
}

export async function getDashboardLogInSeven(projectToken: string) {
  return request('/api/v1/dashboard/countLogIn15', {
    method: 'POST',
    data: {
      projectToken,
    },
  });
}
