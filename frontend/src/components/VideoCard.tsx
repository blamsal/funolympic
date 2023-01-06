import React from 'react';

export interface VideoCardProps {
	imageUrl: string;
	title: string;
	description?: string;
	onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ onClick, imageUrl, title, description }) => {
	
	
	return (
		<div className="p-4 w-full md:w-1/2 xl:w-1/3">
			<div onClick={onClick} className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
				<img className="h-40  md:h-48 w-full object-cover object-center" src={imageUrl} alt="blog"></img>
				<div className="p-3 flex flex-col justify-between">
					<div className="flex flex-row mb-3">
						<h1 className="title-font text-lg font-medium text-gray-900 mr-auto items-center">{title}</h1>
						<button className="text-sm md:text-md px-3 py-1  rounded-full bg-blue-500 text-white" title="subscribe" type="button">
							Subscribe
						</button>
					</div>
					<div className="">
						<p className="leading-relaxed mb-3">{description ? description.slice(0, 100) + "..." : ""}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
