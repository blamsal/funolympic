import React, {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import { useAppSelector } from '../app/store';
import VideoPlayer from '../components/VideoPlayer';
import {
  selectStream,
  Stream,
} from '../features/streams/streamSlice';

function Video() {
	const params = useParams();
	const [stream, setStream] = useState<Stream>({
		id: "",
		created: 0,
		description: "",
		startTime: 0,
		streamKey: "",
		thumbnail: "",
		title: "",
	});

	const { streams } = useAppSelector(selectStream);

	useEffect(() => {
		console.debug("params", params);
		if (params.id !== undefined) {
			console.debug("streams", streams);
			const stream = streams.find((s) => s.id == params.id);
			console.debug(stream);

			if (stream) {
				setStream(stream);
			}
		}
	}, [params, streams]);

	console.debug(stream);

	return (
		<div className="max-w-7xl px-5 py-14 mx-auto">
			<div className="h-[40em] md:w-4/5 w-full ">
				<div className="p-3 h-full flex flex-col justify-between">
					<VideoPlayer
						uri={"https://www.youtube.com/embed/NjIU8lSNTy4"}
						className={"w-full h-full border"}
						title={stream.title}
					></VideoPlayer>

					<div className="flex mt-4 flex-row text-gray-900 p-2">
						<h1 className="title-font text-lg font-medium text-gray-900 mr-auto items-center">{stream.title}</h1>
						<button
							className="text-sm md:text-md px-3 py-1  rounded-full bg-blue-500 text-white"
							title="subscribe"
							type="button"
						>
							Subscribe
						</button>
					</div>

					<p className="p-2 leading-relaxed">{stream.description}</p>
				</div>
			</div>
		</div>
	);
}

Video.VideoProps = {};

export default Video;

{
	/* <iframe width="560" height="315" src="https://www.youtube.com/embed/HyZzCHgG3AY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */
}
