// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/EnergyToken.sol";
import "../src/P2PEnergyTrading.sol";

contract DeployScript is Script {
    function run() external {
        address deployer = vm.envAddress("DEPLOYER_ADDRESS");
        vm.startBroadcast(deployer);

        EnergyToken energyToken = new EnergyToken(1_000_000 * 10 ** 18); // Pass an initial supply
        console.log("EnergyToken deployed at:", address(energyToken));

        address usdtAddress = 0x3813e82e6f7098b9583FC0F33a962D02018B6803; // Polygon Mumbai USDT
        P2PEnergyTrading p2pEnergyTrading = new P2PEnergyTrading(address(energyToken), usdtAddress);
        console.log("P2PEnergyTrading deployed at:", address(p2pEnergyTrading));

        vm.stopBroadcast();
    }
}