import SearchIcon from '@/assets/icons/search.svg';
import CameraIcon from '@/assets/icons/camera.svg';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useNavigate } from 'react-router';

interface SearchBarProps {
	className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
	const [isSearch, setIsSearch] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isSearch) return;
		setSearchValue(e.target.value);
	};

	const handleSearch = () => {
		if (isSearch) {
			return;
		}

		if (searchValue.trim() === '') {
			return;
		}

		setIsSearch(true);
		navigate(`/search?q=${searchValue}`);

		setTimeout(() => {
			setIsSearch(false);
		}, 100);
	};

	return (
		<div
			className={cn(
				`border-border-solid flex flex-1 items-center gap-2 rounded-full border-[2px]
				border-[#0373F3] bg-white py-2 pr-2 pl-5`,
				className
			)}
		>
			<input
				type='text'
				placeholder='Tìm kiếm'
				className='flex-1 outline-none'
				value={searchValue}
				onChange={handleInputChange}
			/>
			<div className='flex items-center gap-6'>
				<button className='flex items-center justify-center cursor-pointer'>
					<img
						className='drag-none h-3 w-3 md:h-4 md:w-4 xl:h-6 xl:w-6'
						src={CameraIcon}
						alt='Camera'
					/>
				</button>
				<button
					onClick={() => {
						handleSearch();
					}}
					className='cursor-pointer flex shrink-0 rounded-full bg-[#0373F3] px-3 py-2 xl:px-6
						xl:py-2.5'
				>
					<img
						className='drag-none h-3 w-3 md:h-4 md:w-4 xl:h-6 xl:w-6'
						src={SearchIcon}
						alt='Search'
					/>
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
