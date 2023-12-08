const { ServerError } = require("../errors");
const prisma = require("../prisma");
const router = require("express").Router();

// Add politician to user's favorites
router.post(
  "/politicians/:userId/add-follow/:politicianId",
  async (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const politicianId = +req.params.politicianId;

      // Check if the user and politician exist
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const politician = await prisma.politician.findUnique({
        where: { id: politicianId },
      });

      if (!user || !politician) {
        return next({
          status: 404,
          message: "User or politician not found.",
        });
      }

      // Add the politician to the user's favorites
      const follow = await prisma.following.create({
        data: {
          userId: userId,
          politicianId: politicianId,
        },
      });

      res
        .status(201)
        .json({ message: "Politician added to follow list", follow });
    } catch (error) {
      console.error(error);
      next(new ServerError("Internal Server Error"));
    }
  }
);

// Remove politician from user's favorites
router.delete(
  "/politicians/:userId/remove-follow/:politicianId",
  async (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const politicianId = +req.params.politicianId;

      // Check if the user and politician exist
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const politician = await prisma.politician.findUnique({
        where: { id: politicianId },
      });

      if (!user || !politician) {
        return next({
          status: 404,
          message: "User or politician not found.",
        });
      }

      // Remove the politician from the user's favorites
      await prisma.following.deleteMany({
        where: {
          userId: userId,
          politicianId: politicianId,
        },
      });

      res.json({ message: "Politician removed from following list" });
    } catch (error) {
      console.error(error);
      next(new ServerError("Internal Server Error"));
    }
  }
);

// Get user's followed politicians
router.get("/:userId/following", async (req, res, next) => {
  try {
    const userId = +req.params.userId;

    const followings = await prisma.following.findMany({
      where: {
        userId: userId,
      },
      include: {
        politician: true,
      },
    });

    res.json(followings);
  } catch (error) {
    console.error(error);
    next(new ServerError("Internal Server Error"));
  }
});

module.exports = router;
