import { Context, Middleware } from '@nuxt/types';

/** トークンチェックミドルウェア */
const authentication: Middleware = ({ app, redirect, store }: Context) => {
  if (!store.state.user.userToken) {
    return redirect(app.$C.PAGE_URL.LOGIN);
  }
};

export default authentication;
