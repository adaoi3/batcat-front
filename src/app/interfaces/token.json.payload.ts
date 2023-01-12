export interface TokenJsonPayload {
  exp: number;
  iat?: number;
  iss?: string;
  roles?: string[];
  sub: string;
  id: string;
}
