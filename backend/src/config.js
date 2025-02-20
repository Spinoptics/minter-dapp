require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Spinoptics Generative Art Blocks";
const description = "A programmatic art project containing over 70 layers and 400 segments with differing rarities.";
const baseUri = " "; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 300,
    layersOrder: [
      { name: "Layer0" },
      { name: "Layer1" },     
      { name: "Layer2" },
      { name: "Layer3" },
      { name: "Layer4" },
      { name: "Layer5" },
      { name: "Layer6" },
      { name: "Layer7" },
      { name: "Layer8" },
      { name: "Layer10" },
      { name: "Layer11" },
      { name: "Layer12" },
      { name: "Layer14" },
      { name: "Layer15" },
      { name: "Layer16" },
      { name: "Layer18" },
      { name: "Layer19" },
      { name: "Layer20" },
      { name: "Layer21" },
      { name: "Layer22" },
      { name: "Layer23" },
      { name: "Layer24" },
      { name: "Layer25" },
      { name: "Layer26" },
      { name: "Layer27" },
      { name: "Layer28" },
      { name: "Layer29" },
      { name: "Layer30" },
      { name: "Layer32" },
      { name: "Layer34" },
      { name: "Layer35" },
      { name: "Layer37" },
      { name: "Layer38" },
      { name: "Layer40" },
      { name: "Layer41" },
      { name: "Layer43" },
      { name: "Layer44" },
      { name: "Layer45" },
      { name: "Layer46" },
      { name: "Layer47" },
      { name: "Layer48" },      
      { name: "Layer49" },
      { name: "Layer51" },
      { name: "Layer52" },
      { name: "Layer53" },
      { name: "Layer54" },
      { name: "Layer55" },
      { name: "Layer56" },
      { name: "Layer57" },
      { name: "Layer58" },
      { name: "Layer60" },
      { name: "Layer61" },
      { name: "Layer62" },
      { name: "Layer63" },
      { name: "Layer64" },
      { name: "Layer65" },
      { name: "Layer66" },
      { name: "Layer69" },
      { name: "Layer70" },
      { name: "Layer72" },
      { name: "Layer74" },
      { name: "Layer75" },
      { name: "Layer77" },
      { name: "Layer78" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 3022,
  height: 3022,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://www.spinoptics.art", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'polygon'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'Spinoptics Generative Art Blocks';
const CONTRACT_SYMBOL = 'SB';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xDd6438a6cE18b6dbcdD939c4a33A4898E38ECAa6';
const TREASURY_ADDRESS = '0xDd6438a6cE18b6dbcdD939c4a33A4898E38ECAa6';
const MAX_SUPPLY = 300; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 45; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-06-11T00:01:00+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-05-24T00:01:00+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xDd6438a6cE18b6dbcdD939c4a33A4898E38ECAa6"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the ASE_URIase uri --> Changes for all metadata for all nfts
const PREREVEAL_TOKEN_URI = "ipfs://bafkreifuewbtzfxi4qn4w65orawmp3mdlj6lsbd43hhut4phxnw6as4wtq"; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0xDd6438a6cE18b6dbcdD939c4a33A4898E38ECAa6"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "0x6B5F3a9098df5A14bfe1c30869666Ae65E34e6e8"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which Blocks will you get?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeif7qtbve3tqhunhc2vgvvk4d7czv53wvoijbdy2dna33d5q2lxwsu"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
