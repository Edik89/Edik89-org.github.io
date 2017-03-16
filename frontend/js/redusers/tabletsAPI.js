import { GET_TABLET } from '../constants/StoreConst';

const initState = [
  {
    id:9,
    type: "tablet",
    name: "Samsung Galaxy Tab Pro S 128Gb Black (SM-W708NZKASER)",
    img: "samsung_sm_w708nzkaser_images_1751453915.jpg",
    price: 1200,
    inventory: 10,
    description: 'Экран 15.6” (1920x1080) Full HD, глянцевый с антибликовым покрытием / Intel Celeron N3060 (1.6 - 2.48 ГГц) / RAM 4 ГБ / SSD 128 ГБ / Intel HD Graphics 400 / без ОД / LAN / Wi-Fi / Bluetooth / веб-камера / DOS / 1.96 кг / черный'
  },

  {
    id:10,
    type: "tablet",
    name: "Apple iPad Pro 9.7 Wi-Fi 256GB (MM1A2RK/A)",
    img: "copy_apple_mm192rk_a_571787b059310_images_1546950966.jpg",
    price: 1060,
    inventory: 10,
    description: "Экран 9.7 IPS (2048x1536) емкостный MultiTouch / Apple A9X / RAM 2 ГБ / 256 ГБ встроенной памяти / Wi-Fi / Bluetooth 4.2 / основная камера 12 Мп, фронтальная - 5 Мп / iOS 9 / 437 г / розовый"
  },

  {
    id:11,
    type: "tablet",
    name: "Lenovo Yoga Book YB1-X91L 3G+LTE Windows (ZA160021UA)",
    img: "lenovo_yb1_x91l_za160021ua_images_1800766767.jpg",
    price: 960,
    inventory: 10,
    description: "Экран 10.1 IPS (1920x1200) емкостный, MultiTouch / Intel Atom x5-Z8550 (1.44 - 2.4 ГГц) / RAM 4 ГБ / 64 ГБ встроенной памяти + microSD / 3G / LTE / Wi-Fi / Bluetooth 4.0 / основная камера 8.0 Мп + фронтальная 2 Мп / GPS / Windows 10 Pro / 690 г"
  },

  {
    id:12,
    type: "tablet",
    name: "Lenovo Yoga Book YB1-X91F Wi-Fi Windows (ZA150018UA)",
    img: "lenovo_yb1_x91f_images_1776682671.jpg",
    price: 760,
    inventory: 10,
    description: "Экран 10.1 (1920x1200) емкостный, MultiTouch / Intel Atom x5-Z8550 (1.44 - 2.4 ГГц) / RAM 4 ГБ / 64 ГБ встроенной памяти + microSD / Wi-Fi a/b/g/n/ac / Bluetooth 4.1 / основная камера 8.0 Мп + фронтальная 2 Мп / GPS / Windows 10 Professional 64bit / 690 г"
  }
];

export default function tabletList(state=initState, action) {
  if(action.type === GET_TABLET) {
    return [
      ...state,
      action.payload
    ];
  }
  return state;
}
