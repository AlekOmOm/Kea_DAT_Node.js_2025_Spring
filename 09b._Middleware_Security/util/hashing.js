import bcrypt from 'bcryptjs';
// ref: https://www.npmjs.com/package/bcrypt



const saltRounds = 2;
const password = 'myPassword';

// /signup
const passwordHash = await bcrypt.hash(password, saltRounds);
const hashedPassword = '$2b$04$ivtn./93EYazVqEuVOELKOmXQuSZ8IXgrmmT.o66rvejw.RtSQ0G2';
    // save passwordHash to database

console.log(passwordHash);

// /login
const isSame = await bcrypt.compare(password, hashedPassword);
const isSame2 = await bcrypt.compare(password, passwordHash);
    // compare password with hashed password from database

console.log(isSame); // true
console.log(isSame2); // true

// Hashing a password

// hashPassword function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
