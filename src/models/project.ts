import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getWebProjectListDao, deleteProject } from '@/services/project';
import { getPageQuery } from '@/utils/utils';

export interface ProjectStateType {
  projectToken?: string;
  projectList?: IProjectType[];
}

export interface ProjectModelType {
  namespace: string;
  state: ProjectStateType;
  effects: {
    fetchProjectList: Effect;
    setProjectToken: Effect;
    deleteProjectByToken: Effect;
  };
  reducers: {
    changeProjectList: Reducer<ProjectStateType>;
    changeProjectToken: Reducer<ProjectStateType>;
  };
}

const Model: ProjectModelType = {
  namespace: 'project',

  state: {
    projectToken: '',
    projectList: [],
  },

  effects: {
    *fetchProjectList({ payload }, { call, put }) {
      const response = yield call(getWebProjectListDao, payload);
      if (response.code === 200) {
        yield put({
          type: 'changeProjectList',
          payload: response.data,
        });
      }
    },
    *setProjectToken(store, { put }) {
      const params = getPageQuery();
      const { token } = params;
      yield put({
        type: 'changeProjectToken',
        payload: token,
      });
    },
    *deleteProjectByToken({ payload }, { call, put }) {
      const response = yield call(deleteProject, payload);
      if (response.code === 200) {
        const res = yield call(getWebProjectListDao, payload);
        if (res.code === 200) {
          yield put({
            type: 'changeProjectList',
            payload: response.data,
          });
        }
      }
    },
  },

  reducers: {
    changeProjectList(state, { payload }) {
      return {
        ...state,
        projectList: payload,
      };
    },
    changeProjectToken(state, { payload }) {
      return {
        ...state,
        projectToken: payload,
      };
    },
  },
};

export default Model;
