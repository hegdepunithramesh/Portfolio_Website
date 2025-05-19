import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/index", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
}
);  
app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});
app.get("/contact", (req, res) => {
  const status = req.query.status || null;
  res.render("contact.ejs", { status });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hegdepunithramesh@gmail.com",
      pass: "tvjfeuqxjxenjjhu",
    },
  });

  const mailOptions = {
    from: email,
    to: "hegdepunithramesh@gmail.com",
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Redirect back to /contact with success status
    res.redirect("/contact?status=success");
  } catch (error) {
    console.error("Email failed:", error);
    // Redirect back to /contact with fail status
    res.redirect("/contact?status=fail");
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
