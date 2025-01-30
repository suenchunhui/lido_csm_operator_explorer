"use client"

import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"
import { DetailCard } from "@/components/DetailCard"
import { operatorData } from "@/data/mockData"

export default function Dashboard() {
  const [searchId, setSearchId] = useState("")
  const [currentOperator, setCurrentOperator] = useState(operatorData)

  const handleSearch = (id: string) => {
    setSearchId(id)
    // In a real application, you would fetch data based on the ID here
    // For this example, we're just using the same mock data
    setCurrentOperator(operatorData)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Operator Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
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
        <DetailCard title="Manager Address" value={currentOperator.managerAddress} />
        <DetailCard title="Proposed Manager Address" value={currentOperator.proposedManagerAddress} />
        <DetailCard title="Reward Address" value={currentOperator.rewardAddress} />
        <DetailCard title="Proposed Reward Address" value={currentOperator.proposedRewardAddress} />
        <DetailCard
          title="Extended Manager Permissions"
          value={currentOperator.extendedManagerPermissions.toString()}
        />
      </div>
    </div>
  )
}

