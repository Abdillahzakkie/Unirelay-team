const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Token = artifacts.require('Token');
const StakingToken = artifacts.require("StakingToken");

module.exports = async (deployer, _, accounts) => {
  const [admin] = accounts;
  const myToken = await deployProxy(Token, ["Token", "MYT"], { deployer });
  console.log(`Deployed contract: ${myToken.address}`);


  const stakingContract = await deployProxy(StakingToken, [myToken.address, admin], { deployer, unsafeAllowCustomTypes: true });
  console.log(`Deployed contract: ${stakingContract.address}`);
}