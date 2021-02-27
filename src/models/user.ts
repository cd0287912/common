import { getUserInfo } from '@/api';
export default {
  namespace: 'user',
  state: {},
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetchUserInfo(action, { put, call }) {
      const result = yield call(getUserInfo);
      if (result) {
        yield put({ type: 'updateState', payload: result.data });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const freeLogin = ['/admin'];
        const needAuth = freeLogin.some(item => pathname.indexOf(item) != -1);
        if (needAuth) {
          dispatch({ type: 'fetchUserInfo' });
        }
      });
    },
  },
};
