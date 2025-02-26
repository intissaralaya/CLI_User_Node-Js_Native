const fs = require("fs");
const readline = require("readline");
const os = require("os");
const crypto = require("crypto-js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const encryptPassword = (password, key) => {
    return crypto.AES.encrypt(password, key).toString();
};

const saveToFile = (username, encryptedPassword) => {
    const systemInfo = `Username: ${username}\n` +
        `Encrypted Password: ${encryptedPassword}\n` +
        `OS: ${os.platform()}\n` +
        `Architecture: ${os.arch()}\n` +
        `CPU: ${os.cpus()[0].model}\n` +
        `Total RAM: ${os.totalmem()} bytes\n` +
        `Free RAM: ${os.freemem()} bytes\n`;

    fs.writeFileSync("user_info.txt", systemInfo, { encoding: "utf-8" });
    console.log("User information saved successfully.");
};

rl.question("Enter username: ", (username) => {
    rl.question("Enter password: ", (password) => {
        const encryptedPassword = encryptPassword(password, "secret_key");
        saveToFile(username, encryptedPassword);
        rl.close();
    });
});
