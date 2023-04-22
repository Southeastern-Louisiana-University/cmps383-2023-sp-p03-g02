import { User } from '.././types/authentication';

export const isUserAdmin = (user: User | null) => user?.roles?.includes("Admin");