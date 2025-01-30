import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DetailCardProps {
  title: string
  value: string | number
}

export function DetailCard({ title, value }: DetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

