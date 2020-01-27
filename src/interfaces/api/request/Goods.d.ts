/**
 * 商品登録APIリクエストボディ
 * path: /app/goods
 * method: POST
 * type: Request
 */
export interface ICreateGoodsRequestBody {
  name: string
  description: string
  price: number
}
