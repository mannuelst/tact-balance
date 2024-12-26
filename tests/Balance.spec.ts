import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Balance } from '../wrappers/Balance';
import '@ton/test-utils';

describe('Balance', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let balance: SandboxContract<Balance>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        balance = blockchain.openContract(await Balance.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await balance.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: balance.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and balance are ready to use
    });
});
