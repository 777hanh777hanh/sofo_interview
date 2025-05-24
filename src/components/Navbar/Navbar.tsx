import { cn } from '@/utils/cn';
import { MENU } from '@/constants';
import { Link } from 'react-router-dom';
import ClockIcon from '@/assets/icons/clock.svg';
import FeatureIcon from '@/assets/icons/feature.svg';
import TruckIcon from '@/assets/icons/truck.svg';
import RefreshIcon from '@/assets/icons/refresh.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import ArrowDownIcon from '@/assets/icons/chevron-down.svg';
import { useRef, useState, useCallback } from 'react';
import CategoryDropdown from '@/components/CategoryMenu/CategoryDropdown';

const Navbar = ({ className = '' }: { className: string }) => {
	const rightList = [
		{
			label: 'Hỗ trợ 24/7',
			icon: ClockIcon
		},
		{
			label: 'Miễn phí vận chuyển',
			icon: FeatureIcon
		},
		{
			label: 'Giao hàng nhanh 2h',
			icon: TruckIcon
		},
		{
			label: '30 ngày đổi trả',
			icon: RefreshIcon
		}
	];

	const categoryRef = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleCategorySelect = (categoryId: string) => {
		console.log('Selected category:', categoryId);
		// Handle category selection logic here
	};

	const handleMouseEnter = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setIsDropdownOpen(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			setIsDropdownOpen(false);
		}, 150); // 150ms delay to allow moving to dropdown
	}, []);

	const handleDropdownMouseEnter = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const handleDropdownMouseLeave = useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			setIsDropdownOpen(false);
		}, 150);
	}, []);

	const handleCloseDropdown = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setIsDropdownOpen(false);
	}, []);

	return (
		<>
			<div
				className={cn(
					'font-primary container mx-auto gap-6',
					className
				)}
			>
				<div className='flex justify-between gap-8 lg:gap-12'>
					{/* Left */}
					<div className='flex items-center gap-6'>
						{/* Category */}
						<div
							className='flex cursor-pointer items-center gap-2 py-1.5 px-2.5 xl:py-3 xl:px-5
								bg-[#0155C6] rounded-lg transition-all duration-200 hover:bg-[#0142A3]'
							ref={categoryRef}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<img src={MenuIcon} alt='Menu' />
							<p
								className='text-[11px] !leading-[1] font-medium text-white select-none xl:text-sm
									2xl:text-base'
							>
								Danh mục sản phẩm
							</p>
							<img
								src={ArrowDownIcon}
								alt='Arrow Down'
								className={cn(
									'transition-transform duration-200',
									isDropdownOpen ? 'rotate-180' : ''
								)}
							/>
						</div>

						{/* Menu */}
						<div className='flex items-center gap-5 h-full'>
							{MENU.map((item) => (
								<Link
									key={item.label}
									to={item.path}
									className='flex h-full items-center relative text-[11px] !leading-[1] font-medium
										text-[#1C252E] transition-colors duration-300 select-none after:absolute
										after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#1C252E]
										after:transition-all after:duration-300 hover:after:w-full xl:text-sm
										2xl:text-base'
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>

					{/* Right */}
					<div className='flex items-center'>
						<div className='flex items-center gap-2 xl:gap-5'>
							{rightList.map((item) => (
								<div
									key={item.label}
									className='flex items-center gap-2'
								>
									<img
										className='w-4 h-4 lg:w-5 lg:h-5'
										src={item.icon}
										alt={item.label}
									/>
									<p
										className='text-[11px] !leading-[1] font-medium text-[#1C252E] select-none xl:text-sm
											2xl:text-base'
									>
										{item.label}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Category Dropdown */}
			<CategoryDropdown
				isOpen={isDropdownOpen}
				onClose={handleCloseDropdown}
				triggerRef={categoryRef}
				onCategorySelect={handleCategorySelect}
				onMouseEnter={handleDropdownMouseEnter}
				onMouseLeave={handleDropdownMouseLeave}
			/>
		</>
	);
};

export default Navbar;
