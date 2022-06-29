import React from 'react';
import parse from "html-react-parser";
import {PostPropsType} from "../types/PostPropsType";

export const ArticleDisplay = (props: PostPropsType) => {
	return (
		<article>
			<h1>{props.post.articleContent.title}</h1>
			{props.link.length > 0 && <p><a href={props.link}>Link to original article</a></p>}
			{(!props.post.articleContent.content || props.post.articleContent.content?.length === 0) && <p>{props.post.articleContent.description}</p>}
			{/* Below, wait for IDE update, red underlines don't make me happy */}
			{props.post.articleContent.content && props.post.articleContent.content?.length > 0 && <p>{parse(props.post.articleContent.content)}</p>}
		</article>
	)
}