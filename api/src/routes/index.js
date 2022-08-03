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
  const apiUrl = await axios.get(url);
  const apiInfo = await apiUrl.data.map((elem) => {
    const height = elem.height.metric.split("-");
    const weight = elem.weight.metric.split("-");
    const heightMin = parseInt(height[0].trim());
    const heightMax = parseInt(height[1]);
    const weightMin = parseInt(weight[0].trim());
    const weightMax = parseInt(weight[1]);
    const default_Temp = elem.temperament
      ? `${elem.temperament}`
      : "Active, Agile, Confident, Fearless";
    return {
      id: `${elem.id}`,
      name: elem.name,
      heightMax: heightMax,
      weightMax: weightMax ? weightMax : 1.627,
      heightMin: heightMin,
      weightMin: weightMin ? weightMin : 0.627,
      temperament: default_Temp,
      life_span: elem.life_span,
      image: elem.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temp,
      attributes: ["name"] ,
      throught: { dogTemp: [] }
    },
  });
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let totalDogs = await getAllDogs();
  if (name) {
    let dogName = await totalDogs.filter((elem) =>
      elem.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName
      ? res.status(200).send(dogName)
      : res.status(404).send("no existe ese doggy");
  } else {
    res.status(200).send(totalDogs);
  }
});

router.get("/temperament", async (req, res) => {
  const temperamentsApi = await axios.get(url);
  const temperaments = temperamentsApi.data.map((t) => t.temperament);
  const temps = temperaments.toString().split(",");
  temps.forEach((el) => {
    let i = el.trim();
    Temp.findOrCreate({
      where: { name: i },
    });
  });
  const allTemp = await Temp.findAll();
  res.send(allTemp);
});

router.get("/dogs/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  const dog = allDogs.find((elem) => elem.id === idRaza);
  if (dog) {
    res.status(200).json(dog);
  } else {
    res.status(404).send("id sin match");
  }
});
router.post("/dogs", async (req, res) => {
  const {
    name,
    heightMax,
    heightMin,
    weightMax,
    weightMin,
    temperament,
    life_span,
    createdInDB,
    image,
  } = req.body;
  try {
    let NewDog = await Dog.create({
      name,
      heightMax,
      heightMin,
      weightMax,
      weightMin,
      life_span,
      createdInDB,
      image:
        image ||
        `https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg`,
    });

    let temperamentNewDog = await Temp.findAll({
      where: { name: temperament },
    });
    NewDog.addTemp(temperamentNewDog);
    res.send("Tu nueva raza se agrego con exito");
  } catch (error) {
    console.log("Error al agregar raza:", error);
  }
});
module.exports = router;
