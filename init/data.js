const sampleData = [
  {
    itemName: "Silver iPhone 12",
    description: "A silver iPhone 12 with a cracked screen and a blue case.",
    location: "Coffee shop near 5th Avenue",
    question: "What is the wallpaper on the lock screen?",
    itemType: "Electronics",
    status: "Lost",
    image: {
      filename: "iphone12_silver.jpg",
      url: "https://tse4.mm.bing.net/th?id=OIP.BaUsJpB__GfD1hNfIe_iwgHaHa&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-10T14:30:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_1"),
    //   contactInfo: {
    //     email: "user1@example.com",
    //     phone: "123-456-7891",
    //   },
    // },
  },
  {
    itemName: "Blue Backpack",
    description: "A blue backpack with school books and a laptop inside.",
    location: "Library, 3rd floor",
    question: "What is the brand of the laptop?",
    itemType: "Personal Item",
    status: "Found",
    image: {
      filename: "blue_backpack.jpg",
      url: "https://tse1.mm.bing.net/th?id=OIP.kFcP_PrCPSv5mPcwRU8RuwHaJE&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-12T09:45:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_2"),
    //   contactInfo: {
    //     email: "user2@example.com",
    //     phone: "123-456-7892",
    //   },
    // },
  },
  {
    itemName: "Gold Ring",
    description: "A gold ring with a small diamond in the center.",
    location: "Restaurant bathroom",
    question: "What is engraved on the inside of the ring?",
    itemType: "Jewelry",
    status: "Lost",
    image: {
      filename: "gold_ring.jpg",
      url: "https://i5.walmartimages.com/asr/9edcf7e0-60f5-4756-a92d-4be2192b83a9_1.1f47521de03d30f2698f4342f02808ed.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
    },
    // dateReported: ISODate("2024-08-14T18:00:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_3"),
    //   contactInfo: {
    //     email: "user3@example.com",
    //     phone: "123-456-7893",
    //   },
    // },
  },
  {
    itemName: "Red Umbrella",
    description: "A red umbrella with a wooden handle, slightly worn.",
    location: "Train station platform 2",
    question: "What brand is printed on the umbrella?",
    itemType: "Personal Item",
    status: "Found",
    image: {
      filename: "red_umbrella.jpg",
      url: "https://tse3.mm.bing.net/th?id=OIP.Jci_rAYEg_AhmABb4-YMgwAAAA&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-09T07:30:00Z"),
    // dateReturned: ISODate("2024-08-11T10:00:00Z"),
    // reportedBy: {
    //   userId: ObjectId("user_id_4"),
    //   contactInfo: {
    //     email: "user4@example.com",
    //     phone: "123-456-7894",
    //   },
    // },
  },
  {
    itemName: "Brown Wallet",
    description: "A brown leather wallet containing cash and credit cards.",
    location: "Bus stop near Main Street",
    question: "What is the amount of cash inside?",
    itemType: "Personal Item",
    status: "Lost",
    image: {
      filename: "brown_wallet.jpg",
      url: "https://tse1.mm.bing.net/th?id=OIP.F9_x7w3Z8aFEgMF5N-y0PwHaE7&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-15T11:15:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_5"),
    //   contactInfo: {
    //     email: "user5@example.com",
    //     phone: "123-456-7895",
    //   },
    // },
  },
  {
    itemName: "Black Sunglasses",
    description: "A pair of black sunglasses with polarized lenses.",
    location: "Beach, near the lifeguard tower",
    question: "What is the brand of the sunglasses?",
    itemType: "Accessories",
    status: "Found",
    image: {
      filename: "black_sunglasses.jpg",
      url: "https://tse4.mm.bing.net/th?id=OIP.fVCM3g331guXT6QAkUGIwgHaHa&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-13T13:20:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_6"),
    //   contactInfo: {
    //     email: "user6@example.com",
    //     phone: "123-456-7896",
    //   },
    // },
  },
  {
    itemName: "Green Water Bottle",
    description: "A green metal water bottle with a sticker of a mountain.",
    location: "Gym locker room",
    question: "What is the brand of the water bottle?",
    itemType: "Personal Item",
    status: "Lost",
    image: {
      filename: "green_water_bottle.jpg",
      url: "https://tse3.mm.bing.net/th?id=OIP.Tey3IYFwr38tPqoTHJqGrQHaHa&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-08T16:40:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_7"),
    //   contactInfo: {
    //     email: "user7@example.com",
    //     phone: "123-456-7897",
    //   },
    // },
  },
  {
    itemName: "Silver Necklace",
    description: "A silver necklace with a heart-shaped pendant.",
    location: "Shopping mall parking lot",
    question: "What is engraved on the pendant?",
    itemType: "Jewelry",
    status: "Found",
    image: {
      filename: "silver_necklace.jpg",
      url: "https://tse1.mm.bing.net/th?id=OIP.x7zx6arnE2Q3LWRn-jXjmgHaHF&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-07T12:55:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_8"),
    //   contactInfo: {
    //     email: "user8@example.com",
    //     phone: "123-456-7898",
    //   },
    // },
  },
  {
    itemName: "Black Laptop",
    description: "A black Dell laptop with a missing 'E' key.",
    location: "Conference room, 2nd floor",
    question: "What is the name of the user account on the laptop?",
    itemType: "Electronics",
    status: "Lost",
    image: {
      filename: "black_laptop.jpg",
      url: "https://tse3.mm.bing.net/th?id=OIP.8oLRWyq5kEgRuHMWRjn8EQHaFr&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-16T08:30:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_9"),
    //   contactInfo: {
    //     email: "user9@example.com",
    //     phone: "123-456-7899",
    //   },
    // },
  },
  {
    itemName: "Blue Scarf",
    description: "A blue wool scarf with fringed edges.",
    location: "Park bench near the fountain",
    question: "What is the pattern on the scarf?",
    itemType: "Clothing",
    status: "Found",
    image: {
      filename: "blue_scarf.jpg",
      url: "https://tse2.mm.bing.net/th?id=OIP.FlvXfFA8w1lk6vKFPkg5pgHaHa&pid=Api&P=0&h=180"
    },
    // dateReported: ISODate("2024-08-11T15:10:00Z"),
    // dateReturned: null,
    // reportedBy: {
    //   userId: ObjectId("user_id_10"),
    //   contactInfo: {
    //     email: "user10@example.com",
    //     phone: "123-456-7810",
    //   },
    // },
  },
];

module.exports = { data: sampleData };


// {
//     itemName: "college bag",
//     description : "the bag has some notebooks, a history text-book and a pencil box",
//     question: "What is the color of the bag?",
// },
