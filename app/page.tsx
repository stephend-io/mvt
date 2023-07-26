import Absolute from "@/components/Absolute";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Row from "@/components/Row";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "@/app/fonts/Pixel.css";
import Buttonify, {
  ButtonifyTest,
  WindowEventAdder,
} from "@/components/Buttonify";
import ClientShowcase from "@/components/ClientShowcase";
import { prisma } from "@/lib/prisma";
import { SizeShower } from "@/components/SizeShower";
import "./styles.scss";
import { FloatingRight, FloatingLeft } from "@/components/FloatingDirection";
import TVPlayer from "@/components/TVPlayer";
import Remote from "@/components/Remote";
import ChannelBox from "@/components/ChannelBox";
import VolumeBar from "@/components/VolumeBar";
import fs from "fs";
import { redirect } from "next/navigation";
import useStore from "@/zustand/store";

const sampleData = [
  {
    artist: "Alicia Keys",
    title: "No One",
    links: [
      { id: "rywUS-ohqeE", width: 100, height: 54 },
      { id: "40k4-GJc2RI", width: 100, height: 56 },
    ],
  },
  {
    artist: "Fergie",
    title: "Big Girls Don't Cry",
    links: [
      { id: "agrXgrAgQ0U", width: 100, height: 56 },
      { id: "E6sqA9QtV5I", width: 100, height: 56 },
    ],
  },
  {
    artist: "Colbie Caillat",
    title: "Bubbly",
    links: [
      { id: "AWGqoCNbsvM", width: 100, height: 56 },
      { id: "TIT_nHs91S0", width: 100, height: 77 },
    ],
  },
  {
    artist: "Ne-Yo",
    title: "Closer",
    links: [
      { id: "z_aC5xPQ2f4", width: 100, height: 43 },
      { id: "lCtKUF3hcOU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Flo Rida Featuring T-Pain",
    title: "Low",
    links: [
      { id: "U2waT9TxPU0", width: 100, height: 75 },
      { id: "Pm_h6FnF8HU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Sara Bareilles",
    title: "Love Song",
    links: [
      { id: "qi7Yh16dA0w", width: 100, height: 76 },
      { id: "T3560rtbW6E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Alicia Keys",
    title: "Like You'll Never See Me Again",
    links: [
      { id: "xPvwDcrT6rU", width: 100, height: 56 },
      { id: "-vjN5xgy7uE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Ne-Yo",
    title: "Closer",
    links: [
      { id: "z_aC5xPQ2f4", width: 100, height: 43 },
      { id: "lCtKUF3hcOU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Beyonce",
    title: "If I Were A Boy",
    links: [
      { id: "AWpsOqh8q0M", width: 100, height: 56 },
      { id: "epDCQ4EbIYw", width: 100, height: 56 },
    ],
  },
  {
    artist: "Timbaland Featuring OneRepublic",
    title: "Apologize",
    links: [
      { id: "ZSM3w1v-A_Y", width: 100, height: 56 },
      { id: "e9a5XX-olPM", width: 100, height: 75 },
    ],
  },
  {
    artist: "Colbie Caillat",
    title: "Realize",
    links: [
      { id: "GlZxZ2n2zpw", width: 100, height: 56 },
      { id: "WIwIU0SN4tw", width: 100, height: 75 },
    ],
  },
  {
    artist: "T.I. Featuring Rihanna",
    title: "Live Your Life",
    links: [
      { id: "koVHN6eO4Xg", width: 100, height: 75 },
      { id: "UY6mr9fO-9M", width: 100, height: 75 },
    ],
  },
  {
    artist: "David Banner Featuring Chris Brown",
    title: "Get Like Me",
    links: [
      { id: "LPz7LCybSNk", width: 100, height: 56 },
      { id: "1OtQUL-EJfs", width: 100, height: 75 },
    ],
  },
  {
    artist: "Fergie",
    title: "Clumsy",
    links: [
      { id: "tf_gPZSDIxI", width: 100, height: 56 },
      { id: "JJTguQAeEEc", width: 100, height: 75 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Disturbia",
    links: [
      { id: "E1mU6h4Xdxc", width: 100, height: 56 },
      { id: "Pecfa_6EJP4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Bleeding Love",
    links: [
      { id: "7_weSk0BonM", width: 100, height: 56 },
      { id: "Vzo-EL_62fQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Colby O'Donis Featuring Akon",
    title: "What You Got",
    links: [
      { id: "Lbtyif6s9ZA", width: 100, height: 75 },
      { id: "M_bGXXRsXhU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Wyclef Jean Featuring Akon, Lil Wayne & Niia",
    title: "Sweetest Girl (Dollar Bill)",
    links: [
      { id: "sXJXLq1lN7U", width: 100, height: 56 },
      { id: "sM3cbWe_2sc", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lady Gaga Featuring Colby O'Donis",
    title: "Just Dance",
    links: [
      { id: "2Abk1jAONjw", width: 100, height: 56 },
      { id: "kQRtnqrYeMc", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Static Major",
    title: "Lollipop",
    links: [
      { id: "2IH8tNQAzSs", width: 100, height: 56 },
      { id: "UfHkXKpxLew", width: 100, height: 80 },
    ],
  },
  {
    artist: "Snoop Dogg",
    title: "Sensual Seduction",
    links: [
      { id: "Y1PVmANeyAg", width: 100, height: 56 },
      { id: "TW2F2hbUtis", width: 100, height: 75 },
    ],
  },
  {
    artist: "Kanye West",
    title: "Love Lockdown",
    links: [
      { id: "HZwMX6T5Jhk", width: 100, height: 75 },
      { id: "S945dl5L-1w", width: 100, height: 56 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "Hot N Cold",
    links: [
      { id: "kTHNpusq654", width: 100, height: 56 },
      { id: "CGQC1E6_E58", width: 100, height: 56 },
    ],
  },
  {
    artist: "Plies Featuring Ne-Yo",
    title: "Bust It Baby Part 2",
    links: [
      { id: "W12L6bTlIIo", width: 100, height: 75 },
      { id: "X_yyDbsNUWQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "OneRepublic",
    title: "Stop And Stare",
    links: [
      { id: "HtNS1afUOnE", width: 100, height: 56 },
      { id: "JPaGvHmi5NA", width: 100, height: 56 },
    ],
  },
  {
    artist: "P!nk",
    title: "So What",
    links: [
      { id: "FJfFZqTlWrQ", width: 100, height: 56 },
      { id: "5Nrv5teMc9Y", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Bobby Valentino & Kidd Kidd",
    title: "Mrs. Officer",
    links: [
      { id: "UmM8RPKCrak", width: 100, height: 56 },
      { id: "buyMOuKDG74", width: 100, height: 99 },
    ],
  },
  {
    artist: "Flo Rida Featuring Timbaland",
    title: "Elevator",
    links: [
      { id: "2m7P8BRTilk", width: 100, height: 75 },
      { id: "6ptuFq7r7QI", width: 100, height: 75 },
    ],
  },
  {
    artist: "Kardinal Offishall Featuring Akon",
    title: "Dangerous",
    links: [
      { id: "Ro7yHf_pU14", width: 100, height: 75 },
      { id: "0Ddne-8P94E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "Forever",
    links: [
      { id: "5sMKX22BHeE", width: 100, height: 48 },
      { id: "ryxUeWEcUqE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Akon",
    title: "Right Now (Na Na Na)",
    links: [
      { id: "vIaH35-MLsk", width: 100, height: 56 },
      { id: "-41gXCtC_CU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Static Major",
    title: "Lollipop",
    links: [
      { id: "2IH8tNQAzSs", width: 100, height: 56 },
      { id: "UfHkXKpxLew", width: 100, height: 80 },
    ],
  },
  {
    artist: "The Pussycat Dolls",
    title: "When I Grow Up",
    links: [
      { id: "K0K46C82v9o", width: 100, height: 56 },
      { id: "umIqInLPvmo", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jonas Brothers",
    title: "Burnin' Up",
    links: [
      { id: "5KNEZJ6KkLI", width: 100, height: 56 },
      { id: "L-Ixa4qZTiE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Disturbia",
    links: [
      { id: "E1mU6h4Xdxc", width: 100, height: 56 },
      { id: "Pecfa_6EJP4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Ray J & Yung Berg",
    title: "Sexy Can I",
    links: [
      { id: "YeVOnHce37Y", width: 100, height: 75 },
      { id: "ZzXZQ81vgS0", width: 100, height: 75 },
    ],
  },
  {
    artist: "David Archuleta",
    title: "Crush",
    links: [
      { id: "6J1-eYBbspA", width: 100, height: 56 },
      { id: "-Dk3e6lDGts", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Don't Stop The Music",
    links: [
      { id: "OfWIGJpOih8", width: 100, height: 56 },
      { id: "rb5c7oec4Xc", width: 100, height: 50 },
    ],
  },
  {
    artist: "Plies Featuring Ne-Yo",
    title: "Bust It Baby Part 2",
    links: [
      { id: "W12L6bTlIIo", width: 100, height: 75 },
      { id: "X_yyDbsNUWQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Trace Adkins",
    title: "You're Gonna Miss This",
    links: [
      { id: "lBDN8yWyNYU", width: 100, height: 56 },
      { id: "ZIBediEAcUQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Miley Cyrus",
    title: "7 Things",
    links: [
      { id: "Hr0Wv5DJhuk", width: 100, height: 56 },
      { id: "iwL566uw2Zg", width: 100, height: 75 },
    ],
  },
  {
    artist: "Fergie",
    title: "Clumsy",
    links: [
      { id: "tf_gPZSDIxI", width: 100, height: 56 },
      { id: "JJTguQAeEEc", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jonas Brothers",
    title: "Burnin' Up",
    links: [
      { id: "5KNEZJ6KkLI", width: 100, height: 56 },
      { id: "L-Ixa4qZTiE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Ne-Yo",
    title: "Miss Independent",
    links: [
      { id: "k6M5C-oKw9k", width: 100, height: 56 },
      { id: "kggHPK2yprQ", width: 100, height: 56 },
    ],
  },
  {
    artist: "Nickelback",
    title: "Gotta Be Somebody",
    links: [
      { id: "Q0VRj2uw9L0", width: 100, height: 55 },
      { id: "FmaCQ7NuhsA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Sara Bareilles",
    title: "Love Song",
    links: [
      { id: "qi7Yh16dA0w", width: 100, height: 76 },
      { id: "T3560rtbW6E", width: 100, height: 56 },
    ],
  },
  {
    artist: "J. Holiday",
    title: "Suffocate",
    links: [
      { id: "PbhGPHWlut0", width: 100, height: 63 },
      { id: "WJh38L4bLdQ", width: 100, height: 63 },
    ],
  },
  {
    artist: "Finger Eleven",
    title: "Paralyzer",
    links: [
      { id: "BJk6gZuPKRE", width: 100, height: 56 },
      { id: "zEL3qnkNyk0", width: 100, height: 56 },
    ],
  },
  {
    artist: "Sara Bareilles",
    title: "Love Song",
    links: [
      { id: "qi7Yh16dA0w", width: 100, height: 76 },
      { id: "T3560rtbW6E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "Forever",
    links: [
      { id: "5sMKX22BHeE", width: 100, height: 48 },
      { id: "ryxUeWEcUqE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne Featuring T-Pain",
    title: "Got Money",
    links: [
      { id: "1ohYsK5Y8Dc", width: 100, height: 56 },
      { id: "ZURis3A6FYM", width: 100, height: 56 },
    ],
  },
  {
    artist: "Webbie Featuring Lil' Phat & Lil' Boosie",
    title: "Independent",
    links: [
      { id: "jCUiGArhW2M", width: 100, height: 70 },
      { id: "ODCBr9vIPrA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Three 6 Mafia Featuring Project Pat, Young D & Superpower",
    title: "Lolli Lolli (Pop That Body)",
    links: [
      { id: "pWIxj4JDtEE", width: 100, height: 61 },
      { id: "9Y4XZOA7iKA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Sean Kingston",
    title: "Take You There",
    links: [
      { id: "axq1jQTk84w", width: 100, height: 75 },
      { id: "_NZE5kfoBMs", width: 100, height: 74 },
    ],
  },
  {
    artist: "Britney Spears",
    title: "Circus",
    links: [
      { id: "lVhJ_A8XUgc", width: 100, height: 75 },
      { id: "8I5_gaxpuKE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Beyonce",
    title: "If I Were A Boy",
    links: [
      { id: "AWpsOqh8q0M", width: 100, height: 56 },
      { id: "epDCQ4EbIYw", width: 100, height: 56 },
    ],
  },
  {
    artist: "T-Pain Featuring Lil Wayne",
    title: "Can't Believe It",
    links: [
      { id: "kWBE0sQC5L8", width: 100, height: 75 },
      { id: "_FGR9xp0jHA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Sara Bareilles",
    title: "Love Song",
    links: [
      { id: "qi7Yh16dA0w", width: 100, height: 76 },
      { id: "T3560rtbW6E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Finger Eleven",
    title: "Paralyzer",
    links: [
      { id: "BJk6gZuPKRE", width: 100, height: 56 },
      { id: "zEL3qnkNyk0", width: 100, height: 56 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Better In Time",
    links: [
      { id: "qSxyffSB7wA", width: 100, height: 75 },
      { id: "Wba5rnn2bMQ", width: 100, height: 56 },
    ],
  },
  {
    artist: "Britney Spears",
    title: "Womanizer",
    links: [
      { id: "rMqayQ-U74s", width: 100, height: 54 },
      { id: "RTl9Acjv4og", width: 100, height: 56 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "Hot N Cold",
    links: [
      { id: "kTHNpusq654", width: 100, height: 56 },
      { id: "CGQC1E6_E58", width: 100, height: 56 },
    ],
  },
  {
    artist: "Webbie Featuring Lil' Phat & Lil' Boosie",
    title: "Independent",
    links: [
      { id: "jCUiGArhW2M", width: 100, height: 70 },
      { id: "ODCBr9vIPrA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Coldplay",
    title: "Viva La Vida",
    links: [
      { id: "dvgZkm1xWPE", width: 100, height: 56 },
      { id: "1kVxpsi1XQ4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jordin Sparks Duet With Chris Brown",
    title: "No Air",
    links: [
      { id: "WBKnpyoFEBo", width: 100, height: 56 },
      { id: "RE-vp5H_maE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Alicia Keys",
    title: "No One",
    links: [
      { id: "rywUS-ohqeE", width: 100, height: 54 },
      { id: "40k4-GJc2RI", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Static Major",
    title: "Lollipop",
    links: [
      { id: "2IH8tNQAzSs", width: 100, height: 56 },
      { id: "UfHkXKpxLew", width: 100, height: 80 },
    ],
  },
  {
    artist: "Webbie Featuring Lil' Phat & Lil' Boosie",
    title: "Independent",
    links: [
      { id: "jCUiGArhW2M", width: 100, height: 70 },
      { id: "ODCBr9vIPrA", width: 100, height: 75 },
    ],
  },
  {
    artist: "John Mayer",
    title: "Say",
    links: [
      { id: "phaIklEphSM", width: 100, height: 56 },
      { id: "WQtGqmi2O2U", width: 100, height: 76 },
    ],
  },
  {
    artist: "Baby Bash Featuring T-Pain",
    title: "Cyclone",
    links: [
      { id: "y-1575pG-kc", width: 100, height: 56 },
      { id: "O5H0Na_3eqc", width: 100, height: 75 },
    ],
  },
  {
    artist: "Sugarland",
    title: "All I Want To Do",
    links: [
      { id: "npbiMJzNJII", width: 100, height: 56 },
      { id: "TDW_0ncpqOw", width: 100, height: 75 },
    ],
  },
  {
    artist: "Kanye West Featuring T-Pain",
    title: "Good Life",
    links: [
      { id: "FEKEjpTzB0Q", width: 100, height: 56 },
      { id: "QwzoE5e74uw", width: 100, height: 56 },
    ],
  },
  {
    artist: "Colby O'Donis Featuring Akon",
    title: "What You Got",
    links: [
      { id: "Lbtyif6s9ZA", width: 100, height: 75 },
      { id: "M_bGXXRsXhU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jesse McCartney",
    title: "Leavin'",
    links: [
      { id: "zR5_KkxgGqE", width: 100, height: 75 },
      { id: "vQmEGKOe7Ao", width: 100, height: 75 },
    ],
  },
  {
    artist: "Mariah Carey",
    title: "Bye Bye",
    links: [
      { id: "UqfLVDIZcP8", width: 100, height: 56 },
      { id: "nRNTpCO_b4g", width: 100, height: 56 },
    ],
  },
  {
    artist: "Ne-Yo",
    title: "Closer",
    links: [
      { id: "z_aC5xPQ2f4", width: 100, height: 43 },
      { id: "lCtKUF3hcOU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Nickelback",
    title: "Gotta Be Somebody",
    links: [
      { id: "Q0VRj2uw9L0", width: 100, height: 55 },
      { id: "FmaCQ7NuhsA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jesse McCartney",
    title: "Leavin'",
    links: [
      { id: "zR5_KkxgGqE", width: 100, height: 75 },
      { id: "vQmEGKOe7Ao", width: 100, height: 75 },
    ],
  },
  {
    artist: "Danity Kane",
    title: "Damaged",
    links: [
      { id: "P8IBg0mVJ5Y", width: 100, height: 75 },
      { id: "1avNqXZyQtg", width: 100, height: 75 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "Forever",
    links: [
      { id: "5sMKX22BHeE", width: 100, height: 48 },
      { id: "ryxUeWEcUqE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "With You",
    links: [
      { id: "nmjdaBaZe8Y", width: 100, height: 54 },
      { id: "_FAuveOm2u8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Sean Kingston",
    title: "Take You There",
    links: [
      { id: "axq1jQTk84w", width: 100, height: 75 },
      { id: "_NZE5kfoBMs", width: 100, height: 74 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Static Major",
    title: "Lollipop",
    links: [
      { id: "2IH8tNQAzSs", width: 100, height: 56 },
      { id: "UfHkXKpxLew", width: 100, height: 80 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "I Kissed A Girl",
    links: [
      { id: "tAp9BKosZXs", width: 100, height: 56 },
      { id: "zhZ-ap0Rgks", width: 100, height: 54 },
    ],
  },
  {
    artist: "Buckcherry",
    title: "Sorry",
    links: [
      { id: "77pb0WXAz-Q", width: 100, height: 75 },
      { id: "A4LyILAR9FI", width: 100, height: 75 },
    ],
  },
  {
    artist: "David Cook",
    title: "Light On",
    links: [
      { id: "4i8ZCp3-n7w", width: 100, height: 56 },
      { id: "95IyWTgrxx4", width: 100, height: 67 },
    ],
  },
  {
    artist: "M.I.A.",
    title: "Paper Planes",
    links: [
      { id: "ewRjZoRtu0Y", width: 100, height: 56 },
      { id: "B__XOOM7Vsw", width: 100, height: 75 },
    ],
  },
  {
    artist: "OneRepublic",
    title: "Stop And Stare",
    links: [
      { id: "HtNS1afUOnE", width: 100, height: 56 },
      { id: "JPaGvHmi5NA", width: 100, height: 56 },
    ],
  },
  {
    artist: "Usher Featuring Young Jeezy",
    title: "Love In This Club",
    links: [
      { id: "cB5e0zHRzHc", width: 100, height: 56 },
      { id: "qH1wbp-FASo", width: 100, height: 100 },
    ],
  },
  {
    artist: "Alicia Keys",
    title: "Like You'll Never See Me Again",
    links: [
      { id: "xPvwDcrT6rU", width: 100, height: 56 },
      { id: "-vjN5xgy7uE", width: 100, height: 56 },
    ],
  },
  {
    artist: "T.I.",
    title: "Whatever You Like",
    links: [
      { id: "nQJACVmankY", width: 100, height: 68 },
      { id: "NuqVKRT66ls", width: 100, height: 56 },
    ],
  },
  {
    artist: "Kardinal Offishall Featuring Akon",
    title: "Dangerous",
    links: [
      { id: "Ro7yHf_pU14", width: 100, height: 75 },
      { id: "0Ddne-8P94E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Natasha Bedingfield Featuring Sean Kingston",
    title: "Love Like This",
    links: [
      { id: "BPTZVmJrIpo", width: 100, height: 75 },
      { id: "dcQVAEebb4Y", width: 100, height: 75 },
    ],
  },
  {
    artist: "P!nk",
    title: "So What",
    links: [
      { id: "FJfFZqTlWrQ", width: 100, height: 56 },
      { id: "5Nrv5teMc9Y", width: 100, height: 56 },
    ],
  },
  {
    artist: "Madonna Featuring Justin Timberlake & Timbaland",
    title: "4 Minutes",
    links: [
      { id: "aAQZPBwz2CI", width: 100, height: 56 },
      { id: "BgPqNyqYDN4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne",
    title: "A Milli",
    links: [
      { id: "1Vf4mMCpNY0", width: 100, height: 56 },
      { id: "xhvXoRWkhEk", width: 100, height: 56 },
    ],
  },
  {
    artist: "Kardinal Offishall Featuring Akon",
    title: "Dangerous",
    links: [
      { id: "Ro7yHf_pU14", width: 100, height: 75 },
      { id: "0Ddne-8P94E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Usher Featuring Young Jeezy",
    title: "Love In This Club",
    links: [
      { id: "cB5e0zHRzHc", width: 100, height: 56 },
      { id: "qH1wbp-FASo", width: 100, height: 100 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "I Kissed A Girl",
    links: [
      { id: "tAp9BKosZXs", width: 100, height: 56 },
      { id: "zhZ-ap0Rgks", width: 100, height: 54 },
    ],
  },
  {
    artist: "Metro Station",
    title: "Shake It",
    links: [
      { id: "_wjFahULCK8", width: 100, height: 56 },
      { id: "Vxpgm_w32mU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jason Mraz",
    title: "I'm Yours",
    links: [
      { id: "EkHTsc9PU2A", width: 100, height: 39 },
      { id: "8mCCMhuKEYw", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Don't Stop The Music",
    links: [
      { id: "yd8jh9QYfEs", width: 100, height: 75 },
      { id: "OfWIGJpOih8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Timbaland Featuring OneRepublic",
    title: "Apologize",
    links: [
      { id: "e9a5XX-olPM", width: 100, height: 75 },
      { id: "rywUS-ohqeE", width: 100, height: 54 },
    ],
  },
  {
    artist: "Linkin Park",
    title: "Shadow Of The Day",
    links: [
      { id: "n1PCW0C1aiM", width: 100, height: 73 },
      { id: "3s1fMjbaaGY", width: 100, height: 56 },
    ],
  },
  {
    artist: "Danity Kane",
    title: "Damaged",
    links: [
      { id: "P8IBg0mVJ5Y", width: 100, height: 75 },
      { id: "1avNqXZyQtg", width: 100, height: 75 },
    ],
  },
  {
    artist: "T.I.",
    title: "Whatever You Like",
    links: [
      { id: "nQJACVmankY", width: 100, height: 68 },
      { id: "NuqVKRT66ls", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jesse McCartney",
    title: "Leavin'",
    links: [
      { id: "zR5_KkxgGqE", width: 100, height: 75 },
      { id: "vQmEGKOe7Ao", width: 100, height: 75 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "Our Song",
    links: [
      { id: "Jb2stN7kH28", width: 100, height: 75 },
      { id: "VuNIsY6JdUw", width: 100, height: 56 },
    ],
  },
  {
    artist: "T.I. Featuring Rihanna",
    title: "Live Your Life",
    links: [
      { id: "koVHN6eO4Xg", width: 100, height: 75 },
      { id: "UY6mr9fO-9M", width: 100, height: 75 },
    ],
  },
  {
    artist: "Metro Station",
    title: "Shake It",
    links: [
      { id: "_wjFahULCK8", width: 100, height: 56 },
      { id: "Vxpgm_w32mU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Better In Time",
    links: [
      { id: "qSxyffSB7wA", width: 100, height: 75 },
      { id: "Wba5rnn2bMQ", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "Forever",
    links: [
      { id: "5sMKX22BHeE", width: 100, height: 48 },
      { id: "ryxUeWEcUqE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jason Mraz",
    title: "I'm Yours",
    links: [
      { id: "EkHTsc9PU2A", width: 100, height: 39 },
      { id: "8mCCMhuKEYw", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "With You",
    links: [
      { id: "nmjdaBaZe8Y", width: 100, height: 54 },
      { id: "_FAuveOm2u8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Bleeding Love",
    links: [
      { id: "7_weSk0BonM", width: 100, height: 56 },
      { id: "Vzo-EL_62fQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jordin Sparks Duet With Chris Brown",
    title: "No Air",
    links: [
      { id: "WBKnpyoFEBo", width: 100, height: 56 },
      { id: "RE-vp5H_maE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Lil Wayne Featuring T-Pain",
    title: "Got Money",
    links: [
      { id: "1ohYsK5Y8Dc", width: 100, height: 56 },
      { id: "ZURis3A6FYM", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jordin Sparks Duet With Chris Brown",
    title: "No Air",
    links: [
      { id: "WBKnpyoFEBo", width: 100, height: 56 },
      { id: "RE-vp5H_maE", width: 100, height: 75 },
    ],
  },
  {
    artist: "T.I.",
    title: "Whatever You Like",
    links: [
      { id: "nQJACVmankY", width: 100, height: 68 },
      { id: "NuqVKRT66ls", width: 100, height: 56 },
    ],
  },
  {
    artist: "T-Pain Featuring Lil Wayne",
    title: "Can't Believe It",
    links: [
      { id: "kWBE0sQC5L8", width: 100, height: 75 },
      { id: "_FGR9xp0jHA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Coldplay",
    title: "Viva La Vida",
    links: [
      { id: "dvgZkm1xWPE", width: 100, height: 56 },
      { id: "1kVxpsi1XQ4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna Featuring Ne-Yo",
    title: "Hate That I Love You",
    links: [
      { id: "KMOOr7GEkj8", width: 100, height: 56 },
      { id: "mYlgd5bfOUI", width: 100, height: 56 },
    ],
  },
  {
    artist: "Natasha Bedingfield",
    title: "Pocketful Of Sunshine",
    links: [
      { id: "gte3BoXKwP0", width: 100, height: 56 },
      { id: "0btXhLdAuAc", width: 100, height: 75 },
    ],
  },
  {
    artist: "T-Pain Featuring Lil Wayne",
    title: "Can't Believe It",
    links: [
      { id: "kWBE0sQC5L8", width: 100, height: 75 },
      { id: "_FGR9xp0jHA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "Hot N Cold",
    links: [
      { id: "kTHNpusq654", width: 100, height: 56 },
      { id: "CGQC1E6_E58", width: 100, height: 56 },
    ],
  },
  {
    artist: "Akon",
    title: "Right Now (Na Na Na)",
    links: [
      { id: "vIaH35-MLsk", width: 100, height: 56 },
      { id: "-41gXCtC_CU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Snoop Dogg",
    title: "Sensual Seduction",
    links: [
      { id: "Y1PVmANeyAg", width: 100, height: 56 },
      { id: "TW2F2hbUtis", width: 100, height: 75 },
    ],
  },
  {
    artist: "Sean Kingston",
    title: "Take You There",
    links: [
      { id: "axq1jQTk84w", width: 100, height: 75 },
      { id: "_NZE5kfoBMs", width: 100, height: 74 },
    ],
  },
  {
    artist: "Madonna Featuring Justin Timberlake & Timbaland",
    title: "4 Minutes",
    links: [
      { id: "aAQZPBwz2CI", width: 100, height: 56 },
      { id: "BgPqNyqYDN4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Flo Rida Featuring T-Pain",
    title: "Low",
    links: [
      { id: "Pm_h6FnF8HU", width: 100, height: 56 },
      { id: "FAgbZdrWiN4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Young Jeezy Featuring Kanye West",
    title: "Put On",
    links: [
      { id: "1aEImx74gLA", width: 100, height: 56 },
      { id: "8EBKITxBvxI", width: 100, height: 73 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Static Major",
    title: "Lollipop",
    links: [
      { id: "2IH8tNQAzSs", width: 100, height: 56 },
      { id: "UfHkXKpxLew", width: 100, height: 80 },
    ],
  },
  {
    artist: "Flo Rida Featuring T-Pain",
    title: "Low",
    links: [
      { id: "U2waT9TxPU0", width: 100, height: 75 },
      { id: "Pm_h6FnF8HU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Britney Spears",
    title: "Womanizer",
    links: [
      { id: "rMqayQ-U74s", width: 100, height: 54 },
      { id: "RTl9Acjv4og", width: 100, height: 56 },
    ],
  },
  {
    artist: "The Fray",
    title: "You Found Me",
    links: [
      { id: "jFg_8u87zT0", width: 100, height: 56 },
      { id: "_tdWkuyFI6c", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Take A Bow",
    links: [
      { id: "J3UjJ4wKLkg", width: 100, height: 56 },
      { id: "kgs-gOIId40", width: 100, height: 56 },
    ],
  },
  {
    artist: "Buckcherry",
    title: "Sorry",
    links: [
      { id: "77pb0WXAz-Q", width: 100, height: 75 },
      { id: "A4LyILAR9FI", width: 100, height: 75 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Take A Bow",
    links: [
      { id: "J3UjJ4wKLkg", width: 100, height: 56 },
      { id: "kgs-gOIId40", width: 100, height: 56 },
    ],
  },
  {
    artist: "Linkin Park",
    title: "Shadow Of The Day",
    links: [
      { id: "n1PCW0C1aiM", width: 100, height: 73 },
      { id: "3s1fMjbaaGY", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lupe Fiasco Featuring Matthew Santos",
    title: "Superstar",
    links: [
      { id: "hVkBlsgthLg", width: 100, height: 75 },
      { id: "65ztsZvJ89M", width: 100, height: 56 },
    ],
  },
  {
    artist: "Kevin Rudolf Featuring Lil Wayne",
    title: "Let It Rock",
    links: [
      { id: "u0n4eMGXAyk", width: 100, height: 56 },
      { id: "2a4JaphXcWs", width: 100, height: 75 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "Love Story",
    links: [
      { id: "8xg3vE8Ie_E", width: 100, height: 56 },
      { id: "lEMeFbxUZks", width: 100, height: 57 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Bleeding Love",
    links: [
      { id: "7_weSk0BonM", width: 100, height: 56 },
      { id: "Vzo-EL_62fQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Chris Brown Featuring T-Pain",
    title: "Kiss Kiss",
    links: [
      { id: "eNII9PDlFJ0", width: 100, height: 61 },
      { id: "UJjlxEAbKAM", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Take A Bow",
    links: [
      { id: "J3UjJ4wKLkg", width: 100, height: 56 },
      { id: "kgs-gOIId40", width: 100, height: 56 },
    ],
  },
  {
    artist: "David Cook",
    title: "The Time Of My Life",
    links: [
      { id: "QTyMyMMGZrg", width: 100, height: 75 },
      { id: "Jt4aTMTGZPM", width: 100, height: 75 },
    ],
  },
  {
    artist: "Mariah Carey",
    title: "Touch My Body",
    links: [
      { id: "9b8erWuBA44", width: 100, height: 56 },
      { id: "Vgs_T7nVJVE", width: 100, height: 100 },
    ],
  },
  {
    artist: "Coldplay",
    title: "Viva La Vida",
    links: [
      { id: "dvgZkm1xWPE", width: 100, height: 56 },
      { id: "1kVxpsi1XQ4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Fall Out Boy Featuring John Mayer",
    title: "Beat It",
    links: [
      { id: "sk8Pb17pcQI", width: 100, height: 56 },
      { id: "ZNnaHsdPw6E", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jonas Brothers",
    title: "Tonight",
    links: [
      { id: "QDO1tJkvsd4", width: 100, height: 56 },
      { id: "sp9-c-qSgso", width: 100, height: 75 },
    ],
  },
  {
    artist: "Kanye West",
    title: "Heartless",
    links: [
      { id: "Co0tTeuUVhU", width: 100, height: 56 },
      { id: "11Kev4kYo-U", width: 100, height: 56 },
    ],
  },
  {
    artist: "T.I. Featuring Rihanna",
    title: "Live Your Life",
    links: [
      { id: "koVHN6eO4Xg", width: 100, height: 75 },
      { id: "UY6mr9fO-9M", width: 100, height: 75 },
    ],
  },
  {
    artist: "The Pussycat Dolls",
    title: "When I Grow Up",
    links: [
      { id: "K0K46C82v9o", width: 100, height: 56 },
      { id: "umIqInLPvmo", width: 100, height: 75 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Bobby Valentino & Kidd Kidd",
    title: "Mrs. Officer",
    links: [
      { id: "UmM8RPKCrak", width: 100, height: 56 },
      { id: "buyMOuKDG74", width: 100, height: 99 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "Forever",
    links: [
      { id: "5sMKX22BHeE", width: 100, height: 48 },
      { id: "ryxUeWEcUqE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Kanye West",
    title: "Love Lockdown",
    links: [
      { id: "HZwMX6T5Jhk", width: 100, height: 75 },
      { id: "S945dl5L-1w", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jordin Sparks",
    title: "One Step At A Time",
    links: [
      { id: "PIE5QtkxzvM", width: 100, height: 56 },
      { id: "aLcRpA4knaM", width: 100, height: 56 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Bleeding Love",
    links: [
      { id: "7_weSk0BonM", width: 100, height: 56 },
      { id: "Vzo-EL_62fQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Kanye West",
    title: "Love Lockdown",
    links: [
      { id: "HZwMX6T5Jhk", width: 100, height: 75 },
      { id: "S945dl5L-1w", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "With You",
    links: [
      { id: "nmjdaBaZe8Y", width: 100, height: 54 },
      { id: "_FAuveOm2u8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Timbaland Featuring OneRepublic",
    title: "Apologize",
    links: [
      { id: "ZSM3w1v-A_Y", width: 100, height: 56 },
      { id: "e9a5XX-olPM", width: 100, height: 75 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "I Kissed A Girl",
    links: [
      { id: "tAp9BKosZXs", width: 100, height: 56 },
      { id: "zhZ-ap0Rgks", width: 100, height: 54 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "You're Not Sorry",
    links: [
      { id: "DNaSlUYIXBg", width: 100, height: 56 },
      { id: "Ocllu_7JSLU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Kevin Rudolf Featuring Lil Wayne",
    title: "Let It Rock",
    links: [
      { id: "u0n4eMGXAyk", width: 100, height: 56 },
      { id: "2a4JaphXcWs", width: 100, height: 75 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "Love Story",
    links: [
      { id: "8xg3vE8Ie_E", width: 100, height: 56 },
      { id: "lEMeFbxUZks", width: 100, height: 57 },
    ],
  },
  {
    artist: "Ne-Yo",
    title: "Miss Independent",
    links: [
      { id: "k6M5C-oKw9k", width: 100, height: 56 },
      { id: "kggHPK2yprQ", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jordin Sparks Duet With Chris Brown",
    title: "No Air",
    links: [
      { id: "WBKnpyoFEBo", width: 100, height: 56 },
      { id: "RE-vp5H_maE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "Teardrops On My Guitar",
    links: [
      { id: "xKCek6_dB0M", width: 100, height: 75 },
      { id: "17UC2RBFzeg", width: 100, height: 75 },
    ],
  },
  {
    artist: "The Pussycat Dolls",
    title: "When I Grow Up",
    links: [
      { id: "K0K46C82v9o", width: 100, height: 56 },
      { id: "umIqInLPvmo", width: 100, height: 75 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "Hot N Cold",
    links: [
      { id: "kTHNpusq654", width: 100, height: 56 },
      { id: "CGQC1E6_E58", width: 100, height: 56 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "Teardrops On My Guitar",
    links: [
      { id: "xKCek6_dB0M", width: 100, height: 75 },
      { id: "17UC2RBFzeg", width: 100, height: 75 },
    ],
  },
  {
    artist: "Beyonce",
    title: "Single Ladies (Put A Ring On It)",
    links: [
      { id: "4m1EFMoRFvY", width: 100, height: 53 },
      { id: "_7zlfbXdWAY", width: 100, height: 56 },
    ],
  },
  {
    artist: "P!nk",
    title: "So What",
    links: [
      { id: "FJfFZqTlWrQ", width: 100, height: 56 },
      { id: "5Nrv5teMc9Y", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Disturbia",
    links: [
      { id: "E1mU6h4Xdxc", width: 100, height: 56 },
      { id: "Pecfa_6EJP4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Kevin Rudolf Featuring Lil Wayne",
    title: "Let It Rock",
    links: [
      { id: "u0n4eMGXAyk", width: 100, height: 56 },
      { id: "2a4JaphXcWs", width: 100, height: 75 },
    ],
  },
  {
    artist: "Taylor Swift",
    title: "Love Story",
    links: [
      { id: "8xg3vE8Ie_E", width: 100, height: 56 },
      { id: "lEMeFbxUZks", width: 100, height: 57 },
    ],
  },
  {
    artist: "Ray J & Yung Berg",
    title: "Sexy Can I",
    links: [
      { id: "YeVOnHce37Y", width: 100, height: 75 },
      { id: "ZzXZQ81vgS0", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jordin Sparks",
    title: "Tattoo",
    links: [
      { id: "T4E1s0g3ZMw", width: 100, height: 75 },
      { id: "EspCzgXH0o0", width: 100, height: 56 },
    ],
  },
  {
    artist: "3 Doors Down",
    title: "It's Not My Time",
    links: [
      { id: "qpfhcljJ9bQ", width: 100, height: 56 },
      { id: "Zu9EygybQxc", width: 100, height: 56 },
    ],
  },
  {
    artist: "Janet",
    title: "Feedback",
    links: [
      { id: "wU0ucfoBcXM", width: 100, height: 56 },
      { id: "4ViQHYA2bNE", width: 100, height: 76 },
    ],
  },
  {
    artist: "Lil Wayne Featuring Bobby Valentino & Kidd Kidd",
    title: "Mrs. Officer",
    links: [
      { id: "UmM8RPKCrak", width: 100, height: 56 },
      { id: "buyMOuKDG74", width: 100, height: 99 },
    ],
  },
  {
    artist: "Chris Brown Featuring T-Pain",
    title: "Kiss Kiss",
    links: [
      { id: "eNII9PDlFJ0", width: 100, height: 61 },
      { id: "UJjlxEAbKAM", width: 100, height: 56 },
    ],
  },
  {
    artist: "Miley Cyrus",
    title: "See You Again",
    links: [
      { id: "aJDC3Gg-F8w", width: 100, height: 75 },
      { id: "2zAr5yBYQoo", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Take A Bow",
    links: [
      { id: "J3UjJ4wKLkg", width: 100, height: 56 },
      { id: "kgs-gOIId40", width: 100, height: 56 },
    ],
  },
  {
    artist: "Soulja Boy Tell'em",
    title: "Crank That (Soulja Boy)",
    links: [
      { id: "8UFIYGkROII", width: 100, height: 56 },
      { id: "jFzOxern85Y", width: 100, height: 56 },
    ],
  },
  {
    artist: "Flo Rida Featuring T-Pain",
    title: "Low",
    links: [{ id: "Pm_h6FnF8HU", width: 100, height: 56 }],
  },
  {
    artist: "Lupe Fiasco Featuring Matthew Santos",
    title: "Superstar",
    links: [
      { id: "hVkBlsgthLg", width: 100, height: 75 },
      { id: "65ztsZvJ89M", width: 100, height: 56 },
    ],
  },
  {
    artist: "Colbie Caillat",
    title: "Bubbly",
    links: [
      { id: "AWGqoCNbsvM", width: 100, height: 56 },
      { id: "TIT_nHs91S0", width: 100, height: 77 },
    ],
  },
  {
    artist: "Ray J & Yung Berg",
    title: "Sexy Can I",
    links: [
      { id: "YeVOnHce37Y", width: 100, height: 75 },
      { id: "ZzXZQ81vgS0", width: 100, height: 75 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Disturbia",
    links: [
      { id: "E1mU6h4Xdxc", width: 100, height: 56 },
      { id: "Pecfa_6EJP4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Mariah Carey",
    title: "Touch My Body",
    links: [
      { id: "9b8erWuBA44", width: 100, height: 56 },
      { id: "Vgs_T7nVJVE", width: 100, height: 100 },
    ],
  },
  {
    artist: "Jordin Sparks",
    title: "Tattoo",
    links: [
      { id: "T4E1s0g3ZMw", width: 100, height: 75 },
      { id: "EspCzgXH0o0", width: 100, height: 56 },
    ],
  },
  {
    artist: "P!nk",
    title: "So What",
    links: [
      { id: "FJfFZqTlWrQ", width: 100, height: 56 },
      { id: "5Nrv5teMc9Y", width: 100, height: 56 },
    ],
  },
  {
    artist: "Nickelback",
    title: "Gotta Be Somebody",
    links: [
      { id: "Q0VRj2uw9L0", width: 100, height: 55 },
      { id: "FmaCQ7NuhsA", width: 100, height: 75 },
    ],
  },
  {
    artist: "Timbaland Featuring OneRepublic",
    title: "Apologize",
    links: [
      { id: "ZSM3w1v-A_Y", width: 100, height: 56 },
      { id: "e9a5XX-olPM", width: 100, height: 75 },
    ],
  },
  {
    artist: "Madonna Featuring Justin Timberlake & Timbaland",
    title: "4 Minutes",
    links: [
      { id: "aAQZPBwz2CI", width: 100, height: 56 },
      { id: "BgPqNyqYDN4", width: 100, height: 56 },
    ],
  },
  {
    artist: "M.I.A.",
    title: "Paper Planes",
    links: [
      { id: "ewRjZoRtu0Y", width: 100, height: 56 },
      { id: "B__XOOM7Vsw", width: 100, height: 75 },
    ],
  },
  {
    artist: "Danity Kane",
    title: "Damaged",
    links: [
      { id: "P8IBg0mVJ5Y", width: 100, height: 75 },
      { id: "1avNqXZyQtg", width: 100, height: 75 },
    ],
  },
  {
    artist: "Natasha Bedingfield",
    title: "Pocketful Of Sunshine",
    links: [
      { id: "gte3BoXKwP0", width: 100, height: 56 },
      { id: "0btXhLdAuAc", width: 100, height: 75 },
    ],
  },
  {
    artist: "Ray J & Yung Berg",
    title: "Sexy Can I",
    links: [
      { id: "YeVOnHce37Y", width: 100, height: 75 },
      { id: "ZzXZQ81vgS0", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jason Mraz",
    title: "I'm Yours",
    links: [
      { id: "EkHTsc9PU2A", width: 100, height: 39 },
      { id: "8mCCMhuKEYw", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "With You",
    links: [
      { id: "_FAuveOm2u8", width: 100, height: 56 },
      { id: "yd8jh9QYfEs", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jesse McCartney",
    title: "Leavin'",
    links: [
      { id: "zR5_KkxgGqE", width: 100, height: 75 },
      { id: "vQmEGKOe7Ao", width: 100, height: 75 },
    ],
  },
  {
    artist: "Jesse McCartney",
    title: "Leavin'",
    links: [
      { id: "zR5_KkxgGqE", width: 100, height: 75 },
      { id: "vQmEGKOe7Ao", width: 100, height: 75 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "Forever",
    links: [
      { id: "5sMKX22BHeE", width: 100, height: 48 },
      { id: "ryxUeWEcUqE", width: 100, height: 56 },
    ],
  },
  {
    artist: "Flo Rida Featuring T-Pain",
    title: "Low",
    links: [
      { id: "U2waT9TxPU0", width: 100, height: 75 },
      { id: "Pm_h6FnF8HU", width: 100, height: 56 },
    ],
  },
  {
    artist: "M.I.A.",
    title: "Paper Planes",
    links: [
      { id: "ewRjZoRtu0Y", width: 100, height: 56 },
      { id: "B__XOOM7Vsw", width: 100, height: 75 },
    ],
  },
  {
    artist: "Flo Rida Featuring will.i.am",
    title: "In The Ayer",
    links: [
      { id: "-DsyZdeFjug", width: 100, height: 75 },
      { id: "7ZsuE8W_VlE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Natasha Bedingfield",
    title: "Pocketful Of Sunshine",
    links: [
      { id: "gte3BoXKwP0", width: 100, height: 56 },
      { id: "0btXhLdAuAc", width: 100, height: 75 },
    ],
  },
  {
    artist: "Katy Perry",
    title: "I Kissed A Girl",
    links: [
      { id: "tAp9BKosZXs", width: 100, height: 56 },
      { id: "zhZ-ap0Rgks", width: 100, height: 54 },
    ],
  },
  {
    artist: "Sara Bareilles",
    title: "Love Song",
    links: [
      { id: "qi7Yh16dA0w", width: 100, height: 76 },
      { id: "T3560rtbW6E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Disturbia",
    links: [
      { id: "E1mU6h4Xdxc", width: 100, height: 56 },
      { id: "Pecfa_6EJP4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Lil Wayne",
    title: "A Milli",
    links: [
      { id: "1Vf4mMCpNY0", width: 100, height: 56 },
      { id: "xhvXoRWkhEk", width: 100, height: 56 },
    ],
  },
  {
    artist: "Usher Featuring Young Jeezy",
    title: "Love In This Club",
    links: [
      { id: "cB5e0zHRzHc", width: 100, height: 56 },
      { id: "qH1wbp-FASo", width: 100, height: 100 },
    ],
  },
  {
    artist: "Miley Cyrus",
    title: "See You Again",
    links: [
      { id: "aJDC3Gg-F8w", width: 100, height: 75 },
      { id: "2zAr5yBYQoo", width: 100, height: 56 },
    ],
  },
  {
    artist: "Chris Brown",
    title: "With You",
    links: [
      { id: "nmjdaBaZe8Y", width: 100, height: 54 },
      { id: "_FAuveOm2u8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Buckcherry",
    title: "Sorry",
    links: [
      { id: "77pb0WXAz-Q", width: 100, height: 75 },
      { id: "A4LyILAR9FI", width: 100, height: 75 },
    ],
  },
  {
    artist: "Usher Featuring Young Jeezy",
    title: "Love In This Club",
    links: [
      { id: "cB5e0zHRzHc", width: 100, height: 56 },
      { id: "qH1wbp-FASo", width: 100, height: 100 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Don't Stop The Music",
    links: [
      { id: "yd8jh9QYfEs", width: 100, height: 75 },
      { id: "OfWIGJpOih8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Yael Naim",
    title: "New Soul",
    links: [
      { id: "hhE7QMXRE1g", width: 100, height: 56 },
      { id: "aON8SYr6p0M", width: 100, height: 53 },
    ],
  },
  {
    artist: "Miley Cyrus",
    title: "See You Again",
    links: [
      { id: "aJDC3Gg-F8w", width: 100, height: 75 },
      { id: "2zAr5yBYQoo", width: 100, height: 56 },
    ],
  },
  {
    artist: "Natasha Bedingfield",
    title: "Pocketful Of Sunshine",
    links: [
      { id: "gte3BoXKwP0", width: 100, height: 56 },
      { id: "0btXhLdAuAc", width: 100, height: 75 },
    ],
  },
  {
    artist: "Artists Stand Up To Cancer",
    title: "Just Stand Up!",
    links: [
      { id: "HUEF-NzPnD8", width: 100, height: 42 },
      { id: "qfYZ4S7ten8", width: 100, height: 75 },
    ],
  },
  {
    artist: "Akon Featuring Colby O'Donis & Kardinal Offishall",
    title: "Beautiful",
    links: [
      { id: "rSOzN0eihsE", width: 100, height: 56 },
      { id: "DHo8bNXv8V8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jordin Sparks Duet With Chris Brown",
    title: "No Air",
    links: [
      { id: "WBKnpyoFEBo", width: 100, height: 56 },
      { id: "RE-vp5H_maE", width: 100, height: 75 },
    ],
  },
  {
    artist: "Coldplay",
    title: "Viva La Vida",
    links: [
      { id: "dvgZkm1xWPE", width: 100, height: 56 },
      { id: "1kVxpsi1XQ4", width: 100, height: 56 },
    ],
  },
  {
    artist: "T.I.",
    title: "Whatever You Like",
    links: [
      { id: "nQJACVmankY", width: 100, height: 68 },
      { id: "NuqVKRT66ls", width: 100, height: 56 },
    ],
  },
  {
    artist: "Leona Lewis",
    title: "Bleeding Love",
    links: [
      { id: "7_weSk0BonM", width: 100, height: 56 },
      { id: "Vzo-EL_62fQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Sara Bareilles",
    title: "Love Song",
    links: [
      { id: "qi7Yh16dA0w", width: 100, height: 76 },
      { id: "T3560rtbW6E", width: 100, height: 56 },
    ],
  },
  {
    artist: "Alicia Keys",
    title: "No One",
    links: [
      { id: "rywUS-ohqeE", width: 100, height: 54 },
      { id: "40k4-GJc2RI", width: 100, height: 56 },
    ],
  },
  {
    artist: "Estelle Featuring Kanye West",
    title: "American Boy",
    links: [
      { id: "Ic5vxw3eijY", width: 100, height: 75 },
      { id: "FAD_5NWzM5g", width: 100, height: 75 },
    ],
  },
  {
    artist: "Alicia Keys",
    title: "No One",
    links: [{ id: "40k4-GJc2RI", width: 100, height: 56 }],
  },
  {
    artist: "Metro Station",
    title: "Shake It",
    links: [
      { id: "_wjFahULCK8", width: 100, height: 56 },
      { id: "Vxpgm_w32mU", width: 100, height: 56 },
    ],
  },
  {
    artist: "Rihanna",
    title: "Don't Stop The Music",
    links: [
      { id: "yd8jh9QYfEs", width: 100, height: 75 },
      { id: "OfWIGJpOih8", width: 100, height: 56 },
    ],
  },
  {
    artist: "Coldplay",
    title: "Viva La Vida",
    links: [
      { id: "dvgZkm1xWPE", width: 100, height: 56 },
      { id: "1kVxpsi1XQ4", width: 100, height: 56 },
    ],
  },
  {
    artist: "Christina Aguilera",
    title: "Keeps Gettin' Better",
    links: [
      { id: "gkPxgUshpec", width: 100, height: 75 },
      { id: "zycngDC1Q1s", width: 100, height: 56 },
    ],
  },
  {
    artist: "Jason Mraz",
    title: "I'm Yours",
    links: [
      { id: "EkHTsc9PU2A", width: 100, height: 39 },
      { id: "8mCCMhuKEYw", width: 100, height: 56 },
    ],
  },
  {
    artist: "Ne-Yo",
    title: "Miss Independent",
    links: [
      { id: "k6M5C-oKw9k", width: 100, height: 56 },
      { id: "kggHPK2yprQ", width: 100, height: 56 },
    ],
  },
  {
    artist: "Plies Featuring Ne-Yo",
    title: "Bust It Baby Part 2",
    links: [
      { id: "W12L6bTlIIo", width: 100, height: 75 },
      { id: "X_yyDbsNUWQ", width: 100, height: 75 },
    ],
  },
  {
    artist: "Miley Cyrus",
    title: "See You Again",
    links: [
      { id: "aJDC3Gg-F8w", width: 100, height: 75 },
      { id: "2zAr5yBYQoo", width: 100, height: 56 },
    ],
  },
];

export const Page = async () => {
  // redirect("/channels/01");
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/channels/00");
  // }, []);
  // read from local db what has been read
  // if 1 - 20 have been already fetched, do 21 - 40, etc

  // const res = await fetch("http://localhost:2221/api/mtv", {
  //   method: "get",
  //   next: { revalidate: 1000 },
  // });
  // const data = await res.json();

  // const data = sampleData;
  // console.log(res[0]);
  // console.log(res[0].links);

  // console.log("logging from Page");
  // console.log(res);
  // const testData = await res.json();
  // console.log(testData);

  // const testData = [
  //   { embedId: "CfUDAWZGBvo", width: 100, height: 56 },
  //   { embedId: "Q93VZdVDYPE", width: 100, height: 56 },
  //   { embedId: "-IeMN3eA9AY", width: 100, height: 56 },
  //   { embedId: "0VLras4mZ84", width: 100, height: 56 },
  //   { embedId: "2MxyydicOY4", width: 100, height: 56 },
  //   { embedId: "5ztU_jJyr2c", width: 100, height: 56 },
  //   { embedId: "2LyhweLk5Vc", width: 100, height: 56 },
  //   { embedId: "gShjHRGfkSQ", width: 100, height: 56 },
  //   { embedId: "ws6dFb69t7U", width: 100, height: 56 },
  //   { embedId: "lH5TRnY8JHw", width: 100, height: 56 },
  // ];

  return (
    <div className='h-screen w-screen bg-slate-800 flex flex-col '>
      <TVPlayer />
      <Remote />
      <ChannelBox />
      <VolumeBar />
    </div>
  );
};

export default Page;
