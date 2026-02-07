import express from "express";
import sgMail from "@sendgrid/mail";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// SendGrid API Key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.warn("⚠️  WARNING: SENDGRID_API_KEY not found in environment variables!");
  console.warn("Please add SENDGRID_API_KEY to your .env file");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}
 
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
app.get("/experience", (req, res) => {
  res.render("experience.ejs");
});
app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});
app.get("/achievements", (req, res) => {
  res.render("achievements.ejs");
});
app.get("/contact", (req, res) => {
  const status = req.query.status || null;
  res.render("contact.ejs", { status });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "hegdepunithramesh@gmail.com", // Your email
    from: email, // Visitor's email (requires verification in SendGrid)
    subject: `Contact Form Submission from ${name}`,
    text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #3586ff; border-bottom: 3px solid #667eea; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #333;">From:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <a href="mailto:${email}" style="color: #3586ff;">${email}</a></p>
          </div>
          <div style="margin: 20px 0; padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 8px;">
            <p style="margin: 0;"><strong style="color: #333;">Message:</strong></p>
            <p style="margin: 10px 0; line-height: 1.6; color: #555;">${message}</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
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
