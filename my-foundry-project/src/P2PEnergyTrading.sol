// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Address.sol"; // Import Address utils
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; // Correct import for ReentrancyGuard

contract P2PEnergyTrading is ReentrancyGuard {
    using Address for address; // Enable Address library functions

    address public admin;
    IERC20 public energyToken;
    IERC20 public paymentToken; // USDT

    struct Trade {
        address producer;
        uint256 energyAmount; // kWh
        uint256 pricePerUnit; // in USDT (6 decimals)
        bool isActive;
    }

    Trade[] public trades;

    event TradeListed(
        uint256 tradeId,
        address producer,
        uint256 amount,
        uint256 price
    );
    event TradeFilled(uint256 tradeId, address consumer);
    event FeesWithdrawn(address admin, uint256 amount);
    event AdminTransferred(address oldAdmin, address newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized");
        _;
    }

    constructor(address _energyToken, address _paymentToken) {
    require(_energyToken != address(0) && _paymentToken != address(0), "Invalid token address");
    require(isContract(_energyToken), "Energy token must be a contract");
    require(isContract(_paymentToken), "Payment token must be a contract");

    admin = msg.sender;
    energyToken = IERC20(_energyToken);
    paymentToken = IERC20(_paymentToken);
}


    function isContract(address account) internal view returns (bool) {
        return account.code.length > 0;
    }

    function listTrade(uint256 _energyAmount, uint256 _pricePerUnit) external {
        require(_energyAmount > 0, "Invalid amount");
        require(_pricePerUnit > 0, "Invalid price");

        require(
            energyToken.transferFrom(msg.sender, address(this), _energyAmount),
            "Energy token transfer failed"
        );

        trades.push(
            Trade({
                producer: msg.sender,
                energyAmount: _energyAmount,
                pricePerUnit: _pricePerUnit,
                isActive: true
            })
        );

        emit TradeListed(
            trades.length - 1,
            msg.sender,
            _energyAmount,
            _pricePerUnit
        );
    }

    function purchaseEnergy(uint256 _tradeId) external nonReentrant {
        Trade storage trade = trades[_tradeId];
        require(trade.isActive, "Trade inactive");

        uint256 totalCost = trade.energyAmount * trade.pricePerUnit;
        require(
            paymentToken.transferFrom(msg.sender, trade.producer, totalCost),
            "USDT payment failed"
        );

        energyToken.transfer(msg.sender, trade.energyAmount);

        trade.isActive = false;
        emit TradeFilled(_tradeId, msg.sender);
    }

    function withdrawFees() external onlyAdmin {
        uint256 balance = paymentToken.balanceOf(address(this));
        paymentToken.transfer(admin, balance);
        emit FeesWithdrawn(admin, balance);
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        emit AdminTransferred(admin, newAdmin);
        admin = newAdmin;
    }
}