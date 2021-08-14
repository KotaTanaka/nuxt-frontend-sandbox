import { computed, getCurrentInstance } from '@nuxtjs/composition-api';
import {
  ICreateGoodsRequestBody,
  IUpdateGoodsRequestBody,
} from '@/interfaces/api/request/Goods';
import { IAPIError } from '@/interfaces/api/response/Error';

/** 商品操作 */
const useGoods = () => {
  const { proxy } = getCurrentInstance();

  /** 認証トークン */
  const useToken = computed<string>(() => {
    return proxy.$typedStore.state.user.userToken;
  });

  /** 商品一覧取得 */
  const fetchGoodsList = async () => {
    try {
      await proxy.$typedStore.dispatch<'goods/fetchGoodsList'>(
        'goods/fetchGoodsList',
        {
          token: useToken.value,
        },
      );
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      proxy.$nuxt.error({
        message: `商品の取得に失敗しました: ${errData.message}`,
        path: proxy.$route.path,
        statusCode: status,
      });

      throw err;
    }
  };

  /** 商品詳細取得 */
  const fetchGoodsDetail = async () => {
    try {
      await proxy.$typedStore.dispatch<'goods/fetchGoodsDetail'>(
        'goods/fetchGoodsDetail',
        {
          token: useToken.value,
          id: proxy.$route.params.id,
        },
      );
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      proxy.$nuxt.error({
        message: `商品の取得に失敗しました: ${errData.message}`,
        path: proxy.$route.path,
        statusCode: status,
      });

      throw err;
    }
  };

  /**
   * 商品登録
   * @param {ICreateGoodsRequestBody} body リクエストボディ
   */
  const registerGoods = async (body: ICreateGoodsRequestBody) => {
    try {
      await proxy.$typedStore.dispatch<'goods/registerGoods'>(
        'goods/registerGoods',
        {
          token: useToken.value,
          body,
        },
      );
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      proxy.$nuxt.error({
        message: `商品の登録に失敗しました: ${errData.message}`,
        path: proxy.$route.path,
        statusCode: status,
      });

      throw err;
    }
  };

  /**
   * 商品更新
   * @param {number} id 商品ID
   * @param {IUpdateGoodsRequestBody} body リクエストボディ
   */
  const updateGoods = async (id: number, body: IUpdateGoodsRequestBody) => {
    try {
      await proxy.$typedStore.dispatch<'goods/updateGoods'>(
        'goods/updateGoods',
        {
          token: useToken.value,
          id: String(id),
          body,
        },
      );
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      proxy.$nuxt.error({
        message: `商品情報の更新に失敗しました: ${errData.message}`,
        path: proxy.$route.path,
        statusCode: status,
      });

      throw err;
    }
  };

  /**
   * 商品削除
   * @param {number} id 商品ID
   */
  const deleteGoods = async (id: number) => {
    try {
      await proxy.$typedStore.dispatch<'goods/deleteGoods'>(
        'goods/deleteGoods',
        {
          token: useToken.value,
          id: String(id),
        },
      );
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      proxy.$nuxt.error({
        message: `商品の削除に失敗しました: ${errData.message}`,
        path: proxy.$route.path,
        statusCode: status,
      });

      throw err;
    }
  };

  return {
    fetchGoodsList,
    fetchGoodsDetail,
    registerGoods,
    updateGoods,
    deleteGoods,
  };
};

export default useGoods;
