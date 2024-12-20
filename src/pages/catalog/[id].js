"use client";
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/NavbarPage'
import Footer1 from "../../components/footer"
import s from "../../styles/catalog.module.css"
import MultiRangeSlider from '../../components/multiRangeSlider/MultiRangeSlider';
import { MdRefresh } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import Pagination from '../../components/pagnation/Pagnation';
import axios from 'axios';
import { useCart } from '../../host/CartContext';
import url from '@/host/host';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Catalog() {
  const { setCartCount } = useCart();
  const router = useRouter();
  const { id,title } = router.query;
  var [min2, setMin] = useState(0);
  var [max2, setMax] = useState(20000);
  var [data1,setData]=useState([])
  var [count,setCount]=useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; 

  function getProduct() {
    axios.get(`${url}/api/category/product/${id}?limit=12`)
      .then(res => {
        console.log('API Response:', res.data); // API javobini konsolga chiqarish
        setData(res.data);
      })
      .catch(err => {
        console.error('API Error:', err); // Xatolik yuz bersa, konsolga chiqarish
      });
  }

function buyProduct(image,title,code,price,id) {
  toast.success('Tovar muvaffaqiyatli sotib olindi!', {
    position: "top-right",
    autoClose: 3000, // 3 soniya davomida ko‘rsatish
    className: 'custom-toast',
  });
  var data_push={image,title,code,price,id,count:1}
  if(localStorage.getItem('shop')){
  var last_shop=JSON.parse(localStorage.getItem('shop'))
  }else{
    var last_shop=[]
  }

  var push1=true
  for (let i = 0; i < last_shop.length; i++) {
   if (last_shop[i].id===id){
    push1=false
    last_shop[i].count++
   }
  }
  if(push1){
last_shop.push(data_push)
  }
  setCartCount(last_shop.length)
  localStorage.setItem("shop",JSON.stringify(last_shop))
}

  useEffect(()=>{
    getProduct()
  },[id]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div className={s.catalog__title}>{title}</div>
      <div className={s.catalog_body}>
        <div className={s.catalog_media_button}><FaFilter className={s.catalog_media_button__icons} /> Filter narxi</div>
        <div className={s.catalog_filter}>
          <h2>Summa</h2>
          <MultiRangeSlider
            min={0}
            max={20000}
            onChange={(e) => { setMin(e.min); setMax(e.max) }}
          />
          <div className={s.catalog_filter_result}>
            <div className={s.catalog_filter_min}>{min2}</div>
            <div className={s.catalog_filter_max}>{max2}</div>
          </div>
          <div className={s.catalog_filter_line}></div>
          <div className={s.catalog_filter_button}> <MdRefresh style={{ fontSize: '20px' }} /> Filterni tozalash</div>
        </div>
        <div className={s.catalog_cards}>
{data1 && data1.map((item,key)=>{
  return <div key={key} className={s.catalog_card}>
            <div className={s.catalog_card_image}>
              <img style={{cursor:'pointer'}}  onClick={()=>window.location=`/oneproduct/${item.id}`} className={s.catalog_image} src={item.images.rows[0].miniature.downloadHref}  alt="" />
              <h5 style={{cursor:'pointer'}}  onClick={()=>window.location=`/oneproduct/${item.id}`}>{item.pathName.slice(0,20)}</h5>
              <p style={{cursor:'pointer'}} onClick={()=>window.location=`/oneproduct/${item.id}`}>{item.name.slice(0,40)}{item.name.length>30?('...'):("")}</p>
              {(item.quantity || item.quantity==0)?<></>:<span className={s.count_product}><div>Sotuvda bor:</div>
            <div>{item.quantity}  dona</div></span>}
              <h1>{item.buyPrice.value/100} so`m</h1>
              <div onClick={()=>{buyProduct(`${item.images.rows[0].miniature.downloadHref}`,`${item.name}`,`${item.code}`,`${item.buyPrice.value/100}`,`${item.id}`)}} className={s.catalog_icons}>
                <TbShoppingBagPlus style={{ fontSize: '20px', color: '#6a6a6a' }} />
              </div>
            </div>
          </div>
})}      
        </div>
      </div>


      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
       <ToastContainer />
      <Footer1 />
    </div>
  )
}
