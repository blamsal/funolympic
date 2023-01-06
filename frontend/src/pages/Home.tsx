import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../app/store';
import VideoCard from '../components/VideoCard';
import { useGetAllStreamsQuery } from '../features/streams/streamApiSlice';
import {
  selectStream,
  setStreams,
} from '../features/streams/streamSlice';

export default function Home() {
	const {streams} = useSelector(selectStream);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {data, error} = useGetAllStreamsQuery({});

	useEffect(()=> {
		let cancel = false;

		if(!cancel && data) {
			dispatch(setStreams(data)) 
		}

		return () => {
			cancel = true;
		}
	}, [dispatch, data])

	if(error) {
		console.error(error);
	}

	return (
		<section className="text-gray-600 body-font">
			<div className="max-w-7xl px-5 py-14 mx-auto">
				<div className="flex flex-wrap -m-4">
					{streams.map((stream, i) => {
						return (
							<VideoCard
								onClick={()=> {navigate(`stream/${stream.id}`)}}
								key={i}
								title={stream.title}
								imageUrl={stream.thumbnail}
								description={stream.description}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
