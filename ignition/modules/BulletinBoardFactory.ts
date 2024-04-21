import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";


const DEFAULT_PRICE_PER_BOARD = ethers.parseEther("0.0076"); // Default price per board in ether


const BulletinBoardFactoryModule = buildModule("BulletinBoardFactoryModule", (m) => {
  const pricePerBoard = m.getParameter("pricePerBoard", DEFAULT_PRICE_PER_BOARD);
  const bulletin = m.contract("BulletinBoardFactory", [], {
      value: pricePerBoard,
    });

  return { bulletin };
});

export default BulletinBoardFactoryModule;