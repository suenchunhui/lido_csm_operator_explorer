import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (id: string) => void,
  initSearchValue: string,
}

export function SearchBar({ onSearch, initSearchValue }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(initSearchValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  useEffect(() => {
    setSearchValue(initSearchValue);
  }, [initSearchValue]);

  console.log("initSearchValue", initSearchValue)
  console.log("searchValue", searchValue)

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${searchValue === "" ? "border border-red-500" : ""}`}>
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

