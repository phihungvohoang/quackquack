const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzNzYwNCwidGltZXN0YW1wIjoxNzE2Nzg1NTQ1MjAwLCJ0eXBlIjoxLCJpYXQiOjE3MTY3ODU1NDUsImV4cCI6MTcxNzM5MDM0NX0.DestKT8wOLNZknk6WecMsRZ-ccpY0ke4ZyAj2KitsgY";
function getDefaultHeaders() {
  return {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    authorization: `Bearer ${ACCESS_TOKEN}`,
    priority: "u=1, i",
    "sec-ch-ua":
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    Referer: "https://dd42189ft3pck.cloudfront.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
}
let listColect = [];
let listDuck = [];
let max_list = 17;
let listEgg = [];
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function getTotalEgg() {
  fetch("https://api.quackquack.games/balance/get", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "if-none-match": 'W/"1a9-I7Onn3jBU9AHo0MlzSY8mMECNvQ"',
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      res.data.data.map((item) => {
        if (item.symbol === "EGG") {
          console.log("");
          console.log("Tổng trứng 🥚:", Number(item.balance));
          console.log("");
        }
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

function maxList() {
  fetch("https://api.quackquack.games/nest/max-duck", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "if-none-match": 'W/"1a9-I7Onn3jBU9AHo0MlzSY8mMECNvQ"',
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      max_list = res.data.max_duck;
      console.log("Số lượng vịt tối đa", res.data.max_duck);
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

const getListReload = async () => {
  const options = {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: `Bearer ${ACCESS_TOKEN}`,
      "if-none-match": 'W/"1218-LZvWPzXbQkzjfWJ5mauEo0z3f9c"',
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    method: "GET",
  };

  try {
    const response = await fetchData(
      "https://api.quackquack.games/nest/list-reload",
      options
    );
    listDuck = response.data.duck;
    listColect = response.data.nest;
    listEgg = response.data.nest.filter((item) => item.type_egg > 1);
    console.log(`so luong vit  hien tai:${listDuck.length}/${max_list}`);
  } catch (error) {}
};

function getEggByType(type) {
  return listEgg.filter((egg) => egg.type_egg === type);
}

function collect() {
  if (listColect.length === 0) return setTimeout(collect, 3e3);

  // Change egg type here
  const eggTypeToHatch = 5;
  const eggsOfType = getEggByType(eggTypeToHatch);

  if (listDuck.length < max_list && eggsOfType.length > 0) {
    console.table(eggsOfType);
    hatch(eggsOfType[0].id);
  } else {
    console.log("Số trứng có thể nhận:", listColect.length);
    console.table(listColect);
    const egg = listColect[0].id;

    fetch("https://api.quackquack.games/nest/collect", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,vi;q=0.8",
        authorization: "Bearer " + ACCESS_TOKEN,
        "content-type": "application/x-www-form-urlencoded",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://dd42189ft3pck.cloudfront.net/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "nest_id=" + egg,
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Đang nhặt trứng...");
        layEgg(egg);
      })
      .catch((error) => {
        setTimeout(() => {
          collect(egg);
        }, 3e3);
      });
  }
}

function layEgg(egg) {
  const duck = listDuck.random();
  fetch("https://api.quackquack.games/nest/lay-egg", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "nest_id=" + egg + "&duck_id=" + duck.id,
    method: "POST",
  })
    .then((response) => response.json())
    .then((res) => {
      getTotalEgg();
      listColect.shift();
      if (listEgg.length < 0) {
        console.log("Đang đẻ trứng...");
        setTimeout(getListReload(), 3e3);
      }
      setTimeout(collect, 3e3);
    })
    .catch((error) => {
      setTimeout(() => {
        layEgg(egg);
      }, 3e3);
    });
}

function hatch(egg) {
  fetch("https://api.quackquack.games/nest/hatch", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "nest_id=" + egg,
    method: "POST",
  })
    .then((response) => response.json())
    .then((res) => {
      console.log("Đang ấp trứng:", egg);
      listEgg.shift();
      setTimeout(() => {
        collect_duck(egg);
      }, 3e3);
    })
    .catch((error) => {
      setTimeout(() => {
        collect();
      }, 3e3);
    });
}

function collect_duck(egg) {
  fetch("https://api.quackquack.games/nest/collect-duck", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "nest_id=" + egg,
    method: "POST",
  })
    .then((response) => response.json())
    .then((res) => {
      console.log("Thu thập vịt thành công");
      console.table(res.data);
      let index = listColect.findIndex((item) => item.id === egg);
      listColect.splice(index, 1);
      if (listColect.length !== 0) {
        collect();
      } else {
        getListReload();
      }
    })
    .catch((error) => {
      setTimeout(() => {
        collect();
      }, 5e3);
    });
}

async function getGoldDuckInfo() {
  if (!isLiveGame) return console.log(`Game sập cmnr`);

  const data = await fetchData(
    "https://api.quackquack.games/golden-duck/info",
    {
      headers: getDefaultHeaders(),
      method: "GET",
    }
  );

  if (!data) return;

  if (data.data.time_to_golden_duck === 0) {
    console.log(`\n\x1b[1;33mVỊT VÀNG : Xin chào\x1b[0m`);
    getGoldDuckReward();
  } else {
    const nextGoldDuck = data.data.time_to_golden_duck;
    console.log(
      `\n\x1b[1;33mVỊT VÀNG :\x1b[1;36m ${Math.ceil(
        nextGoldDuck / 60
      )} phút nữa gặp\x1b[0m`
    );
    setTimeout(getGoldDuckInfo, nextGoldDuck * 1e3);
  }
}

async function getGoldDuckReward() {
  if (!isLiveGame) return console.log(`Game sập cmnr`);

  const data = await fetchData(
    "https://api.quackquack.games/golden-duck/reward",
    {
      headers: getDefaultHeaders(),
      method: "GET",
    }
  );

  if (!data) return;

  if (data.data.type === 0) {
    console.log(
      `\n\x1b[1;33mVỊT VÀNG : \x1b[1;36mChúc bạn may mắn lần sau\x1b[0m`
    );
    getGoldDuckInfo();
  } else if (data.data.type === 2 || data.data.type === 3) {
    claimGoldDuck(data.data);
  }
}

async function claimGoldDuck(gDuck) {
  if (!isLiveGame) return console.log(`Game sập cmnr`);

  const data = await fetchData(
    "https://api.quackquack.games/golden-duck/claim",
    {
      headers: {
        ...getDefaultHeaders(),
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "type=1",
      method: "POST",
    }
  );

  if (!data) return;

  const info = infoGoldDuck(gDuck);
  console.log(
    `\n\x1b[1;33mVỊT VÀNG :\x1b[1;34m ${info.amount} ${info.label}\x1b[0m`
  );
  getGoldDuckInfo();
}
function infoGoldDuck(data) {
  const types = {
    1: "TON",
    2: "PEPET",
    3: "EGG",
    4: "TRU",
  };
  return { label: types[data.type], amount: data.amount };
}
async function checkLiveGame() {
  isLiveGame = true;
  return isLiveGame;
}

setInterval(() => {
  getListReload();
}, 10e3);

collect();
checkLiveGame()
  .then(getGoldDuckInfo)
  .then(() => {
    getTotalEgg();
    getListReload();
    maxList();
  });
