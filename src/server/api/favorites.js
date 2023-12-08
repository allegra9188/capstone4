const { ServerError } = require("../errors");
const prisma = require("../prisma");
const router = require("express").Router();

// Add company to user's favorites
router.post(
  "/companies/:userId/add-favorite/:companyId",
  async (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const companyId = +req.params.companyId;

      // Check if the user and company exist
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const company = await prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!user || !company) {
        return next({
          status: 404,
          message: "User or company not found.",
        });
      }

      // Add the company to the user's favorites
      const favorite = await prisma.favorite.create({
        data: {
          userId: userId,
          companyId: companyId,
        },
      });

      res.status(201).json({ message: "Company added to favorites", favorite });
    } catch (error) {
      console.error(error);
      next(new ServerError("Internal Server Error"));
    }
  }
);

// Remove company from user's favorites
router.delete(
  "/companies/:userId/remove-favorite/:companyId",
  async (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const companyId = +req.params.companyId;

      // Check if the user and company exist
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const company = await prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!user || !company) {
        return next({
          status: 404,
          message: "User or company not found.",
        });
      }

      // Remove the company from the user's favorites
      await prisma.favorite.deleteMany({
        where: {
          userId: userId,
          companyId: companyId,
        },
      });

      res.json({ message: "Company removed from favorites" });
    } catch (error) {
      console.error(error);
      next(new ServerError("Internal Server Error"));
    }
  }
);

// Get user's favorite companies
router.get("/:userId/favorites", async (req, res, next) => {
  try {
    const userId = +req.params.userId;

    // Get user's favorite companies
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      include: {
        company: true,
      },
    });

    res.json(favorites);
  } catch (error) {
    console.error(error);
    next(new ServerError("Internal Server Error"));
  }
});

module.exports = router;
