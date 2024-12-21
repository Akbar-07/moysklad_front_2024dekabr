"use client";
import s from "../styles/navbar.module.css"
import Image from 'next/image'
import image_sum from "../image/kalkulyator1.png"
import logo from "../image/logo.svg"
import acaunt from "../image/acaunt.png"
import bom from "../image/bom.png"
import status_zakaz from "../image/status_zakaz 1.png"
import korzinka from "../image/korzinka.png"
import { CgMenuGridR } from "react-icons/cg";
import { RiMapPin2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoMenuSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import url from "../host/host";
import { useCart } from '../host/CartContext';
import axios from "axios";
export default function Navbar() {
    const { cartCount } = useCart();
    var [company, setCompany] = useState({})
    var [subcategory__id,setSubcategory__id]=useState(0)
    var [opentogle, setOpentoggle] = useState(false)
    var [category, setCategory] = useState([])
    var [subCategory, setSubCategory] = useState([])
    var [page, setPage] = useState(true)
    var [searchKey,setSearchKey]=useState('')
    var [allcategory,setAllCategory]=useState([])
    var openpage = () => {
        if (page) {
            document.querySelector('#katalog_page').style = 'display:block'
            setPage(false)
        } else {
            document.querySelector('#katalog_page').style = 'display:none'
            setPage(true)
        }
    }
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    function getCompany() {
        axios.get(`${url}/api/company`).then(res => {
            if (res.data.length > 0) {
                setCompany(res.data[0])
            } else {
                setCompany({})
            }
        }).catch(err => {
        })
    }



    
    function getCategory(params) {
        axios.get(`${url}/api/category`).then(res => {
            setAllCategory(res.data)
            const category_res = res.data.filter(obj => obj.subcategory === 0);
            const subcategory_res = res.data.filter(obj => obj.subcategory !== 0);
            setCategory(category_res)
            setSubCategory(subcategory_res)
        }).catch(err => {

        })
    }


    var [product,setProduct]=useState([])
function getProduct() {
    axios.get(`${url}/api/product?limit=10000`).then(res=>{
setProduct(res.data)
    })
}

    useEffect(() => {
        getCompany()
        getCategory()
        getProduct()
    }, [])
    return (
        <div className={s.navbar_body}>
            <div className={s.navbar_bottom}>
                <div className={s.navbarlogo}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img src={company.image} className={s.navbarlogo_img} alt="" />
                    </a>
                    <div style={{ display: 'block', marginTop: '30px' }} className="routpage">
                        <div className={s.navbar_location}>
                            <RiMapPin2Fill className='navbar_location__icons' />
                            <h5 className={s.navbar__country}>
                                {company.address}
                            </h5>
                        </div>
                        <ul style={{ paddingTop: '8px' }} className={s.navbar__action}>
                            <a href="/bizhaqimizda/" style={{ textDecoration: 'none', color: 'black' }}>  <li className={s.navbar__action_item} id={s.none__media}>
                                RadioCity Tashkiloti
                            </li></a>
                            <a href="/storage/" style={{ textDecoration: 'none', color: 'black' }}>  <li className={s.navbar__action_item} id={s.none__media}>
                                Tariximiz
                            </li></a>
                            <a href="/contact/" style={{ textDecoration: 'none', color: 'black' }}>  <li className={s.navbar__action_item} id={s.none__media}>
                                Kontaktlar
                            </li></a>
                            <a href="/bizhaqimizda/" style={{ textDecoration: 'none', color: 'black' }}> <li className={s.navbar__action_item} id={s.none__media}>
                                Biz haqimizda
                            </li></a>
                        </ul>
                    </div>

                </div>
                <ul className={s.navbar__action}>
                    <a href={'tel:' + company.phone} style={{ textDecoration: 'none', color: 'black' }}> <li style={{ display: 'flex', gap: '10px' }} className={s.navbar__action_item} id={s.none__media}>
                        <FaPhone />
                        + {company.phone}
                    </li></a>
                   <a style={{textDecoration:'none',color:'black'}} href="/karzinka/"><li className={s.navbar__action_item}>
                        <div className={s.navbar_savat}>
                            <div className={s.count__nomber}>{cartCount}</div>
                            <Image className={s.karzinka__image} src={korzinka} alt="" /> <br />
                        </div>
                        <div id={s.none__media}>Savat</div>
                    </li></a> 
                    <li className={s.none__pk__toggle}>
                        <IoMenuSharp onClick={() => setOpentoggle(true)} style={{ fontSize: "24px" }} />
                    </li>
                    <div style={opentogle ? { right: '0px' } : { right: '-120%' }} id="toollbr" className={s.menu__bar}>
                        <div className={s.close__toggle} onClick={() => setOpentoggle(false)}><IoClose style={{ fontSize: "18px" }} /></div>
                        <ul className="toolbar__ul">
                           <a href="/bizhaqimizda/" style={{textDecoration:'none',color:'black'}} > <li className={s.toolbar__li}>RadioCity Tashkiloti</li></a>
                           <a href="/storage/" style={{textDecoration:'none',color:'black'}} > <li className={s.toolbar__li}>Tariximiz</li></a>
                           <a href="/contact/" style={{textDecoration:'none',color:'black'}} > <li className={s.toolbar__li}>Kontaktlar</li></a>
                           <a href="/bizhaqimizda/" style={{textDecoration:'none',color:'black'}} > <li className={s.toolbar__li}>Biz haqimizda</li>
</a>
<a href={`tel:+${company.phone}`} style={{textDecoration:'none',color:'black'}}><li className={s.toolbar__li}><FaPhone />+ {company.phone}</li></a>
                        </ul>
                    </div>
                </ul>
            </div>
            <div className={s.navbar__filter}>
                <div onClick={() => openpage()} className={s.navbar__filter__katalog}>
                    <CgMenuGridR style={{ fontSize: "18px" }} />
                    <h5>Kataloglar</h5>
                </div>
                <div className={s.navbar__filter__search}>
                    <CiSearch className={s.search__icons} />
                    <input onKeyUp={(e) => {
                        setSearchKey(e.target.value)
                        if ((e.target.value).length > 0) {
                            document.querySelector('#searchresult').style = "display:block"
                        } else {
                            document.querySelector('#searchresult').style = "display:none"
                        }
                    }} type="text" placeholder='2 000 000 dan ortiq tavar bor' />
                    <div id="searchresult" className={s.searchResalt}>
                        <ul>
                        {product
    .filter((item) => item.name.includes(searchKey)) 
    .slice(0, 10)
    .map((item, key) => (
        <li style={{cursor:'pointer'}} key={key} onClick={()=>window.location=`/oneproduct/${item.id}`}>{item.name}</li> 
    ))}
                           
                          
                        </ul>
                    </div>
                </div>
                <div id="katalog_page" onMouseLeave={openpage} className={s.katalogPage}>
                    <div className={s.katalogPage__category}>

                        <div className={s.accordion}>
                            {category.map((item, index) => (
                                <div className={s.accordionitem} key={index}>
                                    <div className={s.accordionheader} onClick={() =>{toggleAccordion(index);setSubcategory__id(item.id)}}>
                                        {item.category_title}
                                        <span className={s.arrow}>
                                            {activeIndex === index ? <FaChevronUp style={{fontSize:'14px'}} /> : <FaChevronDown  style={{fontSize:'14px'}}  />}
                                        </span>
                                    </div>
                                    {activeIndex === index && (
                                        <div className={s.accordioncontent}>
                                           {subCategory.map((item,key)=>{
    if(item.subcategory===subcategory__id){
return <p onClick={()=>window.location=`/catalog/${item.category_id}?title=${item.category_title}`} >{item.category_title}</p>
    }
})}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <ul className={s.katalogPage__category__ul} >
                           {category.map((item,key)=>{
                            return <li onClick={()=>setSubcategory__id(item.id)} className={s.katalogPage__category__li}><p>
                                {item.category_title}
                                </p><MdArrowForwardIos /></li>
                           })} 
                        </ul>
                        <div className={s.katalogPage__category__cards}>
{subCategory.map((item,key)=>{
    if(item.subcategory===subcategory__id){
return <p onClick={()=>window.location=`/catalog/${item.category_id}?title=${item.category_title}`}>{item.category_title}</p>
    }
})}
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
