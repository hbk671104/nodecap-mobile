export default {
  namespace: 'project_create',
  state: {
    route: [
      {
        name: 'CreateMyProjectBasicInfo',
        title: '基本信息',
      },
      {
        name: 'CreateMyProjectDescription',
        title: '项目介绍',
      },
      {
        name: 'CreateMyProjectTeam',
        title: '团队成员',
      },
      {
        name: 'CreateMyProjectSocial',
        title: '社群信息',
      },
      {
        name: 'CreateMyProjectRoadMap',
        title: '路线图',
      },
      {
        name: 'CreateMyProjectFunding',
        title: '募资信息',
      },
    ],
    current: {
      members: [{}],
      social_network: [{}],
      roadmap: [{}],
      purpose: [],
      tags: [],
    },
    owner: {},
  },
  effects: {},
  reducers: {
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: {
          ...state.current,
          ...payload,
        },
      };
    },
    saveOwner(state, { payload }) {
      return {
        ...state,
        owner: {
          ...state.owner,
          ...payload,
        },
      };
    },
  },
};