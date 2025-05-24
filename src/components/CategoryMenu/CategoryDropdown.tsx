import { cn } from '@/utils/cn';
import { useState, useEffect, useRef, useCallback } from 'react';
import CategoryMenu from './CategoryMenu';
import Card from '@/components/Card/Card';
import { CategoryService } from '@/services/categoryService';
import type { FilterResponse } from '@/types/product';
import { useProductLimit } from '@/hooks/useResponsive';

interface CategoryDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	triggerRef: React.RefObject<HTMLDivElement | null>;
	className?: string;
	onCategorySelect?: (categoryId: string) => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

const CategoryDropdown = ({
	isOpen,
	onClose,
	triggerRef,
	className = '',
	onCategorySelect,
	onMouseEnter,
	onMouseLeave
}: CategoryDropdownProps) => {
	const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [filterData, setFilterData] = useState<FilterResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] =
		useState<string>('oil-filter');
	const productLimit = useProductLimit();

	// Calculate position and height
	const updateDropdownPosition = useCallback(() => {
		if (triggerRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const availableHeight = viewportHeight - triggerRect.bottom;

			setDropdownStyle({
				position: 'fixed',
				top: triggerRect.bottom,
				left: 0,
				width: '100vw',
				height: `${Math.max(availableHeight - 10, 200)}px`, // 10px margin, min 200px
				zIndex: 50
			});
		}
	}, [triggerRef]);

	// Update position on open and scroll
	useEffect(() => {
		if (isOpen) {
			updateDropdownPosition();

			// Listen to scroll events to update position
			const handleScroll = () => {
				updateDropdownPosition();
			};

			// Prevent body scroll when dropdown is open
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';

			window.addEventListener('scroll', handleScroll, true);
			window.addEventListener('resize', updateDropdownPosition);

			return () => {
				// Restore body scroll
				document.body.style.overflow = originalOverflow;
				window.removeEventListener('scroll', handleScroll, true);
				window.removeEventListener('resize', updateDropdownPosition);
			};
		}
	}, [isOpen, updateDropdownPosition]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose, triggerRef]);

	// Load initial data
	useEffect(() => {
		if (isOpen) {
			loadFilterData(selectedCategory);
		}
	}, [isOpen, selectedCategory]);

	const loadFilterData = async (categoryId: string) => {
		setLoading(true);
		try {
			const data = await CategoryService.getFilterData(categoryId);
			setFilterData(data);
		} catch (error) {
			console.error('Error loading filter data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCategorySelect = (categoryId: string) => {
		setSelectedCategory(categoryId);
		onCategorySelect?.(categoryId);
	};

	if (!isOpen) return null;

	return (
		<div
			ref={dropdownRef}
			style={dropdownStyle}
			className={cn('bg-gray-50 shadow-lg overflow-hidden', className)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{/* Content container with scroll - now uses full calculated height */}
			<div className='h-full overflow-y-auto'>
				<div className='container mx-auto py-3'>
					<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
						{/* Categories Grid - Left side */}
						<div className='lg:col-span-1'>
							<CategoryMenu
								className='border-none p-0'
								onCategorySelect={handleCategorySelect}
							/>
						</div>

						{/* Filtered Content - Right side */}
						<div className='lg:col-span-3 space-y-6'>
							{loading ? (
								<div className='flex items-center justify-center py-12'>
									<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
									<span className='ml-3 text-gray-600'>
										Đang tải...
									</span>
								</div>
							) : filterData ? (
								<>
									{/* Brands Grid */}
									<div>
										<h3 className='font-semibold text-gray-900 text-lg mb-4'>
											Thương hiệu cho{' '}
											{filterData.category.name}
										</h3>
										<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
											{filterData.brands.map((brand) => (
												<button
													key={brand.id}
													className='flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200
														hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200'
												>
													<div className='text-left'>
														<p className='font-medium text-gray-900'>
															{brand.name}
														</p>
														<p className='text-sm text-gray-500'>
															{brand.productCount}{' '}
															sản phẩm
														</p>
													</div>
													<svg
														width='6'
														height='10'
														viewBox='0 0 6 10'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
														className='text-gray-400'
													>
														<path
															d='M1 1L5 5L1 9'
															stroke='currentColor'
															strokeWidth='1.5'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												</button>
											))}
										</div>
									</div>

									{/* Divider */}
									<div className='border-t border-gray-200'></div>

									{/* Hot Products */}
									<div>
										<div className='flex items-center justify-between mb-4'>
											<h3 className='font-semibold text-gray-900 text-lg'>
												Sản phẩm bán chạy
											</h3>
											<button
												className='flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm
													transition-colors'
											>
												Xem tất cả
												<svg
													width='6'
													height='10'
													viewBox='0 0 6 10'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M1 1L5 5L1 9'
														stroke='currentColor'
														strokeWidth='1.5'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
											</button>
										</div>

										{/* Products Grid */}
										<div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
											{filterData.hotProducts
												.slice(0, productLimit)
												.map((product) => (
													<Card
														key={product.id}
														className='bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
														{...product}
													/>
												))}
										</div>
									</div>

									{/* Extra content để test scroll */}
									<div className='space-y-4'>
										<h3 className='font-semibold text-gray-900 text-lg'>
											Các sản phẩm khác
										</h3>
										<div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
											{filterData.hotProducts
												.slice(0, productLimit * 2) // More products để test scroll
												.map((product, index) => (
													<Card
														key={`extra-${product.id}-${index}`}
														className='bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
														{...product}
														name={`${product.name} - Phiên bản ${index + 1}`}
													/>
												))}
										</div>
									</div>
								</>
							) : (
								<div className='text-center py-12 text-gray-500'>
									Chọn một danh mục để xem sản phẩm
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryDropdown;
