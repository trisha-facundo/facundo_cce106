export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    id: "1",
    name: "Karlo",
    email: "karlo@gmail.com",
    password: "karlo123",
  },
  {
    id: "2",
    name: "Trish",
    email: "trisha@gmail.com",
    password: "trisha123",
  },
];