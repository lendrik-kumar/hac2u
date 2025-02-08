// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/EnergyToken.sol";
import "../src/P2PEnergyTrading.sol";

contract P2PEnergyTradingTest is Test {
    EnergyToken energyToken;
    P2PEnergyTrading p2pEnergyTrading;
    address deployer = address(0x123);
    address producer = address(0x456);
    address consumer = address(0x789);
    address usdtAddress = address(0x999);

    function setUp() public {
        vm.startPrank(deployer);
        energyToken = new EnergyToken(1_000_000 * 10 ** 18); 
        p2pEnergyTrading = new P2PEnergyTrading(address(energyToken), usdtAddress);
        vm.stopPrank();
    }

    function testListTrade() public {
        vm.startPrank(producer);
        energyToken.mint(producer, 100);
        energyToken.approve(address(p2pEnergyTrading), 100);
        p2pEnergyTrading.listTrade(100, 1_000_000);
        vm.stopPrank();

        (address producerAddress, uint256 energyAmount, uint256 pricePerUnit, bool isActive) = p2pEnergyTrading.trades(0);
        assertEq(producerAddress, producer);
        assertEq(energyAmount, 100);
        assertEq(pricePerUnit, 1_000_000);
        assertTrue(isActive);
    }
}