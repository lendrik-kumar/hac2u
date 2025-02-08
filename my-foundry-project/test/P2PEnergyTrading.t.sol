// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/EnergyToken.sol";
import "../src/P2PEnergyTrading.sol";
import "../src/MockUSDT.sol"; // Import Mock USDT contract

contract P2PEnergyTradingTest is Test {
    EnergyToken energyToken;
    MockUSDT usdt; // Declare Mock USDT
    P2PEnergyTrading p2pEnergyTrading;
    address deployer = address(0x123);
    address producer = address(0x456);
    address consumer = address(0x789);

    function setUp() public {
        vm.startPrank(deployer);
        energyToken = new EnergyToken(1_000_000 * 10 ** 18); 
        usdt = new MockUSDT(); // Deploy Mock USDT
        p2pEnergyTrading = new P2PEnergyTrading(address(energyToken), address(usdt));
        energyToken.transfer(producer, 100 * 10 ** 18); // Transfer tokens to producer
        vm.stopPrank();
    }

    function testListTrade() public {
        vm.startPrank(producer);
        energyToken.approve(address(p2pEnergyTrading), 100 * 10 ** 18);
        p2pEnergyTrading.listTrade(100 * 10 ** 18, 1_000_000);
        vm.stopPrank();

        (address producerAddress, uint256 energyAmount, uint256 pricePerUnit, bool isActive) = p2pEnergyTrading.trades(0);
        assertEq(producerAddress, producer);
        assertEq(energyAmount, 100 * 10 ** 18);
        assertEq(pricePerUnit, 1_000_000);
        assertTrue(isActive);
    }
}