import {FeedType, ReceivedFeedType} from "./FeedType";

export interface PostData {
  id:string;
	read:boolean;
	articleContent:{
		id:string;
		title:string | null;
		guid:string | null;
		content:string | null;
		description:string | null;
		pubDate:string | null;
		mediaLink:string | null;
		itunesDuration:string | null;
		itunesSummary:string | null;
		link:string | null;
	},
	feed: FeedType;
}

export interface ReceivedPostData {
  id: string;
	read:boolean;
	article_content:{
		id: string;
		title: string | null;
		guid: string | null;
		content: string | null;
		description: string | null;
		pub_date: string | null;
		media_link:string | null;
		itunes_duration:string | null;
		itunes_summary:string | null;
		link:string | null;
	},
	feed: ReceivedFeedType;
}