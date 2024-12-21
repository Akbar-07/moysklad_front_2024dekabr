import React from 'react'
import Navbar1 from '../components/NavbarPage'
import Footer1 from '../components/footer'
import s from "../styles/contact.module.css"
import Image from 'next/image'
import socials1 from "../image/socials.png"
import socials2 from "../image/socials (1).png"
import socials3 from "../image/socials (2).png"

export default function page() {
  return (
    <div>
      <div style={{padding:"20px"}}>
        <Navbar1/>
<div className={s.contact__title}>
  Kontakt ma’lumotlari
</div>
<div className={s.contact_body}>
  <div className={s.contact_text}>
   <h5>Do'konimizdan olib ketish - bepul, tez va oson</h5>
   <h4>Manzil:</h4>
   <p>Surgut, st. G'alabaning 30 yilligi, 10</p>
   <h4>Telefon:</h4>
   <p>+998 94 545 2266</p>
   <h4>Elektron pochta:</h4>
   <p>info@rce.uz</p>
   <h4>Ish soatlari:</h4>
   <p>
   Dushanba – Shanba  9:00–20:00
   Yakshanba                10:00–18:00
   </p>
   <div className={s.sotsial_set}>
    <Image src={socials1} alt="" />
    <Image src={socials2} alt="" />
    <Image src={socials3} alt="" />
   </div>
  </div> 
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.461706775961!2d64.38504687663476!3d39.77419277155008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5009a0c8ce8e35%3A0x4afb61346e1c02f2!2sRadioCity%20Electronics!5e0!3m2!1suz!2s!4v1733661653068!5m2!1suz!2s" className={s.map_contact}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
</div>
<Footer1 />
    </div>
  )
}
