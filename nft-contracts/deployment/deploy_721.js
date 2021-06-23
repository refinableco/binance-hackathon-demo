const RefinableToken = artifacts.require("BinanceERC721Token");
const secret = require("../secret.json");

module.exports = function(deployer, network) {
  deployer.deploy(
    RefinableToken,
    "BscAfrica721",
    "BSCAF721",
    secret.fromAddress,
    secret.signerAddress,
    "http://localhost:3333/metadata/{address}", // contractURI
    "ipfs://" // uri // TODO: IPFS
  );
};

// tri
