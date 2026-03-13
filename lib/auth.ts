/**
 * 鉴权相关（预留）
 * 后续可接入 NextAuth.js：在此封装 getSession()，供 layout、API 等使用
 */

export type Session = {
  user: { name?: string; email?: string; image?: string };
  expires: string;
};

/** 当前未接入登录，始终返回 null */
export async function getSession(): Promise<Session | null> {
  return null;
}
