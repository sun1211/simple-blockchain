# What a block is made of
block as a record in a ledger, contains app-specific data, and it also has a timestamp, its own hash value, and the hash value of the previous block
To add a new block to the chain:
1. Find the hash of the most recently inserted block, and store it as a reference to the previous block.
2. Generate a hash value for the newly created block.
3. Submit the new block to the blockchain for validation.

At some point the blockchain was created, and the very first block was inserted into this chain. The very first block in a chain is called a genesis block. Obviously there are no blocks before this first one, so the previous block’s hash doesn’t exist.

```
{
  "chain": [
    {
      "index": 0,
      "previousHash": "0",
      "timestamp": 1636773425817,
      "data": "Genesis block",
      "hash": "b2b936c723156f02aafcb74466c937c39ae7808f23c0e87b1ac4c0680a09d138"
    },
    {
      "index": 1,
      "previousHash": "b2b936c723156f02aafcb74466c937c39ae7808f23c0e87b1ac4c0680a09d138",
      "timestamp": 1636773425818,
      "data": "First block",
      "hash": "247c4483b4e7ca8450893bd42f8ac380d7248ddeb83a33d884d4e32bf5d10114"
    },
    {
      "index": 2,
      "previousHash": "247c4483b4e7ca8450893bd42f8ac380d7248ddeb83a33d884d4e32bf5d10114",
      "timestamp": 1636773425819,
      "data": "Second block",
      "hash": "19454780f5698dde4671c1aa0f7d8ace17fb48328751ba9f62f7de3c76b2d733"
    }
  ]
}
```

Now let’s imagine that there is a bad guy named Rampage, and he found out that the hash of some block in our blockchain is “e68d27a...” Can he modify its data, stating that he paid Mary $1,000, and then regenerate the other blocks so the hash values play well? To prevent this from happening, a blockchain requires algorithms to be solved, taking time and resources. That’s why blockchain members are required to spend time and resources to mine a block, rather than quickly generating a hash value.

```
{
  "chain": [
    {
      "index": 0,
      "previousHash": "0",
      "timestamp": 1636773464657,
      "data": "Genesis block",
      "nonce": 2182556,
      "hash": "00000fe8b6be70dc31cf91341c15c272414f7ecd13c214102a52f31c5e091593"
    },
    {
      "index": 1,
      "previousHash": "00000fe8b6be70dc31cf91341c15c272414f7ecd13c214102a52f31c5e091593",
      "timestamp": 1636773468415,
      "data": "First block",
      "nonce": 89006,
      "hash": "00000e085391596c23fb15401b85db77001486d8d128729a2274f5c08807110a"
    },
    {
      "index": 2,
      "previousHash": "00000e085391596c23fb15401b85db77001486d8d128729a2274f5c08807110a",
      "timestamp": 1636773468595,
      "data": "Second block",
      "nonce": 714503,
      "hash": "00000a806fece9cc8cb5023520b747e25fb3fee9bacc9b03e4c01c8b7e79af02"
    }
  ]
}
```

Adding a new block to the blockchain intentionally takes time to prevent double-spending attacks.

For example, Bitcoin keeps this time at around 10 minutes by controlling the complexity of the algorithm that needs to be solved by the blockchain nodes. Creating a new block for each transaction would make the blockchain extremely slow, which is why a block can contain multiple transactions.
```
{
  "_chain": [
    {
      "previousHash": "0",
      "timestamp": 1636774179285,
      "transactions": [],
      "nonce": 280,
      "hash": "0000668b4458e7dc9e8655cbbcbb42d102e601f2a6c248bc498d452514275bb7"
    },
    {
      "previousHash": "0000668b4458e7dc9e8655cbbcbb42d102e601f2a6c248bc498d452514275bb7",
      "timestamp": 1636774179287,
      "transactions": [
        {
          "sender": "John",
          "recipient": "Kate",
          "amount": 50
        },
        {
          "sender": "Kate",
          "recipient": "Mike",
          "amount": 10
        }
      ],
      "nonce": 20517,
      "hash": "0000951f9171d456df58d7598aea5d0df85e23416b1c0ebf43c3dec3f7a35bcb"
    },
    {
      "previousHash": "0000951f9171d456df58d7598aea5d0df85e23416b1c0ebf43c3dec3f7a35bcb",
      "timestamp": 1636774179371,
      "transactions": [
        {
          "sender": "Alex",
          "recipient": "Rosa",
          "amount": 15
        },
        {
          "sender": "Gina",
          "recipient": "Rick",
          "amount": 60
        }
      ],
      "nonce": 47126,
      "hash": "0000bc4efe20010addc8b9d79ddf700f0c2517eff8fc5e647ce102b20e139e54"
    }
  ],
  "_pendingTransactions": []
}

```

