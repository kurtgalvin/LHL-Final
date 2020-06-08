import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Tooltip, Brush, Line } from 'recharts';

interface IProps {
  data: object[]
  regions: string[],
  regionCodes: any
}

const randomColour = () => {
  const random = () => Math.floor(Math.random() * 255)
  return `rgb(${random()}, ${random()}, ${random()})`
}

export default ({ data, regions, regionCodes }: IProps) => {
  const [lines, setLines] = useState<React.ReactElement[]>([])

  useEffect(() => {
    setLines(regions.map(r => {
      return <Line type="monotone" dataKey={`${regionCodes[r]}_confirmed`} stroke={randomColour()} dot={false} strokeWidth={3} />
    }))
  }, [regions])

  return (
    <ResponsiveContainer width="100%" height="100%" >
      <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Tooltip/>
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