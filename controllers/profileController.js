import profileService from "../services/profileService.js";

// Login
export async function Login(req, res) {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const Profile = await profileService.getProfileByEmailAndPassword(
      email,
      password
    );

    if (!Profile) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    res.json(Profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update Profile field by id
export async function updateProfileField(req, res) {
  try {
    const { id } = req.params;
    const changes = req.body;

    if (!id || !changes) {
      return res.status(400).json({ error: "id and changes required" });
    }

    const updatedProfile = await profileService.updateProfileField(id, changes);

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { Login, updateProfileField };
