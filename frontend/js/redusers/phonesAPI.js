import { GET_PHONE } from '../constants/StoreConst';

const initState = [
  {
    id:5,
    type: "phone",
    name: "Apple iPhone 7 Plus 256GB Black",
    img: "apple_iphone_7_plus_256gb_black_images_1757075356.jpg",
    price: 950,
    inventory: 10,
    description: 'Экран (5.5", IPS, 1920x1080)/ Apple A10 Fusion/ основная камера: двойная 12 Мп, фронтальная камера: 7 Мп/ RAM 3 ГБ/ 256 ГБ встроенной памяти/ 3G/ LTE/ GPS/ Nano-SIM/ iOS 10'
  },

  {
    id:6,
    type: "phone",
    name: "Apple iPhone 7 Plus 128GB Jet Black",
    img: "apple_iphone_7_256gb_black_images_1757071807.jpg",
    price: 750,
    inventory: 10,
    description: "Экран (4.7, IPS, 1334x750)/ Apple A10 Fusion/ основная камера: 12 Мп, фронтальная камера: 7 Мп/ RAM 2 ГБ/ 256 ГБ встроенной памяти/ 3G/ LTE/ GPS/ Nano-SIM/ iOS 10"
  },

  {
    id:7,
    type: "phone",
    name: "Samsung Galaxy S7 Edge 32GB Black",
    img: "samsung_galaxy_s7_edge_32gb_black_images_1460283586.jpg",
    price: 660,
    inventory: 10,
    description: "Экран (5.5, Super AMOLED, 2560х1440)/ Exynos 8890 Octa (Quad 2.3 ГГц + Quad 1.6 ГГц)/ камера 12 Мп + фронтальная 5 Мп/ RAM 4 ГБ/ 32 ГБ встроенной памяти + microSD (до 200 ГБ)/ 3G/ LTE/ GPS/ поддержка 2х SIM-карт (Nano-SIM)/ Android 6.0 (Marshmallow) / 3600 мА*ч"
  },

  {
    id:8,
    type: "phone",
    name: "Motorola Moto Z (XT1650-03) Fine Gold",
    img: "motorola_sm4389ad1u1_images_1757161085.jpg",
    price: 560,
    inventory: 10,
    description: "Экран (5.5, AMOLED, 2560x1440)/ Qualcomm Snapdragon 820 (2.15 ГГц + 1.6 ГГц)/ основная камера: 13 Мп, фронтальная камера: 5 Мп/ RAM 4 ГБ/ 32 ГБ встроенной памяти + microSD/SDHC (до 2 ТБ)/ 3G/ LTE/ GPS/ GLONASS/ поддержка 2х SIM-карт (Nano-SIM)/ Android 6.0 (Marshmallow) / 2600 мА*ч"
  }
];

export default function tabletList(state=initState, action) {
  if(action.type === GET_PHONE) {
    return [
      ...state,
      action.payload
    ];
  }
  return state;
}
