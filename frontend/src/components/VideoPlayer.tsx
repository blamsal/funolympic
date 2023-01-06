import React from 'react';

const video = require("react-html5video")

const {DefualtPlayer} = video;

interface VideoPlayerProps {
  title: string;
  uri: string;
  className: string;
}

function VideoPlayer({title, uri, className}: VideoPlayerProps) {
  return (
    <div className={className}>
        <iframe width="100%" height="100%" allowFullScreen
        title={title}
        src={uri}></iframe>
      </div>
  )
}

export default VideoPlayer