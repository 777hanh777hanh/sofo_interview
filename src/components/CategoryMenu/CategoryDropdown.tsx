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

	// Calculate position and height with improved responsiveness
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
				maxHeight: `${Math.max(availableHeight - 10, 200)}px`, // Use maxHeight instead of height
				minHeight: '200px', // Ensure minimum reasonable height
				zIndex: 50
			});
		}
	}, [triggerRef]);

	// Update position on open and scroll with improved tracking
	useEffect(() => {
		if (isOpen) {
			updateDropdownPosition();

			// Enhanced scroll and resize listeners for better position tracking
			const handleScroll = () => {
				updateDropdownPosition();
			};

			const handleResize = () => {
				updateDropdownPosition();
			};

			// Explicitly ensure body can scroll
			const originalOverflow = document.body.style.overflow;
			const originalPosition = document.body.style.position;

			// Lock body scroll completely when dropdown is open
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.top = `-${window.scrollY}px`;
			document.body.style.width = '100%';

			// Use passive listeners for better performance
			window.addEventListener('scroll', handleScroll, {
				passive: true,
				capture: true
			});
			window.addEventListener('resize', handleResize, { passive: true });

			// Also listen to document scroll for better tracking
			document.addEventListener('scroll', handleScroll, {
				passive: true,
				capture: true
			});

			return () => {
				// Restore original styles and scroll position
				const scrollY = document.body.style.top;
				document.body.style.overflow = originalOverflow;
				document.body.style.position = originalPosition;
				document.body.style.top = '';
				document.body.style.width = '';

				// Restore scroll position
				if (scrollY) {
					window.scrollTo(0, parseInt(scrollY || '0') * -1);
				}

				window.removeEventListener('scroll', handleScroll, {
					capture: true
				});
				window.removeEventListener('resize', handleResize);
				document.removeEventListener('scroll', handleScroll, {
					capture: true
				});
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
			className={cn(
				'bg-gray-50 shadow-lg overflow-hidden flex flex-col',
				className
			)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{/* Content container with proper scroll containment */}
			<div
				className='overflow-y-auto overflow-x-hidden dropdown-scroll-container flex-1'
				style={{
					height: '100%',
					maxHeight: '100%',
					overscrollBehavior: 'contain',
					overscrollBehaviorY: 'contain',
					scrollBehavior: 'smooth',
					WebkitOverflowScrolling: 'touch'
				}}
				onWheel={(e) => {
					const target = e.currentTarget;

					const isScrollable =
						target.scrollHeight > target.clientHeight;

					if (isScrollable) {
						e.preventDefault();
						e.stopPropagation();

						const isScrollingDown = e.deltaY > 0;
						const isAtTop = target.scrollTop === 0;
						const isAtBottom =
							target.scrollTop + target.clientHeight >=
							target.scrollHeight - 1;

						if (
							(isScrollingDown && !isAtBottom) ||
							(!isScrollingDown && !isAtTop)
						) {
							target.scrollTop += e.deltaY;
						}
					}
				}}
				onScroll={(e) => {}}
				onTouchMove={(e) => {
					const target = e.currentTarget;
					const isScrollable =
						target.scrollHeight > target.clientHeight;

					if (isScrollable) {
						e.stopPropagation();
					}
				}}
			>
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
													xmlns='http://www.w3.org/2000/svg'
													width='21'
													height='20'
													viewBox='0 0 21 20'
													fill='none'
												>
													<path
														fill-rule='evenodd'
														clip-rule='evenodd'
														d='M6.12916 3.69204C6.39123 3.4674 6.7858 3.49775 7.01044 3.75983L12.0104 9.59316C12.2111 9.82722 12.2111 10.1726 12.0104 10.4067L7.01044 16.24C6.7858 16.5021 6.39123 16.5324 6.12916 16.3078C5.86708 16.0831 5.83673 15.6886 6.06136 15.4265L10.7127 9.99991L6.06136 4.57332C5.83673 4.31124 5.86708 3.91668 6.12916 3.69204ZM9.46265 3.69213C9.72473 3.46749 10.1193 3.49784 10.3439 3.75992L15.3439 9.59325C15.5446 9.82731 15.5446 10.1727 15.3439 10.4067L10.3439 16.2401C10.1193 16.5022 9.72473 16.5325 9.46265 16.3079C9.20057 16.0832 9.17022 15.6887 9.39486 15.4266L14.0462 10L9.39486 4.57341C9.17022 4.31133 9.20057 3.91677 9.46265 3.69213Z'
														fill='#0373F3'
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
