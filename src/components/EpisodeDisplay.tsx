import React from 'react';
import parse from "html-react-parser";
import {PostPropsType} from "../types/PostPropsType";

export const EpisodeDisplay = (props: PostPropsType) => {
	return (
		<article>
			<h1>{props.post.articleContent.title}</h1>
			<p>Duration: {props.post.articleContent.itunesDuration}</p>
			{props.link.length > 0 && <p><a href={props.link}>Link to original article</a></p>}
			{props.post.articleContent.mediaLink && <audio
        controls
        src={props.post.articleContent.mediaLink}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>}
			{props.post.articleContent.itunesSummary && props.post.articleContent.itunesSummary?.length > 0 &&
        <p>{parse(props.post.articleContent.itunesSummary)}</p>}
		</article>
	)
}