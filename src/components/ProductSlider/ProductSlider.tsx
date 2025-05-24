import { useEffect, useRef, useState, useCallback } from 'react';
import Card from '@/components/Card/Card';
import { cn } from '@/utils/cn';

interface Product {
	id: string | number;
	name: string;
	price: number;
	image: string;
	price_discount?: number;
	is_hot_price?: boolean;
	isBuy?: boolean;
	[key: string]: any;
}

interface ProductSliderProps {
	products: Product[];
	className?: string;
	autoScroll?: boolean;
	autoScrollDelay?: number;
	itemsToShow?: number;
	gap?: number;
	showNavigation?: boolean;
	showDots?: boolean;
}

const ProductSlider = ({
	products,
	className = '',
	autoScroll = true,
	autoScrollDelay = 3000,
	itemsToShow = 5,
	gap = 16,
	showNavigation = true,
	showDots = true
}: ProductSliderProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(products.length); // Start from middle set
	const [isPaused, setIsPaused] = useState(false);
	const [itemWidth, setItemWidth] = useState(280);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isResetting, setIsResetting] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Triple the products for infinite scroll
	const extendedProducts = [...products, ...products, ...products];

	// Calculate item width based on container width and items to show
	useEffect(() => {
		const updateItemWidth = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				const totalGaps = (itemsToShow - 1) * gap;
				const availableWidth = containerWidth - totalGaps;
				const calculatedWidth = Math.floor(
					availableWidth / itemsToShow
				);
				setItemWidth(calculatedWidth);
			}
		};

		updateItemWidth();
		window.addEventListener('resize', updateItemWidth);
		return () => window.removeEventListener('resize', updateItemWidth);
	}, [itemsToShow, gap]);

	const getTranslateX = useCallback(
		(index: number) => {
			return -(index * (itemWidth + gap));
		},
		[itemWidth, gap]
	);

	// Auto scroll management
	const startAutoScroll = useCallback(() => {
		if (!autoScroll || isPaused || products.length === 0) return;

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			setCurrentIndex((prev) => prev + 1);
			setIsTransitioning(true);
		}, autoScrollDelay);
	}, [autoScroll, isPaused, autoScrollDelay, products.length]);

	const stopAutoScroll = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// Improved infinite loop reset
	const handleTransitionEnd = useCallback(() => {
		setIsTransitioning(false);

		// Clear any pending reset
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
		}

		// Check for boundary reset without animation
		resetTimeoutRef.current = setTimeout(() => {
			if (currentIndex >= products.length * 2) {
				// At the end of third set, jump back to second set without animation
				setIsResetting(true);
				setCurrentIndex(products.length);
				// Re-enable transition after reset
				setTimeout(() => setIsResetting(false), 50);
			} else if (currentIndex < products.length) {
				// At the beginning of first set, jump to second set without animation
				const targetIndex =
					currentIndex < 0
						? products.length + products.length + currentIndex
						: products.length + currentIndex;
				setIsResetting(true);
				setCurrentIndex(targetIndex);
				// Re-enable transition after reset
				setTimeout(() => setIsResetting(false), 50);
			}
		}, 50);
	}, [currentIndex, products.length]);

	const nextSlide = useCallback(() => {
		if (isTransitioning) return;

		// Clear any pending reset
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = null;
		}

		// Stop and restart auto scroll
		stopAutoScroll();

		setIsTransitioning(true);
		setCurrentIndex((prev) => prev + 1);

		// Restart auto scroll after delay
		setTimeout(() => {
			startAutoScroll();
		}, 100);
	}, [isTransitioning, stopAutoScroll, startAutoScroll]);

	const prevSlide = useCallback(() => {
		if (isTransitioning) return;

		// Clear any pending reset
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = null;
		}

		// Stop and restart auto scroll
		stopAutoScroll();

		setIsTransitioning(true);
		setCurrentIndex((prev) => prev - 1);

		// Restart auto scroll after delay
		setTimeout(() => {
			startAutoScroll();
		}, 100);
	}, [isTransitioning, stopAutoScroll, startAutoScroll]);

	// Auto scroll effect
	useEffect(() => {
		startAutoScroll();
		return () => {
			stopAutoScroll();
		};
	}, [startAutoScroll, stopAutoScroll]);

	// Cleanup timeouts
	useEffect(() => {
		return () => {
			if (resetTimeoutRef.current) {
				clearTimeout(resetTimeoutRef.current);
			}
		};
	}, []);

	const handleMouseEnter = () => {
		setIsPaused(true);
		stopAutoScroll();
	};

	const handleMouseLeave = () => {
		setIsPaused(false);
		startAutoScroll();
	};

	const goToSlide = (index: number) => {
		if (isTransitioning) return;

		// Clear any pending reset
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = null;
		}

		// Stop and restart auto scroll
		stopAutoScroll();

		setIsTransitioning(true);
		setCurrentIndex(products.length + index); // Always use middle set

		// Restart auto scroll after delay
		setTimeout(() => {
			startAutoScroll();
		}, 100);
	};

	// Get current slide index for dots indicator
	const getCurrentSlideIndex = () => {
		const normalizedIndex =
			((currentIndex % products.length) + products.length) %
			products.length;
		return normalizedIndex;
	};

	const ChevronLeftIcon = () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
		>
			<path
				d='M15 5L9 12L15 19'
				stroke='#013065'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);

	const ChevronRightIcon = () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z'
				fill='#013065'
			/>
		</svg>
	);

	return (
		<div
			ref={containerRef}
			className={cn('relative w-full', className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Navigation Buttons */}
			{showNavigation && (
				<>
					<button
						onClick={prevSlide}
						className='cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
							bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200
							hover:scale-110'
						aria-label='Previous slide'
					>
						<ChevronLeftIcon />
					</button>
					<button
						onClick={nextSlide}
						className='cursor-pointer absolute right-2 translate-x-1/2 top-1/2 -translate-y-1/2 z-10
							bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200
							hover:scale-110'
						aria-label='Next slide'
					>
						<ChevronRightIcon />
					</button>
				</>
			)}

			{/* Slider Container */}
			<div className='overflow-hidden'>
				<div
					className={cn(
						'flex',
						isTransitioning && !isResetting
							? 'transition-transform duration-500 ease-in-out'
							: ''
					)}
					style={{
						transform: `translateX(${getTranslateX(currentIndex)}px)`,
						gap: `${gap}px`
					}}
					onTransitionEnd={handleTransitionEnd}
				>
					{extendedProducts.map((product, index) => (
						<div
							key={`${product.id}-${index}`}
							className='shrink-0'
							style={{ width: `${itemWidth}px` }}
						>
							<Card
								className='h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow
									duration-300'
								{...product}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Dots Indicator */}
			{showDots && (
				<div className='flex justify-center mt-4 gap-2'>
					{products.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={cn(
								'w-2 h-2 rounded-full transition-all duration-200',
								index === getCurrentSlideIndex()
									? 'bg-[#013065] w-6'
									: 'bg-gray-300 hover:bg-gray-400'
							)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductSlider;
