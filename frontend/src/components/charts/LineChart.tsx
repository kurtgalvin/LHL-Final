import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Tooltip, Brush, Line, XAxis } from 'recharts';

interface IProps {
  data: object[]
  regions: string[]
  dataArgs: string[]
}

const randomColour = () => {
  const random = () => Math.floor(Math.random() * 255)
  return `rgb(${random()}, ${random()}, ${random()})`
}

export default ({ data, regions, dataArgs }: IProps) => {
  const [lines, setLines] = useState<React.ReactElement[]>([])

  useEffect(() => {
    const result = []
    for (const r of regions) {
      for (const a of dataArgs) {
        result.push(<Line key={`${r}_${a}`} type="monotone" dataKey={`${r}_${a}`} stroke={randomColour()} dot={false} strokeWidth={3} />)
      }
    }
    setLines(result)
  }, [regions, dataArgs])

  return (
    <ResponsiveContainer width="100%" height="100%" >
      <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="date" hide={false} />
        <Tooltip formatter={(value, name) => [value, name.replace('_', ' ')]} />
        {lines}
        <Brush dataKey="date" startIndex={50}>
          <LineChart>
            {lines.map(line => React.cloneElement(line, {stroke: "rgb(82, 189, 242)"}))}
          </LineChart>
        </Brush>
      </LineChart>
    </ResponsiveContainer>
  )
}