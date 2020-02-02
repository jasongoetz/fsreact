import { AuthContext } from './authContext';

export const getUserId = (context: AuthContext) => context.userId;
export const isLoggedIn = (context: AuthContext) => context.authenticated;
