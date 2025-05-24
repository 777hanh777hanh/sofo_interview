import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import chevronUp from '@/assets/icons/chevron-up.svg';
import { smoothScrollToTop } from '@/utils/smoothScroll';

import styles from './Default.module.css';

const Default = ({ children }: { children: React.ReactNode }) => {
	const [isGoTop, setIsGoTop] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setIsGoTop(window.scrollY > 100);
		});
	}, []);

	return (
		<>
			<div className='font-primary mx-auto flex min-h-screen flex-col'>
				<Header />
				{children}
				<Footer />
			</div>

			<button
				type='button'
				className={`fixed right-12 bottom-20 z-50 cursor-pointer rounded-full border-1 border-solid
					border-[#013065] bg-transparent p-2 md:right-8 md:bottom-14 ${
					isGoTop ? styles.showOnTop : styles.hideOnTop } `}
				onClick={() => smoothScrollToTop()}
			>
				<img src={chevronUp} alt='chevron-up' className='h-6 w-6' />
			</button>
		</>
	);
};

export default Default;
