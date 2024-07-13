// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DatasetContract {

    uint256 nextId = 0;

    mapping(address => string) datasetLink; 
    mapping(uint256 => string) idDatasetLink;

    struct Dataset {
        uint256 id;
        address payable user;
        string name;
        string description;
        uint256 price;
    }

    Dataset[] public datasets;

    function upload(string memory _link , string memory _name , string memory _description , uint256 _price) public returns(bool) {
        datasetLink[msg.sender] = _link;
        idDatasetLink[nextId] = _link;

        Dataset memory newDataset = Dataset(nextId, payable(msg.sender), _name, _description, _price);
        datasets.push(newDataset);
        nextId++;

        return true;
    }

    function buyDataset(uint256 _buyId) public payable {
        address payable owner = datasets[_buyId].user;
        string memory dataLink = idDatasetLink[_buyId];
        require(msg.value >= datasets[_buyId].price, "You do not have enough filecoin to buy this dataset");

        datasetLink[msg.sender] = dataLink;
 
        owner.transfer(msg.value);
    }

    function getDatasets() public view returns(Dataset[] memory){
        return datasets;
    }

    function getLink() public view returns(string memory){
        return datasetLink[msg.sender];
    }
}