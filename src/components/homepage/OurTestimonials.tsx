"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  content: string;
  designation: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ramon Gibson",
    designation: "Assistant Teacher",
    image: "/images/speakers1.png",
    content:
      "Lorem Ipsum has been the standard dummy",
  },
  {
    id: 2,
    name: "Stella Robinson",
    designation: "Assistant Teacher",
    image: "/images/speakers2.png",
    content:
      "Lorem Ipsum has been the standard dummy",
  },
  {
    id: 3,
    name: "Megan Cade",
    designation: "Assistant Teacher",
    image: "/images/speakers3.png",
    content:
      "Lorem Ipsum has been the standard dummy",
  },
  {
    id: 4,
    name: "Paul Phelan",
    designation: "Assistant Teacher",
    image: "/images/speakers4.png",
    content:
      "Lorem Ipsum has been the standard dummy",
  },
  {
    id: 5,
    name: "Wendy Buckley",
    designation: "Assistant Teacher",
    image: "/images/speakers5.png",
    content:
      "Lorem Ipsum has been the standard dummy",
  },
];

// Duplicate data for smoother infinite loop
const sliderTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export default function OurTestimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="speakers_section">
      <div className="container" style={{position:"relative", zIndex:"5"}}>
        <div className="row">
            <div className="col-lg-12 heading35_black mb-5 text-center" style={{color:"#fff"}}>Our Speakers</div>
        </div>
        {/* <div className="row">
            <div className="col-lg-12 mb-3 text-center mb-5" style={{color:"#fff"}}>
              The three-day programme provides a strong narrative for the digital experience
            </div>
        </div> */}
        <div className="row">
          <div className="col-lg-12">
            <div className="our_testimonials_inner">
              <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={true}
                speed={1000}
                spaceBetween={0}
                slidesPerView={1}
                watchOverflow={false}
                observer={true}
                observeParents={true}
                observeSlideChildren={true}
                autoplay={{
                  delay: 123000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
                className="testimonials_slider"
              >
                {sliderTestimonials.map((testimonial, index) => (
                  <SwiperSlide key={`${testimonial.id}-${index}`}>
                    <div className="testimonials_box">
                      <div className="testimonials_innerbox">
                        <div className="row">
                          <div className="col-lg-12 mb-3 testi_img">
                            <Image src={testimonial.image} alt={testimonial.name} width={180} height={160} />
                          </div>
                          <div className="col-lg-12 testi_head mb-1">
                            {testimonial.name}
                          </div>
                          <div className="col-lg-12 mb-3">
                            {testimonial.designation}
                          </div>
                          {/* <div className="col-lg-12 mb-3">
                            {testimonial.content}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="testimonial-navigation">
                <button
                  type="button"
                  className="testimonial-prev"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  
                </button>

                <button
                  type="button"
                  className="testimonial-next"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="speaker_bg"></div>
    </section>
  );
}