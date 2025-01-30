"use client"

import { useEffect, useState } from "react"
import { SearchBar } from "@/components/SearchBar"
import { DetailCard } from "@/components/DetailCard"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { operatorData } from "@/data/mockData"
import { ethers } from "ethers";

const lido_csm_mainnet_addr = '0xdA7dE2ECdDfccC6c3AF10108Db212ACBBf9EA83F';
const lido_csm_getNodeOperator_abi = [
    // ABI for the getNodeOperator function
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "nodeOperatorId",
            "type": "uint256"
          }
        ],
        "name": "getNodeOperator",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint32",
                "name": "totalAddedKeys",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "totalWithdrawnKeys",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "totalDepositedKeys",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "totalVettedKeys",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "stuckValidatorsCount",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "depositableValidatorsCount",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "targetLimit",
                "type": "uint32"
              },
              {
                "internalType": "uint8",
                "name": "targetLimitMode",
                "type": "uint8"
              },
              {
                "internalType": "uint32",
                "name": "totalExitedKeys",
                "type": "uint32"
              },
              {
                "internalType": "uint32",
                "name": "enqueuedCount",
                "type": "uint32"
              },
              {
                "internalType": "address",
                "name": "managerAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "proposedManagerAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "rewardAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "proposedRewardAddress",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "extendedManagerPermissions",
                "type": "bool"
              }
            ],
            "internalType": "struct NodeOperator",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
];

export default function Dashboard() {
  const [searchId, setSearchId] = useState("")
  const [operatorId, setOperatorId] = useState("")
  const [currentOperator, setCurrentOperator] = useState(operatorData)
  const { toast } = useToast()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlOperatorId = urlParams.get('operatorId');
    if (urlOperatorId) {
        handleSearch(urlOperatorId);
        setOperatorId(urlOperatorId);
    }
  }, [searchId]);

  
  const handleSearch = (id: string) => {
    const fetchOperatorData = async (id: string) => {
        if(parseInt(id) <= 0){
        toast({title: "Invalid operator id", description: "Use a positive integer"});
        return;
        }

        const rpcUrls = [
          "https://cloudflare-eth.com",
          "https://rpc.flashbots.net",
          "https://eth.llamarpc.com",
          "https://1rpc.io/eth",
          "https://rpc.mevblocker.io",
          "https://ethereum-rpc.publicnode.com",
        ];
        const randomRpcUrl = rpcUrls[Math.floor(Math.random() * rpcUrls.length)];
        let succ = false;
        for(let retry=0;retry<3;retry++){
            try {
                const provider = new ethers.JsonRpcProvider(randomRpcUrl);
                const contract = new ethers.Contract(lido_csm_mainnet_addr, lido_csm_getNodeOperator_abi, provider);

                const result = await contract.getNodeOperator(id);
                setCurrentOperator({
                    totalAddedKeys: result.totalAddedKeys,
                    totalWithdrawnKeys: result.totalWithdrawnKeys,
                    totalDepositedKeys: result.totalDepositedKeys,
                    totalVettedKeys: result.totalVettedKeys,
                    stuckValidatorsCount: result.stuckValidatorsCount,
                    depositableValidatorsCount: result.depositableValidatorsCount,
                    targetLimit: result.targetLimit,
                    targetLimitMode: result.targetLimitMode,
                    totalExitedKeys: result.totalExitedKeys,
                    enqueuedCount: result.enqueuedCount,
                    managerAddress: result.managerAddress,
                    proposedManagerAddress: result.proposedManagerAddress,
                    rewardAddress: result.rewardAddress,
                    proposedRewardAddress: result.proposedRewardAddress,
                    extendedManagerPermissions: result.extendedManagerPermissions
                });
                setOperatorId(id);
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('operatorId', id);
                window.history.pushState({}, '', newUrl.toString());
                succ = true;
                break;
            } catch (error) {
                continue;
            }
        }
        if(!succ){
            toast({title: "Error fetching operator data"});
        }
    };
    fetchOperatorData(id);
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Lido CSM Operator Explorer</h1>
        <SearchBar onSearch={handleSearch} initSearchValue={operatorId} />
      </div>
      {operatorId && 
        <h2 className="text-2xl font-bold">Operator {operatorId}</h2>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DetailCard title="Total Added Keys" value={currentOperator.totalAddedKeys} />
        <DetailCard title="Total Withdrawn Keys" value={currentOperator.totalWithdrawnKeys} />
        <DetailCard title="Total Deposited Keys" value={currentOperator.totalDepositedKeys} />
        <DetailCard title="Total Vetted Keys" value={currentOperator.totalVettedKeys} />
        <DetailCard title="Stuck Validators Count" value={currentOperator.stuckValidatorsCount} />
        <DetailCard title="Depositable Validators Count" value={currentOperator.depositableValidatorsCount} />
        <DetailCard title="Target Limit" value={currentOperator.targetLimit} />
        <DetailCard title="Target Limit Mode" value={currentOperator.targetLimitMode} />
        <DetailCard title="Total Exited Keys" value={currentOperator.totalExitedKeys} />
        <DetailCard title="Enqueued Count" value={currentOperator.enqueuedCount} />
        <DetailCard
        title="Extended Manager Permissions"
        value={currentOperator.extendedManagerPermissions.toString()}
        />
        <DetailCard title="Manager Address" value={currentOperator.managerAddress} isAddress={true} />
        <DetailCard title="Proposed Manager Address" value={currentOperator.proposedManagerAddress} isAddress={true}/>
        <DetailCard title="Reward Address" value={currentOperator.rewardAddress} isAddress={true} />
        <DetailCard title="Proposed Reward Address" value={currentOperator.proposedRewardAddress} isAddress={true} />
      </div>
      <Toaster />
    </div>
  )
}

