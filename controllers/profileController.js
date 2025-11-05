import profileService from "../services/profileService.js";

// login
export async function login(req, res) {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const profile = await profileService.getProfileByEmailAndPassword(
      email,
      password
    );

    if (!profile) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { login };
