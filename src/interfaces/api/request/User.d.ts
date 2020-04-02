/**
 * ログインAPIリクエストボディ
 * path: /app/users/login
 * method: POST
 * type: Request
 */
export interface ILoginRequestBody {
  id: string;
  password: string;
}
