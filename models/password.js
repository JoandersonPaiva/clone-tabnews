import bcrypt from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  return await bcrypt.hash(password, rounds);
}

function getNumberOfRounds() {
  const productionRounds = 14;
  const developmentRounds = 1;
  return process.env.NODE_ENV === "production"
    ? productionRounds
    : developmentRounds;
}

async function compare(providedPassword, storededPassword) {
  return await bcrypt.compare(providedPassword, storededPassword);
}

const password = {
  hash,
  compare,
};

export default password;
