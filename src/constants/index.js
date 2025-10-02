import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  slidePosterFour,
  slidePosterOne,
  slidePosterThree,
  slidePosterTwo,
  whiteImg,
  yellowImg,
} from '../utils';

export const navLists = ['Store', 'Mac', 'iPhone', 'Support'];

export const hightlightSlides = [
  {
    id: 1,
    textLists: [
      'Enter A17 Pro.',
      'Game‑changing chip.',
      'Groundbreaking performance.',
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
    videoPoster: slidePosterOne,
  },
  {
    id: 2,
    textLists: ['Titanium.', 'So strong. So light. So Pro.'],
    video: highlightSecondVideo,
    videoDuration: 5,
    videoPoster: slidePosterTwo,
  },
  {
    id: 3,
    textLists: [
      'iPhone 15 Pro Max has the',
      'longest optical zoom in',
      'iPhone ever. Far out.',
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
    videoPoster: slidePosterThree,
  },
  {
    id: 4,
    textLists: ['All-new Action button.', 'What will yours do?.'],
    video: highlightFourthVideo,
    videoDuration: 3.63,
    videoPoster: slidePosterFour,
  },
];

export const models = [
  {
    id: 1,
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
  },
  {
    id: 2,
    title: 'iPhone 15 Pro in Blue Titanium',
    color: ['#53596E', '#6395ff', '#21242e'],
    img: blueImg,
  },
  {
    id: 3,
    title: 'iPhone 15 Pro in White Titanium',
    color: ['#C9C8C2', '#ffffff', '#C9C8C2'],
    img: whiteImg,
  },
  {
    id: 4,
    title: 'iPhone 15 Pro in Black Titanium',
    color: ['#454749', '#3b3b3b', '#181819'],
    img: blackImg,
  },
];

export const sizes = [
  { label: '6.1"', value: 'small' },
  { label: '6.7"', value: 'large' },
];

export const footerLinks = [
  'Privacy Policy',
  'Terms of Use',
  'Sales Policy',
  'Legal',
  'Site Map',
];

// data.js

export const products = [
  {
    id: 1,
    img: img1,
    title: 'Next Gen',
    topic: 'Aerphone',
    shortDesc:
      'Experience premium sound quality with a sleek and modern design built for comfort and durability.',
    detailTitle: 'Aerphone GHTK',
    longDesc:
      'The Aerphone GHTK delivers crystal clear audio with deep bass, advanced noise cancellation, and ergonomic design. Designed for all-day use, it ensures comfort, durability, and reliable performance whether you’re working, traveling, or relaxing.',
    specifications: {
      usedTime: '6 hours',
      chargingPort: 'Type-C',
      compatible: 'Android',
      bluetooth: '5.3',
      controlled: 'Touch',
    },
  },
  {
    id: 2,
    img: img2,
    title: 'Ultra Compact',
    topic: 'Aerphone',
    shortDesc:
      'A compact wireless earphone offering immersive sound and portability without compromise.',
    detailTitle: 'Aerphone ZR22',
    longDesc:
      'Aerphone ZR22 blends lightweight design with powerful sound. With quick charging and extended battery life, it’s perfect for on-the-go lifestyles, keeping you connected and entertained wherever you are.',
    specifications: {
      usedTime: '8 hours',
      chargingPort: 'USB-C',
      compatible: 'iOS / Android',
      bluetooth: '5.2',
      controlled: 'Button',
    },
  },
  {
    id: 3,
    img: img3,
    title: 'Pro Sound',
    topic: 'Aerphone',
    shortDesc:
      'Stylish earphones with a balance of sound clarity, comfort, and long-lasting battery.',
    detailTitle: 'Aerphone Pro X',
    longDesc:
      'Designed for audiophiles, the Aerphone Pro X delivers high-resolution audio and comes with adaptive fit technology. It’s crafted to reduce ear fatigue while providing studio-quality sound for music and calls.',
    specifications: {
      usedTime: '10 hours',
      chargingPort: 'Type-C Fast Charge',
      compatible: 'Universal',
      bluetooth: '5.4',
      controlled: 'Touch',
    },
  },
  {
    id: 4,
    img: img4,
    title: 'Water Ready',
    topic: 'Aerphone',
    shortDesc:
      'Durable earphones with water resistance and excellent call clarity for daily use.',
    detailTitle: 'Aerphone Aqua',
    longDesc:
      'The Aerphone Aqua is engineered with IPX5 water resistance, making it ideal for workouts and outdoor activities. Featuring crystal-clear microphones, it ensures that your voice is always heard clearly during calls.',
    specifications: {
      usedTime: '7 hours',
      chargingPort: 'Type-C',
      compatible: 'Android / iOS',
      bluetooth: '5.1',
      controlled: 'Button & Voice',
    },
  },
  {
    id: 5,
    img: img5,
    title: 'AI Powered',
    topic: 'Aerphone',
    shortDesc:
      'Next-gen earphones featuring AI noise cancellation and ultra-low latency for gamers.',
    detailTitle: 'Aerphone Nova',
    longDesc:
      'Aerphone Nova pushes innovation forward with AI-powered noise cancellation and a low-latency mode designed for gamers and streamers. It offers enhanced comfort with memory foam tips and delivers immersive soundscapes for every scenario.',
    specifications: {
      usedTime: '12 hours',
      chargingPort: 'Magnetic Dock',
      compatible: 'Universal',
      bluetooth: '5.5',
      controlled: 'Touch & Voice',
    },
  },
  {
    id: 6,
    img: img6,
    title: 'Luxury Pro',
    topic: 'Aerphone',
    shortDesc:
      'A premium luxury earphone designed with metal housing, superior drivers, and a timeless aesthetic.',
    detailTitle: 'Aerphone Prestige',
    longDesc:
      'Aerphone Prestige combines elegance and technology in one. Built with aerospace-grade aluminum, it delivers unmatched durability while housing ultra-HD drivers for audiophile-grade sound. Perfect for professionals and enthusiasts who demand the best in both style and performance.',
    specifications: {
      usedTime: '15 hours',
      chargingPort: 'USB-C + Wireless Charging',
      compatible: 'Universal',
      bluetooth: '5.6',
      controlled: 'Touch, Button & Voice',
    },
  },
];
