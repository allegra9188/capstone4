const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany();

    res.json(companies);
  } catch (err) {
    next(err);
  }
});

// find company by using ticker, for example JPM for JP Morgan
router.get("/name/:name", async (req, res, next) => {
  try {
    const ticker = req.params.name;

    const company = await prisma.company.findFirst({
      where: { symbol: ticker },
    });
    res.json(company);
  } catch (err) {
    next(err);
  }
});

/** Display the corresponding company when the url matches /companies/:companyId */
router.get("/:companyId", async (req, res, next) => {
  try {
    const companyId = +req.params.companyId;

    if (isNaN(companyId)) {
      console.log("NAN running");
      res.status(404).send(`${req.params.companyId} page not found `);
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    res.json(company);
  } catch (err) {
    next(err);
  }
});
