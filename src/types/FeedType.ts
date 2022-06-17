export interface FeedType {
  id: string;
  title: string;
  uri: string;
  description: string;
  read: boolean;
  added: Date;
  created_at: Date;
  updated_at: Date;
}

export default FeedType;