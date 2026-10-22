"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  content: string;
  title: string;
  // designation: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr Dasmit Singh Khokar",
    image: "/images/speakers/DasmitSingh.png",
    title: "Keynote Speaker",
    content:
      "Paediatric Surgeon & Surgical Innovator, Pune, India",
  },
  {
    id: 1,
    name: "Prof. (Dr) Ramakrishnan Raman",
    image: "/images/speakers/RamakrishnanRaman2.png",
    title: "Keynote Speaker",
    content:
      "Vice Chancellor, SIU",
  },
  {
    id: 1,
    name: "Dr Rakesh Kalapala",
    image: "/images/speakers/RakeshKalapala.png",
    title: "Keynote Speaker",
    content:
      "Gastroenterologist & Director of Endoscopy, AIG Hospitals, Hyderabad, India",
  },
  {
    id: 1,
    name: "Dr Sumer Sethi",
    image: "/images/speakers/SumerSethi.png",
    title: "Panelist",
    content:
      "Radiologist, Founder – DAMS",
  },
  {
    id: 1,
    name: "Dr (Brig.) Suman Pramanik",
    image: "/images/speakers/noimg.png",
    title: "Debate",
    content:
      "Professor & Head, Department of Medicine, AFMC, Pune",
  },
  {
    id: 1,
    name: "Dr Ashish Rawandale-Patil",
    image: "/images/speakers/AshishRawandalePatil.png",
    title: "Panelist",
    content:
      "Urologist, Dhule, Maharashtra, India",
  },
  {
    id: 1,
    name: "Dr. Sridhar Bodapati",
    image: "/images/speakers/SridharBodapati.png",
    title: "Panelist",
    content:
      "Paediatrician, Healthcare IT Leader & Founder – EdQueries",
  },
  {
    id: 1,
    name: "Dr A. V. S. Suresh",
    image: "/images/speakers/AVSSuresh.png",
    title: "Moderator",
    content:
      "Medical Oncologist & Haematologist, Hyderabad, India",
  },
  {
    id: 1,
    name: "Dr Ashlesha Kelkar",
    image: "/images/speakers/AshleshaKelkar.png",
    title: "Moderator",
    content:
      "Vertical Lead – Digital Health Community Medicine",
  },
  {
    id: 1,
    name: "Gp Capt (Dr) S. A. Raheem",
    image: "/images/speakers/SARaheem.png",
    title: "Panelist",
    content:
      "Radiologist, Associate Professor - Armed Forces Medical College (AFMC), Pune",
  },
  {
    id: 1,
    name: "Dr Arun Jamkar",
    image: "/images/speakers/ArunJamkar.png",
    title: "Moderator",
    content:
      "Distinguished Professor | Healthcare Innovation & Medical Education Symbiosis International (Deemed University), Pune, India",
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
    <section className="speakers_section" id="speakers">
      <div className="container-fluid" style={{position:"relative", zIndex:"5"}}>
        <div className="row">
            <div className="col-lg-12 heading35_black mb-5 text-center">Our Speakers</div>
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
                          <div className="col-lg-12 mb-3">
                            <div className="testi_img">
                              <Image src={testimonial.image} alt={testimonial.name} width={180} height={160} />
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3 testi_title">
                            <span>{testimonial.title}</span>
                          </div>
                          <div className="col-lg-12 testi_head mb-1">
                            {testimonial.name}
                          </div>
                          <div className="col-lg-12 testi_content mb-4">
                            {testimonial.content}
                          </div>
                          <div className="col-lg-12 mb-4">
                            <Link href="/speakers">View Profile</Link>
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
          <div className="col-lg-12 mt-5 mb-5 text-center">
              <Link href="/speakers" className="button_box">View More</Link>
          </div>
        </div>
      </div>
      {/* <div className="speaker_bg"></div> */}
    </section>
  );
}