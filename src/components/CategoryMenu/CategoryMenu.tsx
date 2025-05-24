import { cn } from '@/utils/cn';
import { useState } from 'react';

interface CategoryItem {
	id: string;
	label: string;
	image: string;
	isActive?: boolean;
}

interface CategoryMenuProps {
	className?: string;
	onCategorySelect?: (categoryId: string) => void;
}

const CategoryMenu = ({
	className = '',
	onCategorySelect
}: CategoryMenuProps) => {
	const categories: CategoryItem[] = [
		{
			id: 'oil-filter',
			label: 'Bộ Lọc Dầu',
			image: 'https://picsum.photos/200/300',
			isActive: false
		},
		{
			id: 'air-filter',
			label: 'Bộ Lọc Không Khí',
			image: 'https://picsum.photos/200/301',
			isActive: false
		},
		{
			id: 'fuel-filter',
			label: 'Bộ Lọc Nhiên Liệu',
			image: 'https://picsum.photos/200/302',
			isActive: false
		},
		{
			id: 'cabin-filter',
			label: 'Bộ Lọc Trong Cabin',
			image: 'https://picsum.photos/200/303',
			isActive: false
		},
		{
			id: 'air-filter-2',
			label: 'Bộ Lọc Không Khí',
			image: 'https://picsum.photos/200/304',
			isActive: false
		},
		{
			id: 'cabin-filter-2',
			label: 'Bộ Lọc Trong Cabin',
			image: 'https://picsum.photos/200/305',
			isActive: false
		},
		{
			id: 'fuel-filter-2',
			label: 'Bộ Lọc Nhiên Liệu',
			image: 'https://picsum.photos/200/306',
			isActive: false
		},
		{
			id: 'air-filter-3',
			label: 'Bộ Lọc Không Khí',
			image: 'https://picsum.photos/200/307',
			isActive: false
		}
	];

	const [activeCategory, setActiveCategory] = useState<string | null>(
		categories[0].id
	);

	const handleCategoryClick = (categoryId: string) => {
		setActiveCategory(categoryId);
		onCategorySelect?.(categoryId);
	};

	return (
		<div
			className={cn(
				'font-primary bg-white border-r border-gray-200',
				className
			)}
		>
			<div className=''>
				<div className='space-y-1'>
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => handleCategoryClick(category.id)}
							className={cn(
								`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors
								duration-200 border-l-3 border-solid border-transparent cursor-pointer`,
								'hover:bg-gray-50 hover:text-[#024897]',
								'hover:border-l-3 hover:border-solid',
								'text-[#1C252E] text-sm font-medium',
								activeCategory === category.id
									? 'bg-gray-50 !text-[#024897] !border-[#024897]'
									: ''
							)}
						>
							<img
								src={category.image}
								alt={category.label}
								className='w-8 h-8 xl:w-10 xl:h-10 object-contain'
							/>
							<span className='flex-1'>{category.label}</span>
							<span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='15'
									height='14'
									viewBox='0 0 15 14'
									fill='none'
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M5.66792 2.58449C5.85138 2.42724 6.12757 2.44849 6.28482 2.63194L9.78482 6.71528C9.92525 6.87912 9.92525 7.12088 9.78482 7.28472L6.28482 11.3681C6.12757 11.5515 5.85138 11.5728 5.66792 11.4155C5.48447 11.2583 5.46322 10.9821 5.62047 10.7986L8.87642 7L5.62047 3.20139C5.46322 3.01793 5.48447 2.74174 5.66792 2.58449Z'
										fill='currentColor'
									/>
								</svg>
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryMenu;
