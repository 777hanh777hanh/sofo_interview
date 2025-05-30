import Default from '@/layouts/Default';
import CallToAction from '@/components/CallToAction';
import Breadcrumb from '@/components/Breadcrumb';
import Features from '@/components/Features';
import Hero from '@/components/Hero';

const HomePage = () => {
	return (
		<Default>
			<div className='mx-auto mt-4 container flex flex-col gap-4 lg:mt-6 lg:gap-6 xl:gap-8'>
				{/* Breadcrumb */}
				<Breadcrumb
					items={[
						{ url: '/', label: 'Home' },
						{ url: '/about', label: 'About' },
						{ url: '/contact', label: 'Contact' }
					]}
				/>

				{/* Hero */}
				<Hero />

				{/* Content */}

				{/* Features */}
				<Features />
			</div>
			{/* call to action */}
			<CallToAction />
		</Default>
	);
};

export default HomePage;
