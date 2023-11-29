const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

/** User must be logged in to access tasks. */
// router.use((req, res, next) => {
//   if (!res.locals.user) {
//     return next(new ServerError(401, "You must be logged in."));
//   }
//   next();
// });

/** get all students */
router.get("/", async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany();
    
    res.json(companies)
  } catch (err) {
    next(err);
  }
});


/** Display the corresponding company when the url matches /companies/:companyId */
router.get("/:companyId", async (req, res, next) => {
    try {
        
      const companyId = +req.params.companyId;
      
      if(isNaN(companyId)){
        console.log('NAN running')
        res.status(404).send(`${req.params.companyId} page not found `);
      }
  
      const company = await prisma.company.findUnique({ where: { id:companyId } });
  
      res.json(company);
    } catch (err) {
      next(err);
    }
  });