import { User } from '../models/user';

export const stringifyUser = (user: User): string => JSON.stringify(user);
