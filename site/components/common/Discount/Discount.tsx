import * as React from 'react';
import {AdDataResults} from "@components/common/Ad/Ad";

export interface DiscountCodeResults {
    data: string | null
}

function Discount() {
  const [data, setData] = React.useState<DiscountCodeResults | null>(null)
  const [isLoading, setLoading] = React.useState(false)

  function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function fetchDiscountCode() {
      fetch('http://localhost:2814/discount')
          .then((res) => res.json())
          .then((data) => {
              const index = getRandomArbitrary(0,data.length);
              setData(data[index]["code"])
          })
          .catch(e => {console.error(e.message)})
          .finally(() => { setLoading(false)} )
    }

  React.useEffect(() => {
    setLoading(true)
    fetchDiscountCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return (
    <div className="flex flex-row justify-center h-10">
      GET FREE SHIPPING WITH DISCOUNT CODE
    </div>
  )
  if (!data) return (
    <div className="flex flex-row justify-center h-10">
      GET FREE SHIPPING WITH DISCOUNT CODE &nbsp; <b>STOREDOG</b>
    </div>
  )

  return (
    <div className="flex flex-row justify-center h-10">
      GET FREE SHIPPING WITH DISCOUNT CODE &nbsp; <b>{data}</b>
    </div>
  )
}

export default Discount