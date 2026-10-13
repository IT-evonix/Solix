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
  // designation: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Shiv Kumar Sarin",
    image: "/images/speakers/ShivKumarSarin3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Assoc Prof Liu Nan",
    image: "/images/speakers/LiuNan3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Yilin Ning",
    image: "/images/speakers/YilinNing3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Mr. Mark Lewis",
    image: "/images/speakers/MarkLewis3.png",
    content:
      "Solix Technologies",
  },
  {
    id: 1,
    name: "Dr. Dasmit Singh",
    image: "/images/speakers/DasmitSingh3.png",
    content:
      "Keynote & Hackathon Briefing",
  },
  {
    id: 1,
    name: "Shri Sunil Kumar Barnwal",
    image: "/images/speakers/SunilKumarBarnwal3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Kavitha Rajshekhar",
    image: "/images/speakers/KavithaRajshekhar3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Rahul Gupta",
    image: "/images/speakers/RahulGupta3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Donald E. Ingber",
    image: "/images/speakers/DonaldIngber3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Rakesh Kalapala",
    image: "/images/speakers/RakeshKalapala3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Mohit Bhandari",
    image: "/images/speakers/MohitBhandari3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Prof. Alejandro Sosnik",
    image: "/images/speakers/AlejandroSosnik3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. Jana M. Kainerstorfer",
    image: "/images/speakers/JanaKainerstorfer3.png",
    content:
      "Keynote Speaker",
  },
  {
    id: 1,
    name: "Dr. M. Srinivas",
    image: "/images/speakers/srinivas3.png",
    content:
      "Keynote Speaker",
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
      <div className="container-fluid" style={{position:"relative", zIndex:"5"}}>
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
                    slidesPerView: 6,
                  },
                }}
                className="testimonials_slider"
              >
                {sliderTestimonials.map((testimonial, index) => (
                  <SwiperSlide key={`${testimonial.id}-${index}`}>
                    <div className="testimonials_box">
                      <div className="testimonials_innerbox">
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <div className="testi_img">
                              <Image src={testimonial.image} alt={testimonial.name} width={180} height={160} />
                            </div>
                          </div>
                          <div className="col-lg-12 testi_head mb-1">
                            {testimonial.name}
                          </div>
                          {/* <div className="col-lg-12 mb-3">
                            {testimonial.designation}
                          </div> */}
                          <div className="col-lg-12 mb-3">
                            {testimonial.content}
                          </div>
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