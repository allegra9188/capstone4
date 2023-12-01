const { ServerError } = require("../errors");
const prisma = require("../prisma");
const router = require("express").Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return next({
        status: 404,
        message: `Could not find user with id ${id}.`,
      });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const user = await prisma.user.findUnique({ where: { id } });

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return next({
        status: 404,
        message: `Could not find user with id ${id}.`,
      });
    }

    // add error handling for typeof errors

    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
