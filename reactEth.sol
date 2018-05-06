pragma solidity ^0.4.11;

contract ReactExample {
    address private owner;
    string public you_awesome;
    string private secret;
    string private state;
    bool public pseudoRandomResult;
    event ExperimentComplete (bool result);

    function ReactExample () public {
        owner = msg.sender;
        you_awesome = "You're awesome";
        secret = "testing data";
        state = "init state";
    }

    function getSecret () public view returns (string) {
        return secret;
    }

    function getState () public view returns (string) {
        return state;
    }

    function setState (string newState) public payable {
        state = newState;
    }

    function setExperimentInMotion () public payable returns (bool) {
        bytes32 _pseudoRandomResult = keccak256 (msg.sender, msg.value, msg.data);
        // Some conditional depending on application's intention
        if (_pseudoRandomResult > bytes32 (10)) pseudoRandomResult = true;
        else pseudoRandomResult = false;

        // Emit event for React frontend
        ExperimentComplete (pseudoRandomResult);
    }

    function kill () public {
        require (msg.sender == owner);
        selfdestruct (owner);
    }

    function () public payable {
        revert ();
    }
}
