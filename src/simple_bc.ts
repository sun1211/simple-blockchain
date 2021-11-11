import * as crypto from 'crypto';

class Block {
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
        //Calculates the hash of this block on its creation
        this.hash = this.calculateHash();
    }

    private calculateHash(): string {
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
            .createHash('sha256')//Creates an instance of the Hash object for generating SHA-256 hashes
            .update(data)        //Computes and updates the hash value inside the Hash object
            .digest('hex');      //Converts the hash value into a hexadecimal string
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
        // Creates the genesis block and adds it to the chain
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

//Prints the content of the blockchain
console.log(JSON.stringify(blockchain, null, 2));