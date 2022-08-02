import * as React from 'react';

function Discount() {
  const [data, setData] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  React.useEffect(() => {
    setLoading(true)
    fetch('http://localhost:2814/discount')
      .then((res) => res.json())
      .then((data) => {
        const index = getRandomArbitrary(0,data.length);
        setData(data[index]["code"])
        setLoading(false)
      })
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