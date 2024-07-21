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
  // for (const product of products) {
  //   await prisma.product.create({
  //     data: {
  //       // id: product.id,
  //       categoryId: product.categoryId,
  //       title: product.title,
  //       description: product.description,
  //       price: product.price,
  //       discount: product.discount,
  //       stock: product.stock,
  //       isActive: product.isActive,
  //       createdAt: product.createdAt,
  //       attributes: {
  //         create: product.attributes.map((attr) => ({
  //           name: attr.name,
  //           value: attr.value,
  //         })),
  //       },
  //       images: {
  //         create: product.images.map((img) => ({
  //           url: img.url,
  //         })),
  //       },
  //     },
  //   });
  // }
  // await prisma.category.deleteMany();
  await prisma.category.create({
    data: {
      name: "Technic",
      subcategories: {
        create: [
          {
            name: "Computers",
            subcategories: {
              create: [
                {
                  name: "Notebooks and its Accessories",
                  subcategories: {
                    create: [
                      { name: "Notebooks" },
                      { name: "Notebook Accessories" },
                      { name: "Laptop Bags" },
                      { name: "Docking Stations" },
                    ],
                  },
                },
                {
                  name: "Desktop Computers",
                  subcategories: {
                    create: [
                      { name: "All-in-One PCs" },
                      { name: "Gaming PCs" },
                      { name: "Workstations" },
                    ],
                  },
                },
                { name: "Tablets" },
              ],
            },
          },
          {
            name: "Gaming",
            subcategories: {
              create: [
                { name: "Gaming Consoles" },
                { name: "Gaming Accessories" },
                { name: "Gaming Chairs" },
              ],
            },
          },
          {
            name: "Smart Home",
            subcategories: {
              create: [
                { name: "Smart Lighting" },
                { name: "Smart Speakers" },
                { name: "Smart Thermostats" },
                { name: "Security Cameras" },
              ],
            },
          },
          {
            name: "Monitors",
            subcategories: {
              create: [
                { name: "Gaming Monitors" },
                { name: "Office Monitors" },
                { name: "Curved Monitors" },
              ],
            },
          },
          {
            name: "Graphics Cards",
            subcategories: {
              create: [
                { name: "NVIDIA GPUs" },
                { name: "AMD GPUs" },
                { name: "Workstation GPUs" },
              ],
            },
          },
          {
            name: "Components",
            subcategories: {
              create: [
                { name: "Processors (CPUs)" },
                { name: "Motherboards" },
                { name: "Memory (RAM)" },
                { name: "Storage Devices" },
              ],
            },
          },
          {
            name: "Networking",
            subcategories: {
              create: [
                { name: "Routers" },
                { name: "Modems" },
                { name: "Network Switches" },
                { name: "Network Attached Storage (NAS)" },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Small Appliances",
      subcategories: {
        create: [
          {
            name: "Kitchen Appliances",
            subcategories: {
              create: [
                { name: "Coffee Makers" },
                { name: "Blenders" },
                { name: "Toasters" },
                { name: "Food Processors" },
                { name: "Electric Kettles" },
              ],
            },
          },
          {
            name: "Home Appliances",
            subcategories: {
              create: [
                { name: "Vacuum Cleaners" },
                { name: "Irons" },
                { name: "Air Purifiers" },
                { name: "Fans" },
                { name: "Humidifiers" },
              ],
            },
          },
          {
            name: "Personal Care Appliances",
            subcategories: {
              create: [
                { name: "Hair Dryers" },
                { name: "Electric Shavers" },
                { name: "Electric Toothbrushes" },
                { name: "Hair Straighteners" },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Large Appliances",
      subcategories: {
        create: [
          {
            name: "Kitchen Appliances",
            subcategories: {
              create: [
                { name: "Refrigerators" },
                { name: "Dishwashers" },
                { name: "Ovens" },
                { name: "Cooktops" },
                { name: "Microwave Ovens" },
              ],
            },
          },
          {
            name: "Laundry Appliances",
            subcategories: {
              create: [
                { name: "Washing Machines" },
                { name: "Dryers" },
                { name: "Washer-Dryer Combos" },
              ],
            },
          },
          {
            name: "Climate Control",
            subcategories: {
              create: [
                { name: "Air Conditioners" },
                { name: "Heaters" },
                { name: "Dehumidifiers" },
              ],
            },
          },
        ],
      },
    },
  });
}

export async function mainPro() {
  const productData = [
    {
      categoryId: 4,
      title: "UltraBook Pro X1",
      price: 1299.99,
      discount: 100,
      description: "Powerful and lightweight laptop for professionals.",
      images: [
        "https://i.pcmag.com/imagery/reviews/05JZrQM2xvNgyqjckMaqJFR-1..v1627500402.jpg",
        "https://m.media-amazon.com/images/I/71oxBD8ff5L.jpg",
        "https://images-cdn.ubuy.co.in/63f8b3c900dc2e24de32b2b1-lenovo-thinkpad-x1-carbon-gen-9.jpg",
      ],
      stock: 50,
      attributes: [
        { name: "Processor", value: "Intel Core i7-11th Gen" },
        { name: "RAM", value: "16GB" },
        { name: "Storage", value: "512GB SSD" },
        { name: "Display", value: "14-inch 4K" },
      ],
    },
    {
      categoryId: 4,
      title: "GamerX Extreme",
      price: 1799.99,
      discount: 0,
      description: "High-performance gaming laptop with RTX graphics.",
      images: [
        "https://images.jdmagicbox.com/quickquotes/images_main/dell-laptops-04-01-2024-24-272725655-y40fuckz.png",
      ],
      stock: 30,
      attributes: [
        { name: "Processor", value: "AMD Ryzen 9" },
        { name: "RAM", value: "32GB" },
        { name: "Storage", value: "1TB NVMe SSD" },
        { name: "GPU", value: "NVIDIA RTX 3080" },
      ],
    },
    {
      categoryId: 4,
      title: "Student Essential",
      price: 599.99,
      discount: 50,
      description: "Affordable laptop perfect for students and everyday use.",
      images: [
        "https://cdn.mos.cms.futurecdn.net/h7RghmVhRSKgsqSpRCgiL-1200-80.jpg",
      ],
      stock: 100,
      attributes: [
        { name: "Processor", value: "Intel Core i5-10th Gen" },
        { name: "RAM", value: "8GB" },
        { name: "Storage", value: "256GB SSD" },
        { name: "Display", value: "15.6-inch Full HD" },
      ],
    },
    {
      categoryId: 8,
      title: "PowerTower X5",
      price: 1499.99,
      discount: 0,
      description: "High-performance desktop for heavy workloads and gaming.",
      images: [
        "https://i.simpalsmedia.com/marketplace/richmedia/f48ab834ecf052407266c50d34c469c7.png",
      ],
      stock: 25,
      attributes: [
        { name: "Processor", value: "Intel Core i9-11900K" },
        { name: "RAM", value: "32GB DDR4" },
        { name: "Storage", value: "1TB NVMe SSD + 2TB HDD" },
        { name: "GPU", value: "NVIDIA RTX 3070" },
      ],
    },
    {
      categoryId: 12,
      title: "SlimTab Pro",
      price: 799.99,
      discount: 23,
      description:
        "Versatile tablet with detachable keyboard and stylus support.",
      images: [
        "https://static1.nordic.pictures/4192199-thickbox_default/kiano-slimtab-pro-2-ms.jpg",
      ],
      stock: 75,
      attributes: [
        { name: "Display", value: "12.3-inch 2K" },
        { name: "Storage", value: "256GB" },
        { name: "Battery Life", value: "Up to 12 hours" },
        { name: "OS", value: "Android 11" },
      ],
    },
    {
      categoryId: 73,
      title: "UltraPhone 12",
      price: 999.99,
      discount: 7,
      description: "Latest flagship smartphone with advanced camera system.",
      images: [
        "https://trak.in/stories/wp-content/uploads/2024/05/5C278C3B-761B-420F-93B9-E88AFAE33087.jpeg",
      ],
      stock: 200,
      attributes: [
        { name: "Display", value: "6.7-inch OLED" },
        { name: "Camera", value: "Triple 12MP system" },
        { name: "Storage", value: "128GB" },
        { name: "5G", value: "Yes" },
      ],
    },
    {
      categoryId: 22,
      title: "CurveView 34",
      price: 499.99,
      discount: 0,
      description: "34-inch curved gaming monitor with high refresh rate.",
      images: [
        "https://m.media-amazon.com/images/I/71DHN67lotL._AC_UF894,1000_QL80_.jpg",
      ],
      stock: 40,
      attributes: [
        { name: "Size", value: "34-inch" },
        { name: "Resolution", value: "3440x1440" },
        { name: "Refresh Rate", value: "144Hz" },
        { name: "Response Time", value: "1ms" },
      ],
    },
    {
      categoryId: 26, // Graphics Cards
      title: "PixelMaster RTX 4080",
      price: 799.99,
      discount: 0,
      description: "High-end graphics card for 4K gaming and content creation.",
      images: [
        "https://m.media-amazon.com/images/I/71afoT9-2QL._AC_UF894,1000_QL80_.jpg",
      ],
      stock: 15,
      attributes: [
        { name: "VRAM", value: "16GB GDDR6X" },
        { name: "Boost Clock", value: "2.5 GHz" },
        { name: "Ray Tracing Cores", value: "70" },
        { name: "Power Consumption", value: "320W" },
      ],
    },
    {
      categoryId: 31, // Processors
      title: "CoreMaster i9-12900K",
      price: 589.99,
      discount: 0,
      description: "Top-of-the-line CPU for enthusiasts and professionals.",
      images: [
        "https://img.terabyteshop.com.br/produto/g/processador-intel-core-i9-10900k-370ghz-530ghz-turbo-10-geracao-10-cores-20-threads-lga-1200-bx8070110900k_134999.jpg",
      ],
      stock: 30,
      attributes: [
        { name: "Cores", value: "16 (8P+8E)" },
        { name: "Threads", value: "24" },
        { name: "Base Frequency", value: "3.2 GHz" },
        { name: "Max Turbo Frequency", value: "5.2 GHz" },
      ],
    },
    {
      categoryId: 74, // Storage
      title: "SpeedDrive NVMe 2TB",
      price: 249.99,
      discount: 30,
      description:
        "Ultra-fast NVMe SSD for quick boot times and file transfers.",
      images: [
        "https://m.media-amazon.com/images/I/61PC4kpvA1L._AC_UF1000,1000_QL80_.jpg",
      ],
      stock: 100,
      attributes: [
        { name: "Capacity", value: "2TB" },
        { name: "Interface", value: "PCIe 4.0 x4" },
        { name: "Read Speed", value: "7000 MB/s" },
        { name: "Write Speed", value: "5300 MB/s" },
      ],
    },
    {
      categoryId: 75, // Networking
      title: "MeshPro Tri-Band Router",
      price: 299.99,
      discount: 20,
      description: "High-performance mesh Wi-Fi system for large homes.",
      images: [
        "https://www.nfm.com/dw/image/v2/BDFM_PRD/on/demandware.static/-/Sites-nfm-master-catalog/default/dwa610dcaa/images/062/00/62004536-7.jpg?sw=1000&sh=1000&sm=fit",
      ],
      stock: 50,
      attributes: [
        { name: "Wi-Fi Standard", value: "Wi-Fi 6 (802.11ax)" },
        { name: "Coverage", value: "Up to 5,000 sq ft" },
        { name: "Bands", value: "Tri-Band" },
        { name: "Ethernet Ports", value: "3 Gigabit LAN" },
      ],
    },
    {
      categoryId: 10, // Peripherals
      title: "ErgoComfort Keyboard",
      price: 129.99,
      discount: 0,
      description:
        "Ergonomic mechanical keyboard with customizable RGB lighting.",
      images: [
        "https://www.promate.net/cdn/shop/files/Combo-CM4Ecom_2_800x.jpg?v=1685345222",
      ],
      stock: 75,
      attributes: [
        { name: "Switch Type", value: "Cherry MX Brown" },
        { name: "Layout", value: "Split ergonomic" },
        { name: "Backlight", value: "RGB" },
        { name: "Connectivity", value: "USB-C, Wireless" },
      ],
    },

    {
      categoryId: 4, // Laptops
      title: "ConvertoPro 360",
      price: 1099.99,
      discount: 18,
      description:
        "Versatile 2-in-1 laptop with touchscreen and stylus support.",
      images: [
        "https://www.hp.com/gb-en/shop/Html/Merch/Images/800P2EA-ABU_1750x1285.jpg",
      ],
      stock: 60,
      attributes: [
        { name: "Processor", value: "Intel Core i7-11th Gen" },
        { name: "RAM", value: "16GB" },
        { name: "Storage", value: "512GB SSD" },
        { name: "Display", value: "14-inch 1080p Touchscreen" },
      ],
    },
    {
      categoryId: 17, // Smart Home
      title: "HomeBrain Hub",
      price: 149.99,
      discount: 0,
      description:
        "Central smart home hub with voice control and automation features.",
      images: [
        "https://i0.wp.com/www.tech365.nl/wp-content/uploads/2019/03/Athom-Homey-2019-tech365nl-006.jpg?resize=700%2C467&ssl=1",
      ],
      stock: 80,
      attributes: [
        { name: "Compatibility", value: "Alexa, Google Assistant, HomeKit" },
        { name: "Connectivity", value: "Wi-Fi, Zigbee, Z-Wave" },
        { name: "Display", value: "7-inch touchscreen" },
        { name: "Power", value: "AC adapter, Battery backup" },
      ],
    },
    {
      categoryId: 21, // Cameras
      title: "CapturePro DSLR",
      price: 1299.99,
      discount: 30,
      description: "Professional-grade DSLR camera with 4K video capabilities.",
      images: [
        "https://www.backcountryskiingcanada.com/web/default/files/pages-image/Peak_Designs/Capture-Pro-Camera-Clip-5.jpg",
      ],
      stock: 40,
      attributes: [
        { name: "Sensor", value: "24.2 MP Full-Frame CMOS" },
        { name: "ISO Range", value: "100-51200 (expandable to 204800)" },
        { name: "Autofocus", value: "45-point all cross-type AF system" },
        { name: "Video", value: "4K at 30fps, 1080p at 60fps" },
      ],
    },
    {
      categoryId: 15, // Gaming Accessories
      title: "ProGamer Mouse",
      price: 79.99,
      discount: 13,
      description:
        "High-precision gaming mouse with customizable weights and RGB lighting.",
      images: [
        "https://images-cdn.ubuy.co.in/645b38394ad9d440e8611c4c-wireless-gaming-mouse-bluetooth-mouse.jpg",
      ],
      stock: 200,
      attributes: [
        { name: "DPI", value: "100-25,600" },
        { name: "Buttons", value: "11 programmable" },
        { name: "Sensor", value: "Optical" },
        { name: "Weight", value: "Adjustable, 121g-141g" },
      ],
    },

    {
      categoryId: 4, // Laptops
      title: "MacBook Air M2",
      price: 1199.99,
      discount: 0,
      description: "Thin and light laptop with Apple's powerful M2 chip.",
      images: [
        "https://techcrunch.com/wp-content/uploads/2022/07/CMC_1580.jpg",
      ],
      stock: 100,
      attributes: [
        { name: "Processor", value: "Apple M2" },
        { name: "RAM", value: "8GB unified memory" },
        { name: "Storage", value: "256GB SSD" },
        { name: "Display", value: "13.6-inch Liquid Retina" },
      ],
    },
  ];

  for (let index = 0; index < productData.length; index++) {
    const element = productData[index];
    await prisma.product.create({
      data: {
        categoryId: element.categoryId,
        title: element.title,
        price: element.price,
        discount: element.discount,
        description: element.description,
        images: {
          create: element.images.map((img) => ({ url: img })),
        },
        stock: element.stock,
        attributes: {
          create: element.attributes.map((attr) => ({
            name: attr.name,
            value: attr.value,
          })),
        },
      },
    });
  }
}
