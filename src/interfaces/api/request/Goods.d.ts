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

/**
 * 商品編集APIリクエストボディ
 * path: /app/goods/:id
 * method: PUT
 * type: Request
 */
export interface IUpdateGoodsRequestBody
  extends Partial<ICreateGoodsRequestBody> {}
