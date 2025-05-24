import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import HotPriceImage from '@/assets/images/hot-price.png';
import { formatNumberToPrice } from '@/utils';

interface ICardItem {
	className?: string;
	id: string | number;
	name: string;
	price: number;
	image: string;
	price_discount?: number;
	is_best_seller?: boolean;
	is_new?: boolean;
	is_sale?: boolean;
	is_hot?: boolean;
	is_hot_price?: boolean;
	is_featured?: boolean;
	is_trending?: boolean;
	category?: string;
	brand?: string;
	year?: number;
	made_in?: string;
	[key: string]: any;
}

const Card = ({ className = '', ...props }: ICardItem) => {
	const [isBuy, setIsBuy] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const percentDiscount = ((props.price_discount ?? 0) / props.price) * 100;

	useEffect(() => {
		if (props.isBuy) {
			setIsBuy(true);
		}
	}, [props.isBuy]);

	return (
		<div className={cn('', className)}>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col items-center gap-2'>
					{/* Image with skeleton */}
					<div className='relative aspect-square w-full'>
						{!imageLoaded && !imageError && (
							<div
								className='absolute inset-0 flex animate-pulse items-center justify-center rounded-lg
									bg-gray-200'
							>
								<div className='h-8 w-8 rounded-full bg-gray-300'></div>
							</div>
						)}
						<img
							className={`h-full w-full rounded-lg object-cover transition-opacity duration-300 ${
								imageLoaded ? 'opacity-100' : 'opacity-0' }`}
							src={props.image}
							alt={props.name}
							onLoad={() => setImageLoaded(true)}
							onError={() => {
								setImageError(true);
								setImageLoaded(true);
							}}
						/>
						{imageError && (
							<div className='absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100'>
								<div className='p-4 text-center text-sm text-gray-400'>
									<div className='mx-auto mb-2 h-8 w-8 rounded bg-gray-300'></div>
									Không thể tải ảnh
								</div>
							</div>
						)}
					</div>

					{/* Info Card */}
					<div className='flex flex-col gap-2 px-4 py-2.5 lg:gap-4 lg:px-6 lg:py-4'>
						{props.is_hot_price && (
							<div className='flex items-center gap-2'>
								<img
									className='h-5'
									src={HotPriceImage}
									alt={props.name}
								/>
							</div>
						)}
						<div className='overflow-hidden'>
							<p className='line-clamp-2 text-sm font-semibold text-ellipsis text-[#1C252E] md:text-base'>
								{props.name}
							</p>
						</div>

						{/* Price */}
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<p
									className='text-xl font-semibold text-[#B71D18] md:text-2xl'
									dangerouslySetInnerHTML={{
										__html: formatNumberToPrice(
											props.price_discount ?? props.price,
											'đ',
											false
										)
									}}
								></p>
							</div>

							{/* Discount */}

							<div
								className={cn(
									'flex items-center gap-2.5',
									!!props.price_discount ? '' : 'invisible'
								)}
							>
								<p
									className='text-[#919EAB text-sm font-normal line-through'
									dangerouslySetInnerHTML={{
										__html: formatNumberToPrice(
											props.price,
											'đ',
											false
										)
									}}
								></p>
								<p className='text-[#B71D18 text-sm font-normal'>
									{percentDiscount.toFixed(0)} %
								</p>
							</div>

							{/* Button */}
							<div
								className={cn(
									'flex w-full items-center gap-2',
									isBuy ? '' : 'invisible'
								)}
							>
								<button className='font-secondary w-full rounded-lg bg-[#E6F1FF] py-1 text-[#025FCA] select-none'>
									Mua ngay
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
