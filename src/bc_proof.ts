import * as crypto from 'crypto';

class Block {
    //The new nonce property
    readonly nonce: number;
    //The hash of this block
    readonly hash: string;

    constructor(
        //The sequential number of this block
        readonly index: number,
        //The hash of the previous block
        readonly previousHash: string,
        //The time of the block’s creation
        readonly timestamp: number,
        //The app-specific data
        readonly data: string
    ) {
        //Calculates nonce and hash
        const { nonce, hash } = this.mine();
        console.log(`With nonce = ${nonce} hash = ${hash}`)
        this.nonce = nonce;
        this.hash = hash;
    }

    private calculateHash(nonce: number): string {
        //Nonce is part of the input for calculating the hash
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce;
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    private mine(): { nonce: number, hash: string } {
        let hash: string;
        let nonce = 0;

        do {
            hash = this.calculateHash(++nonce);
        } while (hash.startsWith('00000') === false);

        return { nonce, hash };
    }
};

class Blockchain {
    //Our blockchain is stored here
    private readonly chain: Block[] = [];

    //The getter to get a reference to the most recently added block
    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    constructor() {
        // Create the genesis block.
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }

    addBlock(data: string): void {
        //Creates a new instance of Block and populates its properties
        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        );

        //Adds the block to the array
        this.chain.push(block);
    }
}

console.log('Creating the blockchain with the genesis block...');
const blockchain = new Blockchain();

console.log('Mining block #1...');
blockchain.addBlock('First block');

console.log('Mining block #2...');
blockchain.addBlock('Second block');

console.log(JSON.stringify(blockchain, null, 2));