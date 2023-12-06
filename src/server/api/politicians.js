const { ServerError } = require("../errors");
const prisma = require("../prisma");
const router = require("express").Router();

module.exports = router;

// gets all politicians.
router.get("/", async (req, res, next) => {
  try {
    const politicians = await prisma.politician.findMany();

    res.json(politicians);
  } catch (err) {
    next(err);
  }
});
router.get("/name/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const fullName= name.split(' ')
    const firstName = fullName[0]
    const lastName = fullName.slice(-1).join(' ')

    const politician = await prisma.politician.findFirst({
      where: {first_name: firstName,last_name: lastName }
    })
    res.json(politician);
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const politician = await prisma.politician.findUnique({ where: { id } });
    
    res.json(politician);
  } catch (err) {
    next(err);
  }
});
