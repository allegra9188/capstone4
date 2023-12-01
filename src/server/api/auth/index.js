const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const jwt = require("./jwt");
const bcrypt = require("bcrypt");
const router = require("express").Router();
module.exports = router;

/** Creates new account and returns token */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;

    // Check if username and password provided
    if (!username || !password || !firstName || !lastName || !email) {
      throw new ServerError(400, "All fields (username, password, firstName, lastName, email) are required.");
    }

    // Check if account already exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user) {
      throw new ServerError(
        400,
        `Account with username ${username} already exists.`
      );
    }
  
    // Create new user
    const newUser = await prisma.user.create({
      data: { username, password, firstName, lastName, email },
    });

    const token = jwt.sign({ id: newUser.id });
    res.json({ token, user: newUser });
  } catch (err) {
    next(err);
  }
});

/** Returns token for account if credentials valid */
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if username and password provided
    if (!username || !password) {
      throw new ServerError(400, "Username and password required.");
    }

    // Check if account exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new ServerError(
        400,
        `Account with username ${username} does not exist.`
      );
    }

    // Check if password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new ServerError(401, "Invalid password.");
    }

    const token = jwt.sign({ id: user.id });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
try {

  const id = +req.params.id;

  if (!id) {
    throw new ServerError(400, "Id required.");
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new ServerError(
      400,
      `Account with id ${id} does not exist.`
    );
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  
  res.json({ message: 'User deleted successfully', user: deletedUser });
} catch (err) {
  next(err);
}
});