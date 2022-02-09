import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x658094B52CcA4827B102eA97A7a0F4C9Ead35A32",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Ski/Snow MemberShip",
        description: "This NFT will give you access to SkiSnowDAO!",
        image: readFileSync("scripts/assets/skiNFT.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()