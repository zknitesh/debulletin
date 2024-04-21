// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BulletinBoard {
    struct BulletinTopic {
        string title;
        uint256 priority; // 1: High, 2: Medium, 3: Low
    }

    BulletinTopic[] public bulletinTopics;
    address public deployer;
    address public boardCreator;
    uint256 public pricePerTopic;

    event BulletinAdded(address indexed creator, string title, uint256 priority);
    event BulletinRemoved(address indexed remover, uint256 index);

    constructor(address _deployer, uint256 _pricePerTopic) payable {
        deployer = _deployer;
        boardCreator = msg.sender;
        pricePerTopic = _pricePerTopic;
    }

    modifier onlyBoardCreator() {
        require(msg.sender == boardCreator, "Only board creator can call this function");
        _;
    }

    function addBulletin(string memory _title, uint256 _priority) external payable onlyBoardCreator {
        require(bulletinTopics.length < 20, "Maximum number of topics reached");
        require(msg.value >= pricePerTopic, "Insufficient funds");

        bulletinTopics.push(BulletinTopic(_title, _priority));

        emit BulletinAdded(msg.sender, _title, _priority);
    }

    function removeBulletin(uint256 _index) external onlyBoardCreator {
        require(_index < bulletinTopics.length, "Invalid index");

        emit BulletinRemoved(msg.sender, _index);

        if (_index < bulletinTopics.length - 1) {
            bulletinTopics[_index] = bulletinTopics[bulletinTopics.length - 1];
        }
        bulletinTopics.pop();
    }

    function getBulletins() external view returns (BulletinTopic[] memory) {
        return bulletinTopics;
    }
}