require( "@nomiclabs/hardhat-waffle" );
require( "@nomiclabs/hardhat-etherscan" );
require( 'dotenv' ).config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const RINKEBY_URL = process.env.RINKEBY_URL;
module.exports = {
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/RCBmSKBPTBbDxt9R98-gjn9H9WwgLyzt`,
      accounts: [ '3011ff77aad96cb53f28c33a84b36003f26145b0a056ace849ceaae8328e1f2a' ],
      timeout: 60000
    },
    hardhat: {
      forking: {
        enabled: true,
        url: `https://eth-mainnet.alchemyapi.io/v2/RCBmSKBPTBbDxt9R98-gjn9H9WwgLyzt`,
      }
    }
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  paths: {
    artifacts: '../frontend/src/artifacts',
  },
  etherscan: {
    apiKey: "AurMaGtBd_KnUAIzmHNpPhA04XVU_yKA",
  }

}