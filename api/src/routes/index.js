const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { Dog, Temp } = require("../db");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const axios = require("axios");
const url =
  "https://api.thedogapi.com/v1/breeds?api_key={3abcd05c-2135-45d0-b3b9-2c2ca21335e9}";
const getApiInfo = async () => {
  console.log("trayendo info de la api");
  const apiUrl = await axios.get(url);
  console.log("url lista");
  const apiInfo = await apiUrl.data.map((elem) => {
    console.log("mapeando elementos");
    const height = elem.height.metric.split("-");
    const weight = elem.weight.metric.split("-");
    const heightMin = parseInt(height[0].trim());
    const heightMax = parseInt(height[1]);
    console.log("Alto max:", heightMax);
    console.log("Alto min:", heightMin);
    const weightMin = parseInt(weight[0].trim());
    const weightMax = parseInt(weight[1]);
    console.log("Peso max:", weightMax);
    console.log("Peso min:", weightMin);
    const default_Temp = elem.temperament
      ? `${elem.temperament}`
      : "Active, Agile, Confident, Fearless";
    return {
      id: `${elem.id}`,
      name: elem.name,
      heightMax: heightMax,
      weightMax: weightMax,
      heightMin: heightMin,
      weightMin: weightMin,
      temperament: default_Temp,
      lifeSpan: elem.life_span,
      img: elem.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll();
};

const getAllDogs = async () => {
  console.log("trayendo apiInfo");
  const apiInfo = await getApiInfo();
  console.log("getApiInfo ok, trayendo DB info.");
  const dbInfo = await getDbInfo();
  console.log("get db info listo. concatenando");
  const totalInfo = apiInfo.concat(dbInfo);
  totalInfo ? console.log("concatenado ok") : console.log("Concatenado NOT OK");
  return totalInfo;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let totalDogs = await getAllDogs();
  if (name) {
    console.log("hay name por query");
    let dogName = await totalDogs.filter((elem) =>
      elem.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName
      ? res.status(200).send(dogName)
      : res.status(404).send("no existe ese doggy");
  } else {
    console.log("NO hay name por query");
    res.status(200).send(totalDogs);
  }
});

router.get("/temperament", async (req, res) => {
  console.log("traemos los temperamentos desde la api");
  const temperamentsApi = await axios.get(url);
  console.log("listo, mapeamos los temperamentos");
  const temperaments = temperamentsApi.data.map((t) => t.temperament);
  console.log("temperamentos mapeados, arreglando strings");
  const temps = temperaments.toString().split(",");
  console.log("strings arreglados, llevando temperamentos a data base");
  temps.forEach((el) => {
    console.log("i:", el);
    let i = el.trim();
    console.log("trimeado:", i);
    Temp.findOrCreate({
      where: { name: i },
    });
  });
  console.log("temperamentos en db listo");
  const allTemp = await Temp.findAll();
  res.send(allTemp);
});

router.get("/dogs/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  console.log("Trayendo dogs para ID SEARCH");
  const allDogs = await getAllDogs();
  console.log("Listo, buscando el ID que haga match");
  const dog = allDogs.find((elem) => elem.id === idRaza);
  console.log("DOG:", dog);
  if (dog) {
    res.status(200).json(dog);
  } else {
    res.status(404).send("id sin match");
  }
});

router.post("/dog", async (req, res) => {
  let {
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    life_span,
    temperaments,
    image,
    createdInDB
  } = req.body;
  let dogCreated = await Dog.create({
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    life_span,
    temperaments,
    image,
    createdInDB : true,
  });
  let tempDB = await Temp.findAll({
    where: { name: temperaments},
  })
  dogCreated.addTemp(tempDB());
  res.send("Doggy creado con exito")
});
module.exports = router;
