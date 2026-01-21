import hre from "hardhat";

const { ethers } = hre;

async function main() {
    const Token = await ethers.getContractFactory("SimpleToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    console.log("Contract deployed to:", await token.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});