require("dotenv").config();
const fs = require('fs');

const dir = "./views"

if (fs.existsSync(dir)) {
  console.log('Directory exists!')
} else {
  console.log('Directory not found.')
}