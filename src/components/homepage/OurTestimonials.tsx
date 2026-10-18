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
    name: "Dr. Shiv Kumar Sarin",
    image: "/images/speakers/ShivKumarSarin3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Shiv Kumar Sarin is a globally renowned gastroenterologist, hepatologist, and the Founding Director and Chancellor of the Institute of Liver and Biliary Sciences (ILBS), New Delhi.",
  },
  // {
  //   id: 1,
  //   name: "Assoc Prof Liu Nan",
  //   image: "/images/speakers/LiuNan3.png",
  //   content:
  //     "Keynote Speaker",
  // },
  // {
  //   id: 1,
  //   name: "Dr. Yilin Ning",
  //   image: "/images/speakers/YilinNing3.png",
  //   content:
  //     "Keynote Speaker",
  // },
  {
    id: 1,
    name: "Mr. Mark Lewis",
    image: "/images/speakers/MarkLewis3.png",
    title: "Solix Technologies",
    content:
      "Mr. Mark Lewis is a senior enterprise data strategist and domain expert representing Solix Technologies. His core expertise lies in AI-ready data governance, quality assurance",
  },
  {
    id: 1,
    name: "Dr. Dasmit Singh",
    image: "/images/speakers/DasmitSingh3.png",
    title: "Keynote & Hackathon Briefing",
    content:
      "Dr. Dasmit Singh is a senior pediatric surgeon, medical educator, and Secretary of CURIE at Symbiosis Medical College for Women (SMCW). With over three decades of clinical",
  },
  {
    id: 1,
    name: "Shri Sunil Kumar Barnwal",
    image: "/images/speakers/SunilKumarBarnwal3.png",
    title: "Keynote Speaker",
    content:
      "Shri Sunil Kumar Barnwal, IAS, serves as the Chief Executive Officer of the National Health Authority (NHA), leading India’s flagship digital health ecosystem initiatives. His leadership",
  },
  {
    id: 1,
    name: "Dr. Kavitha Rajshekhar",
    image: "/images/speakers/KavithaRajshekhar3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Kavitha Rajshekhar is a scientist and policymaker at the Department of Health Research (DHR), Ministry of Health and Family Welfare, Government of India. She plays a pivotal",
  },
  {
    id: 1,
    name: "Dr. Rahul Gupta",
    image: "/images/speakers/RahulGupta3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Rahul Gupta is a physician executive, public health leader, and President of GATC Health. His work focuses on integrating artificial intelligence, advanced multiomics, and",
  },
  {
    id: 1,
    name: "Dr. Donald E. Ingber",
    image: "/images/speakers/DonaldIngber3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Donald E. Ingber, M.D., Ph.D., is a pioneer in the fields of bioinspired engineering, mechanobiology, and microfluidic tissue engineering. As the Founding Director of Harvard’s",
  },
  {
    id: 1,
    name: "Dr. Rakesh Kalapala",
    image: "/images/speakers/RakeshKalapala3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Rakesh Kalapala is a senior clinician and Vice President & Director at the Centre for AI and Innovation, AIG Hospitals. His expertise centers on integrating artificial intelligence,",
  },
  {
    id: 1,
    name: "Dr. Mohit Bhandari",
    image: "/images/speakers/MohitBhandari3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Mohit Bhandari is a world-renowned bariatric, metabolic, and robotic surgeon, recognized as a global pioneer in minimally invasive and robotic-assisted surgery. As the",
  },
  {
    id: 1,
    name: "Prof. Alejandro Sosnik",
    image: "/images/speakers/AlejandroSosnik3.png",
    title: "Keynote Speaker",
    content:
      "Prof. Alejandro Sosnik is a Full Professor of Materials Science and Engineering at Technion – Israel Institute of Technology, where he leads the Laboratory of Pharmaceutical Nanomaterial Science. ",
  },
  {
    id: 1,
    name: "Dr. Jana M. Kainerstorfer",
    image: "/images/speakers/JanaKainerstorfer3.png",
    title: "Keynote Speaker",
    content:
      "Dr. Jana M. Kainerstorfer is an Associate Professor of Biomedical Engineering at Carnegie Mellon University and Principal Investigator of the Biophotonics Lab. Her research",
  },
  // {
  //   id: 1,
  //   name: "Dr. M. Srinivas",
  //   image: "/images/speakers/srinivas3.png",
  //   content:
  //     "Keynote Speaker",
  // },
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
                          <div className="col-lg-12 mb-3 testi_title">
                            <span>{testimonial.title}</span>
                          </div>
                          <div className="col-lg-12 testi_head mb-1">
                            {testimonial.name}
                          </div>
                          <div className="col-lg-12 testi_content mb-4">
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
          <div className="col-lg-12 mt-5 mb-5 text-center">
              <Link href="/speakers" className="button_box">View More Speakers</Link>
          </div>
        </div>
      </div>
      {/* <div className="speaker_bg"></div> */}
    </section>
  );
}