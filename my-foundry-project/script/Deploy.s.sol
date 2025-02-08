// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/EnergyToken.sol";
import "../src/P2PEnergyTrading.sol";
import "../src/MockUSDT.sol"; // Import Mock USDT contract

contract DeployScript is Script {
    function run() external {
        address deployer = vm.envAddress("DEPLOYER_ADDRESS");
        vm.startBroadcast(deployer);

        // Deploy Energy Token
        EnergyToken energyToken = new EnergyToken(1_000_000 * 10 ** 18);
        console.log("EnergyToken deployed at:", address(energyToken));

        // Deploy Mock USDT Token
        MockUSDT usdt = new MockUSDT();
        console.log("MockUSDT deployed at:", address(usdt));

        // Deploy P2P Energy Trading Contract
        P2PEnergyTrading p2pEnergyTrading = new P2PEnergyTrading(
            address(energyToken),
            address(usdt)
        );
        console.log("P2PEnergyTrading deployed at:", address(p2pEnergyTrading));

        vm.stopBroadcast();
    }
}
