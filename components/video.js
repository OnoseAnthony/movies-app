import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({onClose, trailerUrl}) => {
  return (
    <VideoPlayer
      onBack={() => onClose()}
      onEnd={() => onClose()}
      fullscreenOrientation="all"
      source={{uri: trailerUrl}}
    />
  );
};

export default Video;
