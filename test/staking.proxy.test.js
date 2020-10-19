// const { deployProxy } = require('@openzeppelin/truffle-upgrades');
 
// // Load compiled artifacts
// const MyContract = artifacts.require('MyContract');
 
// // Start test block
// contract('MyContract (proxy)', accounts => {
//   beforeEach(async () => { 
//     this.admin = accounts[0];

//     this.contract = await deployProxy(
//       MyContract, 
//       [this.admin], 
//       { 
//         initializer: 'initialize',
//         unsafeAllowCustomTypes: true 
//       }
//     )
//   }

//   );

//   it('should set upgrade proxy correctly', () => assert(this.contract.address !== ''));

//   it('should  retrieve the address of the admin', async () => {
//     const admin = await this.contract.admin();
//     assert.equal(admin, this.admin)
//   })
// });