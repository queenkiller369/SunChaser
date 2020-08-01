//ts by Woody

import * as Knex from "knex";

exports.seed = async function (knex: Knex) {
  await knex("likes").del();
  await knex("comments").del();
  await knex("photos").del();
  await knex("users").del();


  // possible to insert an array of data with knex


  const [userId] = await knex
    .insert([
      {
        email: "tony04701@gmail.com",
        password: "$2a$10$Xvmx91JKgacv6CBCVSO7hOdPyXyWv.gjKQGtqkUNpQS0S.rzeZEmW",
        username: "Tony San",
        role: "admin",
        created_at: "2004-10-19 10:23:54+02",
        updated_at: "2009-10-19 10:23:54+02",
      },
      
    ])
    .into("users")
    .returning("id");

  const [userId2] = await knex
    .insert([
      {
        email: "chit@tecky.stu",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "CHiT",
        role: "admin",
        created_at: "2010-10-19 10:23:54+02",
        updated_at: "2011-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

  const [userId3] = await knex
    .insert([
      {
        email: "ming@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Ming",
        role: "user",
        created_at: "2008-10-19 10:23:54+02",
        updated_at: "2010-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

  const [userId4] = await knex
    .insert([
      {
        email: "woodycck@gmail.com",
        password: "$2a$10$Pj4B12lp75cmLXW1v0.DJO9tkQ0pEYIj7gjzizwNu5TM0lVnxGEQC",
        username: "Woody",
        role: "admin",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId5] = await knex
    .insert([
      {
        email: "samuel@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Samuel",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId6] = await knex
    .insert([
      {
        email: "helen@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Helen",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId7] = await knex
    .insert([
      {
        email: "raymond@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Raymond",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId8] = await knex
    .insert([
      {
        email: "wilson@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Wilson",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId9] = await knex
    .insert([
      {
        email: "ted@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Ted",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId10] = await knex
    .insert([
      {
        email: "samson@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Samson",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId11] = await knex
    .insert([
      {
        email: "ethan@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Ethan",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId12] = await knex
    .insert([
      {
        email: "him@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Him",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId13] = await knex
    .insert([
      {
        email: "benny@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Benny",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId14] = await knex
    .insert([
      {
        email: "mo@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Mo",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId15] = await knex
    .insert([
      {
        email: "steve@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Steve",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId16] = await knex
    .insert([
      {
        email: "monica@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Monica",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId17] = await knex
    .insert([
      {
        email: "kt@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "KT",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId18] = await knex
    .insert([
      {
        email: "gordan@tecky.teacher",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Gordan",
        role: "admin",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId19] = await knex
    .insert([
      {
        email: "alex@tecky.teacher",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Alex",
        role: "admin",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId20] = await knex
    .insert([
      {
        email: "jason@tecky.teacher",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Jason",
        role: "admin",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId21] = await knex
    .insert([
      {
        email: "rush@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Rush",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");

    const [userId22] = await knex
    .insert([
      {
        email: "wung@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Wung",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");


    const [userId23] = await knex
    .insert([
      {
        email: "pazu@tecky.student",
        password: "$2a$10$mZsqHqGBuHXawf6SghS6D.Fj4pGgQ7pT8qattSf13ZVFe0IiI7c9a",
        username: "Pazu",
        role: "user",
        created_at: "2012-10-19 10:23:54+02",
        updated_at: "2013-10-19 10:23:54+02",
      },
    ])
    .into("users")
    .returning("id");


  const [photo_id] = await knex
    .insert([
      {
        image: "sunset_peak_sunrise.jpg",
        title: "大東山日出真係好正",
        description: "正",
        location: "Sunset Peak",
        district: "Islands",
        environment: "sunrise",
        status: "shown",
        created_at: "2016-10-19 23:23:54+02",
        updated_at: "2016-10-19 23:23:54+02",
        user_id: userId,
        latitude: "22.258189",
        longitude: "113.954294",
      },
    ])
    .into("photos")
    .returning("id");

  const [photo_id2] = await knex
    .insert([
      {
        image: "tsing_yi_nature_trail_sunset.jpg",
        title: "Tsing Yi Nature Trail",
        description: "",
        location: "Tsing Yi Nature Trail",
        district: "Kwai Tsing",
        environment: "sunset",
        status: "shown",
        created_at: "2016-10-19 12:23:54+02",
        updated_at: "2016-10-19 12:23:54+02",
        user_id: userId2,
        latitude: "22.348175",
        longitude: "114.092083",
      },
    ])
    .into("photos")
    .returning("id");

  const [photo_id3] = await knex
    .insert([
      {
        image: "sai_wan_pier_sunset.jpg",
        title: "如此壯麗的西環碼頭日落",
        description: "",
        location: "西環碼頭",
        district: "Central And Western",
        environment: "sunset",
        status: "shown",
        created_at: "2019-10-19 12:33:54+02",
        updated_at: "2019-10-19 12:33:54+02",
        user_id: userId3,
        latitude: "22.289335",
        longitude: "114.131955",
      },
    ])
    .into("photos")
    .returning("id");

  const [photo_id4] = await knex
    .insert([
      {
        image: "Ha_Pak_Nai_Sunset.jpg",
        title: "好浪漫嘅下白泥日落 ^3^",
        description: "",
        location: "Ha Pak Nai",
        district: "Yuen Long",
        environment: "sunset",
        status: "shown",
        created_at: "2020-03-19 12:13:54+02",
        updated_at: "2020-03-19 12:13:54+02",
        user_id: userId4,
        latitude: "22.426800",
        longitude: "113.938625",
      },
    ])
    .into("photos")
    .returning("id");

  const [photo_id5] = await knex
    .insert([
      {
        image: "tuen_mun_cat_sunset.jpg",
        title: "龍鼓灘喵喵與日落",
        description: "",
        location: "Lung Kwu Tan",
        district: "Tuen Mun",
        environment: "sunset",
        status: "shown",
        created_at: "2019-12-19 12:29:54+02",
        updated_at: "2019-12-19 12:29:54+02",
        user_id: userId5,
        latitude: "22.391198",
        longitude: "113.918432",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id6] = await knex
    .insert([
      {
        image: "Tung_Lung_Island_Sunrise.jpg",
        title: "東龍島露營+日出",
        description: "",
        location: "Tung Lung Island",
        district: "Sai Kung",
        environment: "sunrise",
        status: "shown",
        created_at: "2018-10-19 23:13:54+02",
        updated_at: "2018-10-19 23:13:54+02",
        user_id: userId6,
        latitude: "22.248997",
        longitude: "114.295154",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id7] = await knex
    .insert([
      {
        image: "Sham_Tseng_Sunset.jpg",
        title: "荃灣行路去深井睇埋日落",
        description: "",
        location: "Sham Tseng",
        district: "Tsuen Wan",
        environment: "sunset",
        status: "shown",
        created_at: "2020-06-12 12:23:54+02",
        updated_at: "2020-06-12 12:23:54+02",
        user_id: userId7,
        latitude: "22.363526",
        longitude: "114.066990",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id8] = await knex
    .insert([
      {
        image: "meifoo_sunset.jpg",
        title: "趕返屋企照顧我喵喵前嚮美孚睇到嘅日落",
        description: "",
        location: "Mei Foo",
        district: "Mei Foo",
        environment: "sunset",
        status: "shown",
        created_at: "2020-06-23 12:45:54+02",
        updated_at: "2020-06-23 12:45:54+02",
        user_id: userId8,
        latitude: "22.336492",
        longitude: "114.140741",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id9] = await knex
    .insert([
      {
        image: "lai_king_sunset.jpg",
        title: "祖堯邨停車場日落",
        description: "",
        location: "Cho Yiu Chuen, Lai King",
        district: "Kwai Tsing",
        environment: "sunset",
        status: "shown",
        created_at: "2019-12-19 12:50:54+02",
        updated_at: "2019-12-19 12:50:54+02",
        user_id: userId9,
        latitude: "22.345246",
        longitude: "114.128162",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id10] = await knex
    .insert([
      {
        image: "kuk_po_sunset.jpg",
        title: "谷埔日落",
        description: "",
        location: "谷埔",
        district: "North",
        environment: "sunset",
        status: "shown",
        created_at: "2017-02-13 12:23:54+02",
        updated_at: "2017-02-13 12:23:54+02",
        user_id: userId10,
        latitude: "22.531606",
        longitude: "114.237371",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id11] = await knex
    .insert([
      {
        image: "maonshan_ngong_ping_sunrise.jpg",
        title: "我上咗馬鞍山昂平睇日出, 係咪好型棍呢?",
        description: "",
        location: "馬鞍山昂平",
        district: "Sai Kung",
        environment: "sunrise",
        status: "shown",
        created_at: "2019-11-19 23:23:54+02",
        updated_at: "2019-11-19 23:23:54+02",
        user_id: userId11,
        latitude: "22.390913",
        longitude: "114.253093",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id12] = await knex
    .insert([
      {
        image: "tsuen_wan_pier_sunset.jpg",
        title: "今日早咗放學, 可以去荃灣碼頭睇日落",
        description: "",
        location: "荃灣碼頭",
        district: "Tsuen Wan",
        environment: "sunset",
        status: "shown",
        created_at: "2020-06-22 11:59:54+02",
        updated_at: "2020-06-22 11:59:54+02",
        user_id: userId12,
        latitude: "22.366415",
        longitude: "114.110344",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id13] = await knex
    .insert([
      {
        image: "tsuen-wan-riviera-park_sunset.jpg",
        title: "放學睇日落",
        description: "",
        location: "荃灣海濱公園",
        district: "Tsuen Wan",
        environment: "sunset",
        status: "shown",
        created_at: "2020-06-10 12:13:54+02",
        updated_at: "2020-06-10 12:13:54+02",
        user_id: userId13,
        latitude: "22.367648",
        longitude: "114.109208",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id14] = await knex
    .insert([
      {
        image: "Hok_Tsui_sunrise.jpg",
        title: "鶴咀看日出前意外看到UFO!",
        description: "",
        location: "鶴咀",
        district: "Southern",
        environment: "sunrise",
        status: "shown",
        created_at: "2020-06-25 23:23:54+02",
        updated_at: "2020-06-25 23:23:54+02",
        user_id: userId14,
        latitude: "22.208698",
        longitude: "114.259343",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id15] = await knex
    .insert([
      {
        image: "wan_chai_sunset.jpg",
        title: "灣仔會展日落如此多FUN",
        description: "",
        location: "會展",
        district: "Wan Chai",
        environment: "sunset",
        status: "shown",
        created_at: "2013-10-19 12:23:54+02",
        updated_at: "2013-10-19 12:23:54+02",
        user_id: userId15,
        latitude: "22.285070",
        longitude: "114.174362",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id16] = await knex
    .insert([
      {
        image: "kwun_tong_promenade_sunset.jpg",
        title: "日落下的觀塘海濱公園",
        description: "",
        location: "觀塘海濱公園",
        district: "Kwun Tong",
        environment: "sunset",
        status: "shown",
        created_at: "2019-10-12 12:23:54+02",
        updated_at: "2019-10-12 12:23:54+02",
        user_id: userId16,
        latitude: "22.307767",
        longitude: "114.220113",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id17] = await knex
    .insert([
      {
        image: "Sam_Mun_Tsai_sunrise.jpg",
        title: "大埔三門仔日出",
        description: "",
        location: "大埔三門仔",
        district: "Tai Po",
        environment: "sunrise",
        status: "shown",
        created_at: "2018-10-16 23:23:54+02",
        updated_at: "2018-10-16 23:23:54+02",
        user_id: userId17,
        latitude: "22.455298",
        longitude: "114.216183",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id18] = await knex
    .insert([
      {
        image: "Wu_Kai_Sha_sunset.jpg",
        title: "烏溪沙日落",
        description: "",
        location: "烏溪沙",
        district: "Sha Tin",
        environment: "sunset",
        status: "shown",
        created_at: "2020-06-21 12:23:54+02",
        updated_at: "2020-06-21 12:23:54+02",
        user_id: userId18,
        latitude: "22.427730",
        longitude: "114.233531",
      },
    ])
    .into("photos")
    .returning("id");
  
    const [photo_id19] = await knex
    .insert([
      {
        image: "the_peak_sunrise.jpg",
        title: "太平山山頂日出",
        description: "",
        location: "太平山山頂",
        district: "Central And Western",
        environment: "sunrise",
        status: "shown",
        created_at: "2012-10-19 23:23:54+02",
        updated_at: "2012-10-19 23:23:54+02",
        user_id: userId19,
        latitude: "22.278026",
        longitude: "114.146856",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id20] = await knex
    .insert([
      {
        image: "Tsuen_Wan_Belvedere_Garden_sunrise.jpg",
        title: "荃灣麗城花園日出",
        description: "",
        location: "荃灣麗城花園",
        district: "Tsuen Wan",
        environment: "sunrise",
        status: "shown",
        created_at: "2020-06-25 23:23:54+02",
        updated_at: "2020-06-25 23:23:54+02",
        user_id: userId20,
        latitude: "22.368310",
        longitude: "114.098218",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id21] = await knex
    .insert([
      {
        image: "saiwanshan_sunset.jpg",
        title: "西灣炮台日落",
        description: "",
        location: "西灣炮台",
        district: "Eastern",
        environment: "sunset",
        status: "shown",
        created_at: "2020-06-07 12:23:54+02",
        updated_at: "2020-06-07 12:23:54+02",
        user_id: userId21,
        latitude: "22.273125",
        longitude: "114.235139",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id22] = await knex
    .insert([
      {
        image: "TszWanShan_sunset.jpg",
        title: "慈雲山日落",
        description: "",
        location: "慈雲山",
        district: "Wong Tai Sin",
        environment: "sunset",
        status: "shown",
        created_at: "2018-09-15 12:23:54+02",
        updated_at: "2018-09-15 12:23:54+02",
        user_id: userId12,
        latitude: "22.352091",
        longitude: "114.197176",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id23] = await knex
    .insert([
      {
        image: "west_kowloon_sunset.jpg",
        title: "西九海濱長廊苗圃公園日落",
        description: "",
        location: "西九海濱長廊苗圃公園",
        district: "Yau Tsim Mong",
        environment: "sunset",
        status: "shown",
        created_at: "2015-10-08 12:23:54+02",
        updated_at: "2015-10-08 12:23:54+02",
        user_id: userId22,
        latitude: "22.302145",
        longitude: "114.154744",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id24] = await knex
    .insert([
      {
        image: "hunghom_pier_sunset.jpg",
        title: "Hung Hom Pier",
        description: "",
        location: "Hung Hom Pier",
        district: "Kowloon City",
        environment: "sunset",
        status: "shown",
        created_at: "2017-10-19 12:23:54+02",
        updated_at: "2017-10-19 12:23:54+02",
        user_id: userId23,
        latitude: "22.301155",
        longitude: "114.189984",
      },
    ])
    .into("photos")
    .returning("id");

    const [photo_id25] = await knex
    .insert([
      {
        image: "sham_shui_po.jpeg",
        title: "深水埗係平民天堂",
        description: "",
        location: "Apliu Street",
        district: "Sham Shui Po",
        environment: "sunset",
        status: "shown",
        created_at: "2015-10-19 12:23:54+02",
        updated_at: "2015-10-19 12:23:54+02",
        user_id: userId23,
        latitude: "22.329144",
        longitude: "114.161635",
      },
    ])
    .into("photos")
    .returning("id");
  
  

  const likes = await knex
    .insert([
      {
        created_at: "2004-10-19 10:23:54+02",
        updated_at: "2009-10-19 10:23:54+02",
        photo_id: photo_id,
        user_id: userId,
      },
      {
        created_at: "2001-10-19 10:23:54+02",
        updated_at: "2000-10-19 10:23:54+02",
        photo_id: photo_id,
        user_id: userId2,
      },
      {
        created_at: "2001-10-19 10:23:54+02",
        updated_at: "2000-10-19 10:23:54+02",
        photo_id: photo_id,
        user_id: userId3,
      },
      {
        created_at: "2005-10-19 10:23:54+02",
        updated_at: "2009-10-20 10:23:54+02",
        photo_id: photo_id2,
        user_id: userId2,
      },
      {
        created_at: "2005-10-19 10:23:54+02",
        updated_at: "2009-10-20 10:23:54+02",
        photo_id: photo_id2,
        user_id: userId,
      },
      {
        created_at: "2006-10-19 10:23:54+02",
        updated_at: "2009-10-21 10:23:54+02",
        photo_id: photo_id3,
        user_id: userId3,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id4,
        user_id: userId4,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id5,
        user_id: userId5,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id6,
        user_id: userId6,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id7,
        user_id: userId7,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id8,
        user_id: userId8,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id9,
        user_id: userId9,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id10,
        user_id: userId10,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id11,
        user_id: userId11,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id12,
        user_id: userId12,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id13,
        user_id: userId13,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id14,
        user_id: userId14,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id15,
        user_id: userId15,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id16,
        user_id: userId16,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id17,
        user_id: userId17,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id18,
        user_id: userId18,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id19,
        user_id: userId19,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id20,
        user_id: userId20,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id21,
        user_id: userId21,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id22,
        user_id: userId21,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id23,
        user_id: userId22,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id24,
        user_id: userId22,
      },
      {
        created_at: "2007-10-19 10:23:54+02",
        updated_at: "2009-10-22 10:23:54+02",
        photo_id: photo_id25,
        user_id: userId22,
      },
    ])
    .into("likes");

  const comments = await knex
    .insert([
      {
        content: "So Damn Beautiful!",
        created_at: "2018-10-19 10:23:54+02",
        updated_at: "2018-11-19 10:23:54+02",
        photo_id: photo_id,
        user_id: userId21,
      },
      {
        content: "正",
        created_at: "2018-10-20 10:23:54+02",
        updated_at: "2018-11-20 10:23:54+02",
        photo_id: photo_id2,
        user_id: userId3,
      },
      {
        content: "靚到呢",
        created_at: "2018-10-20 10:23:54+02",
        updated_at: "2018-11-20 10:23:54+02",
        photo_id: photo_id20,
        user_id: userId5,
      },
      {
        content: "Love it",
        created_at: "2018-10-20 10:23:54+02",
        updated_at: "2018-11-20 10:23:54+02",
        photo_id: photo_id17,
        user_id: userId8,
      },
      {
        content: "居然!?",
        created_at: "2018-10-20 10:23:54+02",
        updated_at: "2018-11-20 10:23:54+02",
        photo_id: photo_id12,
        user_id: userId7,
      },
      {
        content: "嘩, 你跑過去? 咁快",
        created_at: "2018-10-21 10:23:54+02",
        updated_at: "2018-11-21 10:23:54+02",
        photo_id: photo_id12,
        user_id: userId8,
      },{
      content: "巧令令",
      created_at: "2020-01-01 10:23:54+02",
      updated_at: "2020-02-21 10:23:54+02",
      photo_id: photo_id5,
      user_id: userId20,
    },
      {
        content: "真好腳骨力",
        created_at: "2018-10-22 10:23:54+02",
        updated_at: "2018-11-22 10:23:54+02",
        photo_id: photo_id7,
        user_id: userId18,
      },
    ])
    .into("comments");

  return { likes, comments };
};
