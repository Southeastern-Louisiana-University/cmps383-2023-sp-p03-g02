export type Role = "User" | "Admin";

export type User = {
    id: number,
    userName: string,
    roles: Role[],
}

export type AuthData = User | null;

export type LoginDto = {
    userName: string
    password: string
}

export type CreateUserDto = {
    userName: string;
    password: string;
    roles: string[];
}