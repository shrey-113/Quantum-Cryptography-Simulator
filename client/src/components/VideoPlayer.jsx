import React from "react";

export default function VideoPlayer({link}) {
  return (
    <iframe
      width="860"
      height="465"
      src={link}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );
}
