export interface AppState {
  messages: Message[];
  users: User[];
}

export interface Message {
  id: integer;
  user_id: string;
  content: string;
  date: string;
}
export interface User {
  id: string;
  name: string;
}
