/* eslint-disable no-unused-vars */

import { useEffect, useMemo, useState } from "react";

// import thirdweb
import { useWeb3 } from "@3rdweb/hooks";

// import ThirdWeb SDK
import { ThirdwebSDK } from "@3rdweb/sdk";

// First we need to instanciate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby");

// We need to grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0x658094B52CcA4827B102eA97A7a0F4C9Ead35A32",
);

const App = () => {

  // Use the connectWallet hook thirdweb give us.
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  // The signer is required to sign transaction on the blockchain
  // without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined;

  // create a state variable to know if user has our NFT.
  const [hasClaimNFT, setHasClaimNFT] = useState(false);

  // isClaiming lets us easily keep a laoding state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);

  // Another useEffect !
  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {

    // If we don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    // Check if the user has the NFT by using bundleDropModule.balanceOF
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        // If balance is greater then 0, they have our NFT!
        if (balance.gt(0)) {
          setHasClaimNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimNFT(false);
        console.error("failed to NFT balance", error);
      });
  }, [address]);

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to SkiSnowDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  const mintNft = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      // Set claim state.
      setHasClaimNFT(true);
      // Show user their fancy new NFT!
      console.log(
        `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0`
      );
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {
      // Stop loading state.
      setIsClaiming(false);
    });
  }

  // Render mint nft screen
  return (
    <div className="mint-nft">
      <h1>Mint your free ⛷🏂DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
