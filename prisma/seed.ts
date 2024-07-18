import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: 1,
    categoryId: 8,
    title: 'Apple MacBook Air 13" M2 8GB 256GB Midnight',
    description:
      "The all-new MacBook Air is supercharged by the M2 chip. It features a stunning Liquid Retina display, all-day battery life, and a beautiful thin and light design with a durable aluminum enclosure made from 100% recycled aluminum.",
    price: 1199,
    discount: 10,
    stock: 15,
    isActive: true,
    createdAt: new Date("2024-07-01T12:00:00.000Z"),
    attributes: [
      { name: "Color", value: "Midnight" },
      { name: "Processor", value: "M2" },
      { name: "RAM", value: "8GB" },
      { name: "Storage", value: "256GB SSD" },
    ],
    images: [
      {
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
      },
    ],
  },
  {
    id: 2,
    categoryId: 11,
    title: "Sony PlayStation 5 Console",
    description:
      "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games.",
    price: 499,
    discount: 0,
    stock: 5,
    isActive: true,
    createdAt: new Date("2024-07-02T10:30:00.000Z"),
    attributes: [
      { name: "Storage", value: "825GB SSD" },
      { name: "Resolution", value: "4K" },
      { name: "Frame Rate", value: "Up to 120fps" },
      { name: "Ray Tracing", value: "Yes" },
    ],
    images: [
      {
        url: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21",
      },
    ],
  },
  {
    id: 3,
    categoryId: 5,
    title: "Amazon Echo Dot (5th Gen) Smart Speaker",
    description:
      "Our best sounding Echo Dot yet. Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room.",
    price: 49.99,
    discount: 20,
    stock: 30,
    isActive: true,
    createdAt: new Date("2024-07-03T09:15:00.000Z"),
    attributes: [
      { name: "Color", value: "Charcoal" },
      { name: "Voice Assistant", value: "Alexa" },
      { name: "Connectivity", value: "Wi-Fi, Bluetooth" },
      { name: "Speaker", value: "1.73-inch front-firing speaker" },
    ],
    images: [
      {
        url: "https://m.media-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg",
      },
    ],
  },
  {
    id: 4,
    categoryId: 9,
    title: 'LG UltraFine 27UN880-B 27" 4K USB-C Monitor',
    description:
      "Experience true-to-life color and clarity on this 27-inch 4K UHD (3840 x 2160) IPS display. With USB-C connectivity and ErgoStand design, it's perfect for creative professionals and multitaskers.",
    price: 699.99,
    discount: 15,
    stock: 8,
    isActive: true,
    createdAt: new Date("2024-07-04T14:45:00.000Z"),
    attributes: [
      { name: "Screen Size", value: "27 inches" },
      { name: "Resolution", value: "4K UHD (3840 x 2160)" },
      { name: "Panel Type", value: "IPS" },
      { name: "Ports", value: "USB-C, HDMI, DisplayPort" },
    ],
    images: [
      {
        url: "https://www.lg.com/us/images/monitors/md07000140/gallery/desktop-01.jpg",
      },
    ],
  },
  {
    id: 5,
    categoryId: 10,
    title: "NVIDIA GeForce RTX 4080 16GB GDDR6X Graphics Card",
    description:
      "Power your gaming rig with the NVIDIA GeForce RTX 4080. Featuring 16GB of GDDR6X memory and NVIDIA's latest Ada Lovelace architecture, this GPU delivers stunning graphics and ray-tracing performance for the most demanding games and applications.",
    price: 1199,
    discount: 8,
    stock: 3,
    isActive: true,
    createdAt: new Date("2024-07-05T11:20:00.000Z"),
    attributes: [
      { name: "Memory", value: "16GB GDDR6X" },
      { name: "Architecture", value: "NVIDIA Ada Lovelace" },
      { name: "Ray Tracing", value: "Yes" },
      { name: "DLSS", value: "DLSS 3" },
    ],
    images: [
      {
        url: "https://assets.exxactcorp.com/webp/productimages/large/EXX-IMG-6160921.webp",
      },
    ],
  },
];

export async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: {
        // id: product.id,
        categoryId: product.categoryId,
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        isActive: product.isActive,
        createdAt: product.createdAt,
        attributes: {
          create: product.attributes.map((attr) => ({
            name: attr.name,
            value: attr.value,
          })),
        },
        images: {
          create: product.images.map((img) => ({
            url: img.url,
          })),
        },
      },
    });
  }
}
