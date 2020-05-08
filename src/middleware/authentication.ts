import { Context, Middleware } from '@nuxt/types';

// from app
import { PAGE_URL } from '@/constants';

/** トークンチェックミドルウェア */
const authentication: Middleware = ({ redirect, store }: Context) => {
  if (!store.state.user.userToken) {
    return redirect(PAGE_URL.LOGIN);
  }
};

export default authentication;
