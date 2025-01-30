import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (id: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="number"
        placeholder="Enter Operator ID"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-48"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

