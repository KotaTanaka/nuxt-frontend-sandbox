/**
 * 商品一覧取得APIレスポンス
 * path: /app/goods
 * method: GET
 * type: Response
 */
export interface IGoodsListingResponse {
  total: number
  goodsList: Array<IGoodsListElement>
}

/** 商品リスト要素 */
export interface IGoodsListElement {
  id: number
  name: string
  description: string
  price: number
  createdAt: string
}
