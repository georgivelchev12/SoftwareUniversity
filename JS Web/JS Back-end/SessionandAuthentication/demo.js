const bcrypt = require("bcrypt");

const saltRounds = 10;
const myPlaintextPassword = "pass1";
const someOtherPlaintextPassword = "pass2";

async function gen() {
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
}
async function comp(hash) {
    // Load hash from your password DB.
    const check1 = await bcrypt.compare(myPlaintextPassword, hash);
    const check2 = await bcrypt.compare(someOtherPlaintextPassword, hash);
    console.log('pass1 check => ', check1);
    console.log('pass2 check => ', check2);
}

gen();

comp("$2b$10$oXlU6BGOfMYijgdgEST5Ze938mEalpnJAthEljWes7F97Pp.JYWD2");
