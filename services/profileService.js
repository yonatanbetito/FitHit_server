import fs from "fs/promises";

//get Profile by email and password
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

//update Profile field by id
export async function updateProfileField(id, changes) {
  try {
    if (!id || !changes) return null;

    const data = await fs.readFile("data/profiles.json", "utf8");
    const profiles = JSON.parse(data);

    const profileIndex = profiles.findIndex((p) => p.id === Number(id));
    if (profileIndex === -1) return null;

    const updatedProfile = { ...profiles[profileIndex], ...changes };
    profiles[profileIndex] = updatedProfile;

    await fs.writeFile("data/profiles.json", JSON.stringify(profiles, null, 2));

    return updatedProfile;
  } catch (error) {
    throw error;
  }
}

export default { getProfileByEmailAndPassword, updateProfileField };
