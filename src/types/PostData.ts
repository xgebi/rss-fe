import {FeedType, ReceivedFeedType} from "./FeedType";

export interface PostData {
  id:string;
	read:boolean;
	currentTime: number | null;
	articleContent:{
		id:string;
		title:string | null;
		guid:string | null;
		content:string | null;
		description:string | null;
		pubDate:string | null;
		mediaLink:string | null;
		mediaType:string | null;
		itunesDuration:string | null;
		itunesSummary:string | null;
		link:string | null;
	},
	feed: FeedType;
}

export interface ReceivedPostData {
  id: string;
	read:boolean;
	current_time: number | null;
	article_content:{
		id: string;
		title: string | null;
		guid: string | null;
		content: string | null;
		description: string | null;
		pub_date: string | null;
		media_link:string | null;
		media_type:string | null;
		itunes_duration:string | null;
		itunes_summary:string | null;
		link:string | null;
	},
	feed: ReceivedFeedType;
}