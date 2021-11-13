import * as crypto from 'crypto';

function sha256(data: string): Promise<string> {
    return Promise.resolve(crypto.createHash('sha256').update(data).digest('hex'));
}

//A custom type representing a single transaction
export interface Transaction {
    readonly sender: string;
    readonly recipient: string;
    readonly amount: number;
}

//A custom type representing a single block
export class Block {
    //The new nonce property
    nonce: number = 0;
    //The hash of this block
    hash: string;

    constructor(
        //previous hash
        readonly previousHash: string,
        //time of transaction
        readonly timestamp: number,
        //Passes an array of transactions to the newly-created block
        readonly transactions: Transaction[]
    ) { }

    //The asynchronous function to mine the block
    async mine(): Promise<void> {
        do {
            this.hash = await this.calculateHash(++this.nonce);
        } while (this.hash.startsWith('0000') === false);
    }

    //The asynchronous wrapper function for hash generation
    private async calculateHash(nonce: number): Promise<string> {
        const data = this.previousHash + this.timestamp + JSON.stringify(this.transactions) + nonce;
        //Invokes the function that uses the crypto API and generates the hash
        return sha256(data);
    }
}

export class Blockchain {
    private readonly _chain: Block[] = [];
    private _pendingTransactions: Transaction[] = [];

    //The getter for the latest block in the blockchain
    private get latestBlock(): Block {
        return this._chain[this._chain.length - 1];
    }

    //The getter for all blocks in the blockchain
    get chain(): Block[] {
        return [...this._chain];
    }

    //The getter for all pending transactions
    get pendingTransactions(): Transaction[] {
        return [...this._pendingTransactions];
    }

    //Creates the genesis block
    async createGenesisBlock(): Promise<void> {
        const genesisBlock = new Block('0', Date.now(), []);
        //Creates the hash for the genesis block
        await genesisBlock.mine();
        //Adds the genesis block to the chain
        this._chain.push(genesisBlock);
    }

    //Adds a pending transaction
    createTransaction(transaction: Transaction): void {
        this._pendingTransactions.push(transaction);
    }

    //Creates a block with pending transactions and adds it to the blockchain
    async minePendingTransactions(): Promise<void> {
        const block = new Block(this.latestBlock.hash, Date.now(), this._pendingTransactions);
        //Creates the hash for the new block
        await block.mine();
        //Adds the new block to the blockchain
        this._chain.push(block);
        this._pendingTransactions = [];
    }
}

async function main(): Promise<void>{
    console.log('Initializing the blockchain, creating the genesis block...');
    
    const bc = new Blockchain();
    await bc.createGenesisBlock();
    
    bc.createTransaction({ sender: 'John', recipient: 'Kate', amount: 50 });
    bc.createTransaction({ sender: 'Kate', recipient: 'Mike', amount: 10 });
    
    await bc.minePendingTransactions();
    
    bc.createTransaction({ sender: 'Alex', recipient: 'Rosa', amount: 15 });
    bc.createTransaction({ sender: 'Gina', recipient: 'Rick', amount: 60 });
    
    await bc.minePendingTransactions();
    
    console.log(JSON.stringify(bc, null, 2));
}

main();
