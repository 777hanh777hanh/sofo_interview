import HeroImage from '@/assets/images/banner.png';
import { ProductSlider } from '@/components';
import { MOCK_PRODUCTS } from '@/constants';

const Hero = () => {
	return (
		<div className='bg-[#025FCA] overflow-hidden rounded-md lg:rounded-lg xl:rounded-xl'>
			<div className='container mx-auto flex flex-col'>
				<div>
					<img src={HeroImage} alt='Hero' />
				</div>

				<div className='flex flex-col gap-6 p-6 lg:p-8 xl:p-12'>
					{/* Product Slider */}
					<ProductSlider
						products={MOCK_PRODUCTS}
						autoScroll={true}
						autoScrollDelay={4000}
						showDots={false}
						itemsToShow={5}
						gap={20}
						showNavigation={true}
						className='w-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
