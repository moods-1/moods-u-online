import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeftSharp, ChevronRightSharp } from '@mui/icons-material';

const CustomSlider = ({ data }) => {
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [allowNext, setAllowNext] = useState(true);
	const mainBoxRef = useRef();
	const elRef = useRef();
	const carouselRef = useRef();

	const handleNext = () => {
		const move = allowNext && carouselIndex < data.length;
		if (move) {
			const step = carouselIndex + 1;
			const move = step * 240;
			carouselRef.current.style.transform = `translateX(-${move}px)`;
			setCarouselIndex((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (carouselIndex > 0) {
			const step = carouselIndex - 1;
			const move = step * 240;
			carouselRef.current.style.transform = `translateX(-${move}px)`;
			setCarouselIndex((prev) => prev - 1);
		}
	};

	const intersectionCb = (entries) => {
		const [entry] = entries;
		setAllowNext(entry.isIntersecting ? false : true);
	};

	useEffect(() => {
		const options = (el) => {
			const elWidth = el.clientWidth / 2;
			return {
				root: null,
				rootMargin: `0px -${elWidth}px 0px 0px`,
				threshold: 1,
			};
		};

		if (data.length) {
			if (elRef.current) {
				const el = elRef?.current;
				const observer = new IntersectionObserver(intersectionCb, options(el));
				observer.observe(el);
				return () => {
					observer.unobserve(el);
				};
			}
		}
	}, [data, elRef]);

	return (
		<div
			className='slider-main relative w-full overflow-hidden'
			ref={mainBoxRef}
		>
			<div className='flex py-4 gap-4 relative carousel-div' ref={carouselRef}>
				{data.map((course, idx) => (
					<span ref={elRef} key={idx}>
						{course}
					</span>
				))}
			</div>
			{carouselIndex > 0 && (
				<div className='slider-nav slider-nav-left' onClick={handlePrev}>
					<ChevronLeftSharp fontSize='large' sx={{ color: '#fff' }} />
				</div>
			)}

			{data.length > 1 && (
				<div className='slider-nav slider-nav-right' onClick={handleNext}>
					<ChevronRightSharp fontSize='large' sx={{ color: '#fff' }} />
				</div>
			)}
		</div>
	);
};

export default CustomSlider;
