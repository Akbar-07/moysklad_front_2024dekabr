
import s from "../styles/sliderproduct.module.css"
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function index_slider({color,data,mapdata,id}) {
    // SwiperCore.use([Navigation, Pagination, Autoplay]);
    const swiperRef = useRef(null);

    const handleNextSlide = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    };
  
    const handlePrevSlide = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slidePrev();
      }
    };

  return (
    <div>
<main  style={{backgroundColor:`${color}`}} className={s.top_slider}>
    <div className={s.main_1}>
        <h1 className={s.main_1__h1}>{data && data.title}  </h1>
    <Swiper
className={s.header_carousel}
ref={swiperRef}
      slidesPerView={4}
      loop={true}
      breakpoints={{
        // Breakpoints
        220: {
          slidesPerView: 2,
          spaceBetween: 10

        },   420: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20
        },
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
        {mapdata && mapdata.map((item,key)=>{
            return  <SwiperSlide>
        <div onClick={()=>window.location=`/oneproduct/${item.id}`} className={s.card}>
            <div className={s.card_img}>
                <img src={item.images.rows[0].miniature.downloadHref} alt="" />
            </div>
            <h5>{item.pathName.slice(0,20)}</h5>
            <p>{item.name.slice(0,40)}{item.name.length>30?('...'):("")}</p>
            {(item.quantity || item.quantity==0)?<></>:<div className={s.count_product}><div>Sotuvda bor:</div>
            <div>{item.quantity} dona</div></div>}
            <h2>{item.buyPrice.value/100} so`m</h2>

        </div>
      </SwiperSlide>
        })}
    
  
      {/* Add more slides as needed */}
    </Swiper>
    </div>
    <div className={s.main_2}>
      <div className={s.button_roll}>  <FaArrowLeftLong onClick={handlePrevSlide}/>
    <FaArrowRightLong onClick={handleNextSlide} /> </div>
    <div className={s.section2}>
       <div className={s.wer12} style={{width:'98%',margin:'auto'}}>
       <h2>{data && data.h1}</h2>
<p>{data && data.p}</p>
       </div>
<button onClick={()=>{window.location=`/catalog/${id}?title=${data && data.title}`}}>Tanlovga o'ting</button>
    </div>

       </div>
</main>

    </div>
  )
}
