import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { supabase } from "./config/supabase";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("product_id", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("accountType", "user");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/api/sellers", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("accountType", "seller");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: "Failed to fetch sellers" });
  }
});

app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const { name, price, seller, city, image, type } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert([{ name, price, seller, city, image, type }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.delete("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("product_id", id);

    if (error) throw error;
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
