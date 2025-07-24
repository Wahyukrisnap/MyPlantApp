export interface Plant {
  id: number;
  name: string;
  type: string;
  date: string;
}

export const plantData: Plant[] = [];

// Data user sementara
export interface User {
  username: string;
  password: string;
}

export const users: User[] = [
  { username: "user", password: "123" }, // default user
];
