export interface FeedType {
  id: string;
  title: string;
  uri: string;
  description: string;
  added: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export default FeedType;