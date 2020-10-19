const web3 = require('web3');
const MyToken = artifacts.require('Token');
const StakingToken = artifacts.require('StakingToken');

const token = value => web3.utils.toWei(String(value), 'ether');

contract('Staking TOken', async accounts => {
    let user1;
    let user2;
    let user3;
    let use4;

    before(async () => {
        user1 = accounts[0];
        user2 = accounts[1];
        user3 = accounts[2];
        user4 = accounts[3];

        const amountToMint = 20; // mints 10 ether

        this.token = await MyToken.deployed({ from: user1 });
        // min 10 ethers for user1 and user2
        await this.token.mint(user1, token(amountToMint), { from: user1 });
        await this.token.mint(user2, token(amountToMint), { from: user1 });

        this.contract = await StakingToken.deployed(this.token.address, user1, { from: user1 });

        // approve tokens for stake
        await this.token.approve(this.contract.address, token(15), { from: user1 });
        await this.token.approve(this.contract.address, token(5), { from: user2 });

    });

    it('should not stake if stake is less than minimum amount', async () => {
        try {
            // should throw an exception
            await this.contract.stake(token(.5), user1, { from: user1 })
        } catch (error) {
            assert(error.message.includes("Amount is below minimum stake value."));
            return
        }
        assert(false);
    })

    it('should add new user to stakeholders ', async () => {
        // Stake token after approving
        await this.contract.newStake(token(5), user1, { from: user2 });
        const stakeHolder = await this.contract.stakeholders(user2);
        const { staker, id } = stakeHolder;
        assert.equal(staker, true);
        assert.equal(id, 0);
    })

    it('should stake tokesn for existing user', async () => {
        try {
            await this.token.approve(this.contract.address, token(5), { from: user2 });
            
            await this.contract.stake(token(5), user1, { from: user2 });
            const stakeHolder = await this.contract.stakeholders(user2);
            const { staker, id } = stakeHolder;
            assert.equal(staker, true);
            assert.equal(id, 0);
        } catch (error) {
            console.log(error.message)
            assert(false);
        }
    })
})