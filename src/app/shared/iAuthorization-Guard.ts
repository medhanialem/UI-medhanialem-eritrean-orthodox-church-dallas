
export interface IAuthorizationGuard {
    userHasPermission(): boolean;
}