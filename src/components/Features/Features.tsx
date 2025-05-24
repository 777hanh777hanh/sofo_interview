import { FEATURES } from '@/constants';

const Features = () => {
	return (
		<div className='grid grid-cols-1 my-6 lg:my-8 xl:my-10 gap-6 md:grid-cols-2 lg:grid-cols-4'>
			{FEATURES.map((feature) => (
				<div
					key={feature.title}
					className='bg-white p-2 lg:p-3 xs:p-4 shadow-[0_8px_16px_0_rgba(145,158,171,0.16)]
						rounded-xl'
				>
					<div className='flex items-center gap-2 select-none'>
						<img
							className='w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 drag-none'
							src={feature.icon}
							alt={feature.title}
						/>
						<div className='flex flex-col gap-2'>
							<h3 className='text-lg font-bold'>
								{feature.title}
							</h3>
							<p className='text-sm text-gray-500'>
								{feature.description}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Features;
