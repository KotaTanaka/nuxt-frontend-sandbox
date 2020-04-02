import { PAGE_URL } from '@/constants';

export default function({ store, redirect }) {
  if (!store.state.user.userToken) {
    return redirect(PAGE_URL.LOGIN);
  }
}
