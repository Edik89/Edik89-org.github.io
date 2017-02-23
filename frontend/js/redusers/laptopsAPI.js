import { GET_LEPTOP } from '../constants/StoreConst';

const initState = [
  {
    id:1,
    name: "Ноутбук HP 250 G5 (X0Q23ES)",
    img: "copy_hp_1.jpg",
    price: 300,
    inventory: 10,
    description: "Экран 15.6” (1920x1080) Full HD, глянцевый с антибликовым покрытием / Intel Celeron N3060 (1.6 - 2.48 ГГц) / RAM 4 ГБ / SSD 128 ГБ / Intel HD Graphics 400 / без ОД / LAN / Wi-Fi / Bluetooth / веб-камера / DOS / 1.96 кг / черный"
  },

  {
    id:2,
    name: "Ноутбук HP Pavilion 15-ab144ur (V4P45EA) Peachy",
    img: "hp_2.jpg",
    price: 260,
    inventory: 10,
    description: "Экран 15.6 (1366x768) HD LED, глянцевый / AMD Quad-Core A10-8780P (2.0 - 3.3 ГГц) / RAM 4 ГБ / HDD 1 ТБ / AMD Radeon R7 M360, 2 ГБ / DVD Super Multi / LAN / Wi-Fi / Bluetooth 4.0 / веб-камера / DOS / 2.2 кг / розовый"
  },

  {
    id:3,
    name: "Ноутбук Apple MacBook Air 13 (MMGF2UA/A) ",
    img: "copy_apple1.jpg",
    price: 460,
    inventory: 10,
    description: "Экран 13.3 (1440x900) WXGA+ LED, глянцевый / Intel Core i5 (1.6 - 2.7 ГГц) / RAM 8 ГБ / SSD 128 ГБ / Intel HD Graphics 6000 / без ОД / Wi-Fi / Bluetooth / веб-камера / OS X El Capitan / 1.35 кг"
  },

  {
    id:4,
    name: "Ноутбук Apple MacBook Air 15 (MMGF2UA/A) ",
    img: "copy_apple1.jpg",
    price: 560,
    inventory: 10,
    description: "Экран 13.3 (1440x900) WXGA+ LED, глянцевый / Intel Core i5 (1.6 - 2.7 ГГц) / RAM 8 ГБ / SSD 128 ГБ / Intel HD Graphics 6000 / без ОД / Wi-Fi / Bluetooth / веб-камера / OS X El Capitan / 1.35 кг"
  }
];

export default function leptopList(state=initState, action) {
  if(action.type === GET_LEPTOP) {
    return [
      ...state,
      action.payload
    ];
  }
  return state;
}
