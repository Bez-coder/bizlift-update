const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ GET /sell/all - Fetch all listed products
router.get("/all", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { seller: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ POST /sell - Create a new product listing
router.post("/", upload.single("photo"), async (req, res) => {
   console.log("📩 /sell route hit");
  console.log("Headers:", req.headers.authorization);
  console.log("Body:", req.body);
  console.log("File:", req.file);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Destructure form data
    const { title, description, type, price, contactPhone, socialMedia } = req.body;

    // Validate required fields
    if (!title || !description || !type || !price || !contactPhone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare image URL
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : "";

    // Create product in database
    const product = await prisma.product.create({
      data: {
        title,
        description,
        type,
        price: parseFloat(price),
        photoUrl,
        contactPhone,
        socialMedia,
        sellerId: decoded.id, // link product to logged-in user
      },
    });

    res.json({ message: "Product listed successfully!", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
