import fs from "fs/promises";

//get profile by email and password
export async function getProfileByEmailAndPassword(email, password) {
  try {
    if (!email || !password) return null;

    const data = await fs.readFile("data/profiles.json", "utf8");
    const profiles = JSON.parse(data);

    return profiles.find((p) => p.email === email && p.password === password);
  } catch (error) {
    throw error;
  }
}

export default { getProfileByEmailAndPassword };
