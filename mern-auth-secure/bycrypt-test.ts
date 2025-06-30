import bcrypt from "bcryptjs";

const password = "1111";
const hash = "$2a$10$49iqUAhQN7zf.26OzB9Rwe6oIjM4h.bqxDcRFqBCEZ8ainljZugs.";

(async () => {
  console.log("🧪 DB Hash length:", hash.length);

  const result = await bcrypt.compare(password, hash);
  console.log("Expected: true | Got:", result);
})();
