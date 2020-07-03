/** 共通エラーレスポンス */
export interface IAPIError {
  /** ステータスコード */
  code: number;
  /** エラーメッセージ */
  message: string;
  /** エラー詳細 */
  detailMessage: string[];
}
