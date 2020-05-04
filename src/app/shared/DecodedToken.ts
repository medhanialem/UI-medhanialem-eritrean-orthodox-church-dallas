
export interface DecodedToken {
    userId: number;
    display_name: string;
    email: string;
    role: string;
    nbf: number;
    exp: number;
    iat: number;
    aud: string;
    sub: string;
}
