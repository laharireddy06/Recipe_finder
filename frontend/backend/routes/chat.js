import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  res.json({
    reply: `You can try Chicken Biryani, Fried Rice or Chicken Pulao 🍗🍚`
  });
});

export default router;
