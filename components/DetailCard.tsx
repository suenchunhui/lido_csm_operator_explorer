import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DetailCardProps {
  title: string
  value: string | number
  isAddress?: boolean
}

export function DetailCard({ title, value, isAddress = false }: DetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isAddress ? (
          <a
            href={`https://etherscan.io/address/${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-bold text-blue-500 hover:underline"
          >
            {isAddress && typeof value === 'string' && value.length > 18 ? `${value.slice(0, 10)}...${value.slice(-8)}` : value}
          </a>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  )
}

