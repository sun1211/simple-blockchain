# What a block is made of
block as a record in a ledger, contains app-specific data, and it also has a timestamp, its own hash value, and the hash value of the previous block
To add a new block to the chain:
1. Find the hash of the most recently inserted block, and store it as a reference to the previous block.
2. Generate a hash value for the newly created block.
3. Submit the new block to the blockchain for validation.

At some point the blockchain was created, and the very first block was inserted into this chain. The very first block in a chain is called a genesis block. Obviously there are no blocks before this first one, so the previous block’s hash doesn’t exist.

Now let’s imagine that there is a bad guy named Rampage, and he found out that the hash of some block in our blockchain is “e68d27a...” Can he modify its data, stating that he paid Mary $1,000, and then regenerate the other blocks so the hash values play well? To prevent this from happening, a blockchain requires algorithms to be solved, taking time and resources. That’s why blockchain members are required to spend time and resources to mine a block, rather than quickly generating a hash value.

