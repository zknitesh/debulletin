// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./BulletinBoard.sol";

contract BulletinBoardFactory {
    address[] public bulletinBoards;

    event BulletinBoardCreated(address indexed creator, address indexed board);

    function createBulletinBoard(uint256 _pricePerBoard) external payable {
        require(msg.value >= _pricePerBoard, "Insufficient funds");
        BulletinBoard newBulletinBoard = new BulletinBoard(msg.sender, _pricePerBoard);
        bulletinBoards.push(address(newBulletinBoard));
        emit BulletinBoardCreated(msg.sender, address(newBulletinBoard));
    }

    function getBulletinBoards() external view returns (address[] memory) {
        return bulletinBoards;
    }
}
