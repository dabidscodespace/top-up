import blood_strike from "./blood_strike.jpeg";
import coc from "./coc.jpeg";
import e_football from "./e_football.jpeg";
import free_fire from "./free_fire.jpeg";
import gift_card from "./gift_card.jpeg";
import logo from "./logo.png";
import mobile_legends from "./mobile_legends.jpeg";
import pubg_mobile from "./pubg_mobile.jpeg";
import pub_pc from "./pubg_pc.png";
import robolox from "./robolox.jpeg";
import slider_1 from "./slider_1.jpg";
import slider_2 from "./slider_2.jpg";
import slider_3 from "./slider_3.jpg";
import unarmed_mobile from "./unarmed_mobile.jpeg";
import unarmed_pc from "./unarmed_pc.png";
import valorant from "./valorant.png";

export const assets = {
  logo,
  slider_1,
  slider_2,

  slider_3,
};

export const products = [
  {
    id: 1,
    name: "Free Fire",
    image: free_fire,
    category: "Battle Royale",
    platform: "Mobile",
    slug: "free-fire",
    variants: [
      { id: 1, label: "50 Diamonds", value: 50, price: 60 },
      { id: 2, label: "100 Diamonds", value: 100, price: 110 },
      { id: 3, label: "310 Diamonds", value: 310, price: 330 },
      { id: 4, label: "520 Diamonds", value: 520, price: 550 },
      { id: 5, label: "1060 Diamonds", value: 1060, price: 1050 },
    ],
  },
  {
    id: 2,
    name: "Mobile Legends",
    image: mobile_legends,
    category: "MOBA",
    platform: "Mobile",
    slug: "mobile-legends",
    variants: [
      { id: 1, label: "86 Diamonds", value: 86, price: 160 },
      { id: 2, label: "170 Diamonds", value: 170, price: 315 },
      { id: 3, label: "257 Diamonds", value: 257, price: 465 },
      { id: 4, label: "514 Diamonds", value: 514, price: 910 },
    ],
  },
  {
    id: 3,
    name: "PUBG Mobile",
    image: pubg_mobile,
    category: "Battle Royale",
    platform: "Mobile",
    slug: "pubg-mobile",
    variants: [
      { id: 1, label: "60 UC", value: 60, price: 90 },
      { id: 2, label: "325 UC", value: 325, price: 440 },
      { id: 3, label: "660 UC", value: 660, price: 860 },
      { id: 4, label: "1800 UC", value: 1800, price: 2180 },
      { id: 5, label: "3850 UC", value: 3850, price: 4350 },
    ],
  },
  {
    id: 4,
    name: "PUBG PC ",
    image: pub_pc,
    category: "Shooter",
    platform: "PC",
    slug: "pubg-pc",
    variants: [
      { id: 1, label: "500 UC", value: 500, price: 550 },
      { id: 2, label: "1100 UC", value: 1100, price: 1050 },
      { id: 3, label: "2400 UC", value: 2400, price: 2300 },
      { id: 4, label: "5000 UC", value: 5000, price: 4550 },
    ],
  },
  {
    id: 5,
    name: "Valorant Points",
    image: valorant,
    category: "Shooter",
    platform: "PC",
    slug: "valorant",
    variants: [
      { id: 1, label: "475 VP", value: 475, price: 500 },
      { id: 2, label: "1000 VP", value: 1000, price: 950 },
      { id: 3, label: "2050 VP", value: 2050, price: 1850 },
      { id: 4, label: "3650 VP", value: 3650, price: 3200 },
    ],
  },
  {
    id: 6,
    name: "Blood Strike Coins",
    image: blood_strike,
    category: "Shooter",
    platform: "Mobile / PC",
    slug: "blood-strike",
    variants: [
      { id: 1, label: "60 Coins", value: 60, price: 80 },
      { id: 2, label: "325 Coins", value: 325, price: 400 },
      { id: 3, label: "660 Coins", value: 660, price: 800 },
      { id: 4, label: "1800 Coins", value: 1800, price: 2050 },
    ],
  },
  {
    id: 7,
    name: "Clash of Clans",
    image: coc,
    category: "Strategy",
    platform: "Mobile",
    slug: "clash-of-clans",
    variants: [
      { id: 1, label: "80 Gems", value: 80, price: 80 },
      { id: 2, label: "500 Gems", value: 500, price: 400 },
      { id: 3, label: "1200 Gems", value: 1200, price: 800 },
    ],
  },
  {
    id: 8,
    name: "e Football ",
    image: e_football,
    category: "Sports",
    platform: "Mobile / PC",
    slug: "efootball",
    variants: [
      { id: 1, label: "100 Points", value: 100, price: 100 },
      { id: 2, label: "500 Points", value: 500, price: 450 },
      { id: 3, label: "1050 Points", value: 1050, price: 850 },
      { id: 4, label: "2150 Points", value: 2150, price: 1650 },
    ],
  },
  {
    id: 9,
    name: "Roblox Robux",
    image: robolox,
    category: "Sandbox",
    platform: "Cross‑Platform",
    slug: "roblox",
    variants: [
      { id: 1, label: "80 Robux", value: 80, price: 90 },
      { id: 2, label: "400 Robux", value: 400, price: 420 },
      { id: 3, label: "800 Robux", value: 800, price: 800 },
      { id: 4, label: "1700 Robux", value: 1700, price: 1550 },
    ],
  },
  {
    id: 10,
    name: "Call of duty Mobile",
    image: unarmed_mobile,
    category: "Action",
    platform: "Mobile",
    slug: "unarmed-mobile",
    variants: [
      { id: 1, label: "100 Credits", value: 100, price: 90 },
      { id: 2, label: "500 Credits", value: 500, price: 420 },
      { id: 3, label: "1000 Credits", value: 1000, price: 800 },
      { id: 4, label: "2000 Credits", value: 2000, price: 1500 },
    ],
  },
  {
    id: 11,
    name: "Unarmed PC",
    image: unarmed_pc,
    category: "Action",
    platform: "PC",
    slug: "unarmed-pc",
    variants: [
      { id: 1, label: "100 Credits", value: 100, price: 100 },
      { id: 2, label: "600 Credits", value: 600, price: 520 },
      { id: 3, label: "1200 Credits", value: 1200, price: 950 },
      { id: 4, label: "2500 Credits", value: 2500, price: 1750 },
    ],
  },
  {
    id: 12,
    name: "Gift Cards",
    image: gift_card,
    category: "Digital Credits",
    platform: "Android",
    slug: "google-play-card",
    variants: [
      { id: 1, label: "$10 Card", value: 10, price: 1100 },
      { id: 2, label: "$25 Card", value: 25, price: 2700 },
      { id: 3, label: "$50 Card", value: 50, price: 5250 },
      { id: 4, label: "$100 Card", value: 100, price: 10400 },
    ],
  },
];