**Double-spending attacks**
Let’s say you have only two $1 bills in your pocket, and you want to buy a cup of coffee that cost $2. You hand two $1 bills to the barista, he gives you the coffee, and you have no money in your pocket, which means that you can’t buy anything else, unless you steal or counterfeit more. Counterfeiting money takes time and can’t be done on the spot in the coffee shop.

The digital currency could be subject to counterfeiting. For example, a dishonest person might try to pay a given amount of money to multiple recipients. Suppose Joe has only one Bitcoin and he pays it to Mary (creating a block with the transaction “Joe Mary 1”), and then he immediately pays one Bitcoin to Alex (creating another block with the transaction “Joe Alex 1”). This is an example of a double-spending attack.

Bitcoin and other blockchains implement mechanisms for preventing such an attack, and they have a consensus process for validating each block and resolving conflicts. Wwe’ll explain **the longest chain rule**, which can be used to prevent the insertion of invalid blocks.

# Resolving conflicts using the longest chain rule
Let’s pick three arbitrary miners, M1, M2, and M3, and assume they’ve found the proper hash (the proof of work) and broadcast their versions of the new block, number 101, as a candidate for adding to the blockchain.

How can we decide which of these three should be added to the blockchain? We’ll use the longest chain rule. 

A multinode chain may have multiple blocks that are candidates for being added to the network, but the blockchain is like a living, growing organism that keeps adding nodes all the time. By the time all of the miners have finished mining, one of their chains will have been used by some miner to add more blocks, and that will have become the longest chain.

Blockchains implement a mechanism to ensure that if a transaction is included in a valid block by any node, it isn’t placed back in the pool of pending transactions when blocks are discarded.

Now let’s see how the longest chain rule helps in preventing the double-spending problem, and other fraud. Let’s say one miner has a friend, John, who has $1,000 in his account. One of the transactions in block 99 is: “John paid Mary $1,000.” What if the miner decides to commit fraud by forking the chain and adding another transaction, “John paid Alex $1,000,” in block 100? Technically, this criminal miner is trying to cheat the blockchain by making it appear that John spent the same $1,000 twice—once in a transaction to Mary, and again in a transaction to Alex.

Remember, the block’s hash value is easy to check, but it’s time-consuming to calculate, so our criminal miner has to calculate the hashes for blocks 100, 101, and 102. Meanwhile, other miners continue mining new blocks (103, 104, 105, and so on) adding them to the chain. There’s no way that the criminal miner can recalculate all the hashes and create a longer chain faster than all the other nodes. The chain with the most work done (the longest chain) wins. In other words, the chances of modifying the content of the existing block(s) is close to zero, which makes a blockchain immutable.

What if two nodes calculated the hash of a new block at the same time? Which block would be added to the chain, and which node would be rewarded? All nodes of the blockchain have to come to a general agreement—***a consensus***—about who the winner is.

Consensus is required from all members because there is no system administrator who could modify or delete a block. Blockchains use different rules (consensus protocols), and in our app we’ll use proof of work combined with the longest chain to reach consensus on the true state of the blockchain. The aim of the consensus protocol is to guarantee that a single chain is used.







