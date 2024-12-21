import React from 'react';
 import s from "../styles/footer.module.css";
 import app__store from "../image/Frame 21.png";
 import playmarket from "../image/play market.png";
 import set_1 from "../image/socials.png";
 import set_2 from "../image/socials (1).png";
 import set_3 from "../image/socials (2).png";
 import { FaPhone } from "react-icons/fa6";
import Image from 'next/image';
import { MdEmail } from "react-icons/md";
import logo from "../image/logo_footer.png";
export default function footer() {
  return (
    <div className={s.footer}>
      <div className={s.footer__body}>
<div className={s.footer__item}>
<Image src={logo} alt="" />
<h1> <FaPhone style={{fontSize:'15px'}} /> +998 94 545 2266</h1>
<h1 style={{fontWeight:"100"}}><MdEmail /> info@rce.uz</h1>
</div>
<div className={s.footer__item}>
  <h2>Biz haqimizda</h2>
  <p>Tariximiz</p>
  <p>Magazin ma’lumotlari</p>
  <p>Rekvizitlar</p>
  <p>Hamkorlarimiz</p>

</div>
<div className={s.footer__item}>
<h2>Online xarid</h2>
  <p>Qanday buyutma berish</p>
  <p>Yetkazib berish</p>
  <p>To’lov qilish </p>
  <p>Buyutma holati</p>
</div>
<div className={s.footer__item}>
  <p>Radio City Buxoro</p>
  <p>Radio City Toshkent</p>
  <p>Radio City Samarqand</p>
  <p>Radio City Navoiy</p>
  <p>Radio City Farg’ona</p>
</div>
<div className={`${s.footer__item}  ${s.large}` }>
 <div> <Image src={playmarket} alt="" /> <br />
 <Image src={app__store} alt="" /></div>
<div className={s.set__image}>
<Image src={set_1} alt="" />
<Image src={set_2} alt="" />
<Image src={set_3} alt="" />
</div>
</div>
      </div>
<div className={s.footer__line}></div>
<div className={s.footer__p}>
Magazin va Optimchilar
</div>
    </div>
  )
}
