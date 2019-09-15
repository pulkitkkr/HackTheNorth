pragma solidity ^0.5.10;

contract Loyalty {
    mapping(address => uint256) public loyaltyScores;

    function claculateScore(uint256 timeEnrolled, uint256 noOfTransactions, uint256 donations) pure private returns (uint256 score) {
        uint256 loyalty = timeEnrolled/2 + noOfTransactions/2 + donations/2;
        return loyalty; 
    }
    function setScore(address customer, uint256 timeEnrolled, uint256 noOfTransactions, uint256 donations) public {
        uint256 score = claculateScore(timeEnrolled,noOfTransactions,donations);
        loyaltyScores[customer] = score;
    }
    function getScore(address customer) view public returns(uint score) {
        return loyaltyScores[customer];
    }
}