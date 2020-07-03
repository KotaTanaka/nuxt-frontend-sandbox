/**
 * 商品一覧取得APIレスポンス
 * path: /app/goods
 * method: GET
 * type: Response
 */
export interface IGoodsListingResponse {
  total: number;
  goodsList: IGoodsListElement[];
}

/** 商品リスト要素 */
export interface IGoodsListElement {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
}

/**
 * 商品詳細取得APIレスポンス
 * path: /app/goods/:id
 * method: GET
 * type: Response
 */
export interface IGoodsDetailResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 商品登録APIレスポンス
 * path: /app/goods
 * method: POST
 * type: Response
 */
export interface ICreateGoodsResponse extends IGoodsIdResponse {}

/**
 * 商品編集APIレスポンス
 * path: /app/goods/:id
 * method: PUT
 * type: Response
 */
export interface IUpdateGoodsResponse extends IGoodsIdResponse {}

/**
 * 商品削除APIレスポンス
 * path: /app/goods/:id
 * method: DELETE
 * type: Response
 */
export interface IDeleteGoodsResponse extends IGoodsIdResponse {}

/** 商品IDのみのレスポンス */
interface IGoodsIdResponse {
  id: number;
}
