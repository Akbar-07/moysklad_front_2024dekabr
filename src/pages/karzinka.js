"use client";

// import logo from './logo.svg';
import s from "../styles/Cart.module.css";
import { FaTrash } from "react-icons/fa";
import img1 from "../image/image37.png";
import img2 from "../image/image38.png";
import img3 from "../image/Group151.png";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Navbar1 from "../components/NavbarPage";
import Footer1 from "../components/footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
function page() {


  var [data, setData] = useState([])
  var [allSum, setAllSum] = useState(0)
var [count_1,setCount_1]=useState(0)


function sotibOlinganlar() {
  var input_1 = document.querySelectorAll('.one_input')
  var a=0
  for (let i = 0; i < input_1.length; i++) {
   if(input_1[i].checked){
    a++
   }
  }
  setCount_1(a)
}

  function getData() {
    setTimeout(() => {
      var input_1 = document.querySelectorAll('.one_input')
      for (let i = 0; i < input_1.length; i++) {
        input_1[i].checked = true
      }
      setTimeout(() => {
        calkulator()
      }, 2000);
    }, 1000);

  }

  function calkulator() {
    var input_1 = document.querySelectorAll('.one_input')
    var test_sum = 0
    for (let i = 0; i < input_1.length; i++) {
      if (input_1[i].checked) {
        test_sum = test_sum + JSON.parse(localStorage.getItem('shop'))[i].price * JSON.parse(localStorage.getItem('shop'))[i].count
      }
    }
    setAllSum(test_sum)
    hammasi_bosilganmi()
    sotibOlinganlar()
  }




  function click_check() {
    if (document.querySelector("#for_all_check input").checked == false) {
      document.querySelector("#for_all_check input").checked = true;
    } else {
      document.querySelector("#for_all_check input").checked = false;
    }
    chack_box()

  }

  function next_check() {
    document.querySelector("#for_paddings").style = "display:block"
    document.querySelector("#for_black_card").style = "display:block"
    document.querySelector("body").style = "overflow:hidden"
    document.querySelector("#checkout_1").style = "display:block"
    document.querySelector("#checkout_2").style = "display:none"
  }

  function exit_check() {
    document.querySelector("#for_paddings").style = "display:none"
    document.querySelector("#for_black_card").style = "display:none"
    document.querySelector("body").style = "overflow-y:scroll"
  }

  function nexts_check() {
    sotibOlish()
    document.querySelector("#checkout_1").style = "display:none"
    document.querySelector("#checkout_2").style = "display:block"
    document.querySelector("body").style = "overflow:hidden"
  }
  function deleteData(key) {
    var testData = [...data]
    testData.splice(key, 1)
    setData(testData)
    localStorage.setItem('shop', JSON.stringify(testData))
    var input_1 = document.querySelectorAll('.one_input')
    var test_sum = 0

    for (let i = 0; i < input_1.length - 1; i++) {
      if (input_1[i].checked) {
        test_sum = test_sum + testData[i].price * testData[i].count
      }
    }
    setAllSum(test_sum)
    setCount_1(count_1-1)
  }
  function minusData(key) {
    var testData = [...data]
    var splite = false
    if (testData[key].count <= 1) {
      testData.splice(key, 1)
      splite = true
    } else {
      testData[key].count = testData[key].count - 1
    }
    setData(testData)
    localStorage.setItem('shop', JSON.stringify(testData))
    var input_1 = document.querySelectorAll('.one_input')
    var test_sum = 0
    if (splite) {
      for (let i = 0; i < input_1.length - 1; i++) {
        if (input_1[i].checked) {
          test_sum = test_sum + testData[i].price * testData[i].count
        }
      }
      setCount_1(count_1-1)
    } else {
      for (let i = 0; i < input_1.length; i++) {
        if (input_1[i].checked) {
          test_sum = test_sum + testData[i].price * testData[i].count
        }
      }
    }


    setAllSum(test_sum)
    sotibOlinganlar()
  }

  function hammasi_bosilganmi() {
    document.querySelector('#button_delete').style = "display:flex"
    var input_1 = document.querySelectorAll('.one_input')
    var a = 0
    for (let i = 0; i < input_1.length; i++) {
      if (input_1[i].checked) {
        a++
      } else {
        a--
      }
    }

    if (a == input_1.length) {
      document.querySelector('#for_all_check input').checked = true
    } else if ((-a) == input_1.length) {
      document.querySelector('#for_all_check input').checked = false
      document.querySelector('#button_delete').style = "display:none"
    }
  }
  function plusData(key) {
    var testData = [...data]
    testData[key].count = testData[key].count + 1
    setData(testData)
    localStorage.setItem('shop', JSON.stringify(testData))
    var input_1 = document.querySelectorAll('.one_input')
    var test_sum = 0
      ;

    for (let i = 0; i < input_1.length; i++) {
      if (input_1[i].checked) {
        test_sum = test_sum + testData[i].price * testData[i].count
      }
    }
    setAllSum(test_sum)
  }
  function deleteAll() {
    var a = []
    var input_1 = document.querySelectorAll('.one_input')
    for (let i = 0; i < input_1.length; i++) {

      if (!input_1[i].checked) {
        a.push(data[i])
      }
      input_1[i].checked = false
    }
    setData(a)
    setAllSum(0)
    document.querySelector('#for_all_check input').checked = false
    localStorage.setItem('shop', JSON.stringify(a))
  }

  function chack_box() {
    var a = 0
    if (document.querySelector('#for_all_check input').checked) {
      var input_1 = document.querySelectorAll('.one_input')
      for (let i = 0; i < input_1.length; i++) {
        input_1[i].checked = true
      }
      document.querySelector('#button_delete').style = "display:flex"
    } else {
      var input_1 = document.querySelectorAll('.one_input')
      for (let i = 0; i < input_1.length; i++) {
        input_1[i].checked = false
      }
      document.querySelector('#button_delete').style = "display:none"
    }
    console.log(a, input_1.length);


    calkulator()
  }
  const sendMessage = async (chatId, message) => {
    const botToken = '7598395550:AAFGsDx1WnlZr6WNIrFbDMfkwzsVeMcGtko'; // o'z tokeningizni kiriting
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
        });
        console.log('Xabar yuborildi:', response.data);
    } catch (error) {
        console.error('Xabar yuborishda xato:', error);
    }
};
function sotibOlish() {
  var input_1 = document.querySelectorAll('.one_input')
var message=`Yangi buyurtma`+` %0A `
message+="Buyurtmachi:"+document.querySelectorAll('#checkout_1 input')[0].value+`%0A`
message+="Nomeri:"+document.querySelectorAll('#checkout_1 input')[1].value+`%0A`

for (let i = 0; i < input_1.length; i++) {
 if (input_1[i].checked) {
  message=message+`nomi:`+data[i].title+` %0A `
  message+=`narxi:`+data[i].price+` %0A `
  message+=`soni:`+data[i].count+` %0A `
 }
  
}

message+=`Jami:`+allSum
sendMessage(-1002481822428,message)
deleteAll()
}

  useEffect(() => {
    let mapdata
    if (localStorage.getItem('shop')) {
      mapdata = JSON.parse(localStorage.getItem('shop'))
    } else {
      mapdata = []
    }
    setData(mapdata)
    getData()
    document.querySelector('#for_all_check input').checked = true

  }, [])




  return (
    <div className={s.App}>
      <div style={{padding:"20px"}}>
      <Navbar1 />
      <div className={s.card_main}>
        <h1>Savat</h1>
        <div className={s.flexs_main}>
          <div className={s.card_left}>
            <div className={s.for_all_check} id="for_all_check">
              <input onClick={() => chack_box()} type="checkbox" />
              <h3 onClick={() => { click_check() }} >Barchasi</h3>
              <div id="button_delete" style={{ display: 'flex', gap: '5px' }} onClick={() => deleteAll()} > <FaTrash className={s.trash_icon} />
                <h4>o’chirish</h4></div>
            </div>
            {data.map((item, key) => {
              return <div className={s.cart_card}>
                <div className={s.first_flex}>
                  <input className="one_input" onChange={() => calkulator()} type="checkbox" />
                  <div className={s.for_cart_img}>
                    <img src={item.image} alt="" />
                  </div>
                </div>
                <div className={s.cart_cent}>
                  <div className={s.top_section}>
                    <h3>
                      {item.title}
                    </h3>
                    <h5 className={s.bottom_text}>nom. raqam: {item.code}</h5>
                  </div>
                  <div className={s.seconds_left}>
                    <h4>{item.price} sum</h4>
                    <div className={s.for_plus_div}>
                      <FaPlus onClick={() => plusData(key)} className={s.plus_icons} />{" "}
                      <span style={{ padding: "0 5px" }}>{item.count}</span>
                      <FaMinus onClick={() => minusData(key)} className={s.plus_icons} />
                    </div>
                    <div className={s.for_flex}>
                      <h5 className={s.bold_sum}>{item.count * item.price} sum</h5>
                      <FaTrash onClick={() => deleteData(key)} className={s.trash_icon1} />
                    </div>
                  </div>
                </div>
              </div>
            })}

          </div>
          <div className={s.card_right}>
            <div className={s.for_align_cent}>
              <h3>Maxsulot ({count_1})</h3>
              <h4>
                <span>Jami:</span> <span>{allSum} sum</span>
              </h4>
              <button onClick={() => next_check()}>Buyurtma bering</button>

            </div>
          </div>
        </div>
      </div>
      <div className={s.for_black_card} id="for_black_card"></div>
      <div className={s.for_paddings} id="for_paddings">
        <div className={s.for_information_card}>
          <span className={s.x_icons} onClick={() => exit_check()}>&#x2715;</span>
          <div className={s.checkout_1} id="checkout_1">
            <h3>Ma’lumotlarni kiriting</h3>
            <h4>Ism Familiya</h4>
            <input type="text" />
            <h4>Telefon nomer</h4>
            <input type="text" />
            <button onClick={() => nexts_check()}>Jo’natish</button>
          </div>

          <div className={s.checkout_2} id="checkout_2">
            <h3>Ma’lumotingiz jo’natildi</h3>
            <Image src={img3} alt="" />
            <p>Tez orada sizga aloqaga chiqamiz</p>
            <button onClick={() => exit_check()}>Bosh saxifaga o’tish </button>
          </div>
        </div>
      </div>
      <a style={{ margin: "auto", display: "flex", maxWidth: "max-content", marginBottom: "20px" }} href="./Information">tovar malumotlari</a>
      </div>
      <Footer1 />
    </div>
  );
}

export default page;