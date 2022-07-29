import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {PostData} from "../types/PostData";
import PostService from "../services/PostService";
import {Navigate, useParams} from "react-router-dom";
import './PostPage.css';
import {ArticleDisplay} from "../components/ArticleDisplay";
import {EpisodeDisplay} from "../components/EpisodeDisplay";
import {useUriValid} from "../functions/useUriValid";

/**
 * Article page renders page for a single episode
 * Note: This page will be merged with Episode page when I see
 * what they have in common
 *
 * @constructor
 */
export const PostPage = () => {
	const { id, type } = useParams();
	const [loading, setLoading] = useState(false);
	const [link, setLink] = useState("");
	const [post, setPost] = useState<PostData>({
		articleContent: {
			content: null,
			description: null,
			guid: null,
			id: "",
			itunesDuration: null,
			itunesSummary: null,
			link: null,
			mediaLink: null,
			mediaType: null,
			pubDate: null,
			title: null
		},
		id: "",
		read: false,
		currentTime: 0,
		feed: {
			id: "",
			title: "",
			uri: "",
			description: "",
			added: null,
			createdAt: null,
			updatedAt: null,
			feedType: "",
		}
	})

	useEffect(() => {
		if (id) {
			setLoading(true);
			// TODO consider adding posts into store
			PostService.fetchPost(id)
				.then((data) => {
					console.log(data)
					setPost(data);
					setLoading(false);

					if (!data.read) {
						PostService.markAsRead(id)
							.catch((e) => console.error)
					}
				});
		}
	}, [id]);

	const displayCorrectPostType = () => {
		if (loading) {
			return <></>
		}
		let link = '';

		try {
			if (post.articleContent.link && post.articleContent.link.length > 0) {
				link = new URL(post.articleContent.link).toString();
			} else {
				throw new Error('Cannot use link')
			}
		} catch (e) {
			try {
				if (post.articleContent.guid && post.articleContent.guid.length > 0) {
					link = new URL(post.articleContent.guid).toString();
				}
			} catch (e) {
				link = ""
			}
		}

		switch (type?.toLowerCase()) {
			case 'article':
				return <ArticleDisplay post={post} link={link} />
			case 'episode':
				return <EpisodeDisplay post={post} link={link} />
			default:
				return <Navigate to={'/'} replace={false}/>;
		}
	}

	return (
		<main>
			<Navigation />
			{loading && <p>Please wait</p>}
			{displayCorrectPostType()}
		</main>
	)
}