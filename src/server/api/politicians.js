const { ServerError } = require("../errors");
const prisma = require("../prisma");
const router = require("express").Router();

module.exports = router;

// gets all politicians.
router.get("/", async (req, res, next) => {
  try {
    const politicians = await prisma.Politician.findMany();
    res.json(politicians);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const politician = await prisma.Politician.findUnique({ where: { id } });
    res.json(politician);
  } catch (err) {
    next(err);
  }
});
