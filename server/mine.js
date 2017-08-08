const Web3 = require('web3');
const fs = require('fs');

var web3;
var contractAddr;
var abiDefinition;

var contractinstance;

module.exports = {

    connectweb3: () => {
        if (typeof web3 === 'undefined') {
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
    },

    deployContract: () => {
        ABI = fs.readFileSync('./ABI/marketAbi').toString();
        byteCode = fs.readFileSync('./ABI/bytecode').toString();

        abiDefinition = JSON.parse(ABI);
        marketContract = web3.eth.contract(abiDefinition);

        web3.personal.unlockAccount(web3.eth.accounts[0], 'jaibabaji');
        marketContract.new(20, { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 },
            function(e, contract) {
                if (typeof contract.address !== 'undefined') {
                    deployedContract = contract;
                    contractAddr = deployedContract.address;
                    contractinstance = marketContract.at(deployedContract.address);
                    console.log(contractAddr);
                }
            });
    },

    createInstance: () => {
        ABI = fs.readFileSync('./ABI/marketAbi').toString();

        abiDefinition = JSON.parse(ABI);
        marketContract = web3.eth.contract(abiDefinition);

        addr = fs.readFileSync('./ABI/Address').toString();
        contractinstance = marketContract.at(addr);
    },

    getData: (method, args) => {
        return contractinstance[method](...args);
    },
    setData: (method, args, cb) => {
        web3.personal.unlockAccount(web3.eth.accounts[0], 'jaibabaji');
        var transaction = {
            from: web3.eth.accounts[0],
            gas: 3000000
        };
        var transactionhash = contractinstance[method](...args, transaction);

        var filter = web3.eth.filter('latest');
        filter.watch((err, block) => {
            let trans = web3.eth.getBlock(block).transactions
            indx = trans.indexOf(transactionhash);

            if (indx > -1) {
                filter.stopWatching();
                //To be removed in production
                console.log("##### " + transactionhash + " mined");
                cb(null, transactionhash);
            }
        })
    }
}