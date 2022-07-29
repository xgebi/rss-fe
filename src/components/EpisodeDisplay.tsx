import React, {useEffect, useRef, useState} from 'react';
import parse from "html-react-parser";
import {PostPropsType} from "../types/PostPropsType";
import PostService from "../services/PostService";

export const EpisodeDisplay = (props: PostPropsType) => {
	const [updateInterval, setUpdateInterval] = useState<any>(null);
	const audioPlayer = useRef<HTMLAudioElement>(null);
	const videoPlayer = useRef<HTMLVideoElement>(null);

	function updateCurrentTime(ev: any) {
		setUpdateInterval(setInterval(() => {
			PostService.updateCurrentTime(props.post.id, ev.target.currentTime)
				.catch(() => {
					console.log('Cannot contact server');
				})
		}, 1000))
	}

	function stopUpdatingCurrentTime(ev: any) {
		clearInterval(updateInterval);
	}

	useEffect(() => {
		return () => {
			clearInterval(updateInterval);
		}
	});

	useEffect(() => {
		if (audioPlayer.current) {
			audioPlayer.current.currentTime = props.post.currentTime || 0;
		}
		if (videoPlayer.current) {
			videoPlayer.current.currentTime = props.post.currentTime || 0;
		}
	}, [audioPlayer, videoPlayer])

	return (
		<article>
			<h1>{props.post.articleContent.title}</h1>
			<p>Duration: {props.post.articleContent.itunesDuration}</p>
			{props.link.length > 0 && <p><a href={props.link}>Link to original article</a></p>}
			{props.post.articleContent.mediaLink &&
				props.post.articleContent.mediaType === 'audio' && <audio
					onPlay={updateCurrentTime}
					onPause={stopUpdatingCurrentTime}
        controls
				ref={audioPlayer}
        src={props.post.articleContent.mediaLink}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>}
			{props.post.articleContent.mediaLink &&
				props.post.articleContent.mediaType === 'video' && <video
					onPlay={updateCurrentTime}
					onPause={stopUpdatingCurrentTime}
        controls
				ref={videoPlayer}
        src={props.post.articleContent.mediaLink}>
        Your browser does not support the
        <code>video</code> element.
      </video>}
			{props.post.articleContent.itunesSummary && props.post.articleContent.itunesSummary?.length > 0 &&
        <p>{parse(props.post.articleContent.itunesSummary)}</p>}
		</article>
	)
}