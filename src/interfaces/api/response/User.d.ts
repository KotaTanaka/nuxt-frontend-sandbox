/**
 * ログインAPIリレスポンス
 * path: /app/users/login
 * method: POST
 * type: Response
 */
export interface ILoginResponse {
  id: string
  loginToken: string
}
