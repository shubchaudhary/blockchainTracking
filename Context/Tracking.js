import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import Tracking from "../Context/Tracking.json";
const ContactAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = Tracking.abi;

const fetchContract = (signOrProvider) => new ethers.Contract(ContactAddress, ContractABI, signOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    const DappName = "Product Tracking DApp";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;

        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                }
            );
            await createItem.wait();
            console.log(createItem);
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const getAllShipment = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const getAllShipment = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));

            return allShipment;
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const getShipmentCount = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentsCount = await contract.getShipmentCount(accounts[0]);
            return shipmentsCount.toNumber();
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const completeShipment = async (completeShipment) => {
        console.log(completeShipment);

        const { receiver, index } = completeShipment;
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(accounts[0], receiver, index, {
                gasLimit: 300000,
            });

            transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index * 1);

            const singleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[7],
                isPaid: shipment[6],
            };

            return singleShipment;
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct;
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipment = await contract.startShipment(accounts[0], receiver, index * 1);

            shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                return "No account";
            }
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentUser(accounts[0]);
        } catch (error) {
            console.log("Something went wrong.", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentCount,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
};
