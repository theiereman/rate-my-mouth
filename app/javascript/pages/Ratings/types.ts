export interface RatingType {
  id: number;
  value: number;
  created_at: string;
  user: {
    id: number;
    username: string;
  };
}
