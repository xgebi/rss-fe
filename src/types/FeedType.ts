export interface FeedType {
  id: string;
  title: string;
  uri: string;
  description: string;
  added: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  feedType: string;
  lastSuccessfulUpdate: Date | null;
}

export interface ReceivedFeedType {
  id: string;
  title: string;
  uri: string;
  description: string;
  added: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  feed_type: string;
  last_successful_update: Date | null;
}