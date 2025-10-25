app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.json({ message: "User created successfully", userId: user.id });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
