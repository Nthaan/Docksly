// components/ui/chart.tsx
export function ChartContainer({ children, className }: any) {
  return <div className={className}>{children}</div>
}

export function ChartTooltip({ content }: any) {
  return content
}

export function ChartTooltipContent({ hideLabel }: { hideLabel?: boolean }) {
  return <></>
}
