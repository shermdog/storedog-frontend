import * as React from 'react';

export interface AdDataResults {
    data: object | null
    path: string
}
// Advertisement banner
function Ad() {
  const [data, setData] = React.useState<AdDataResults | null>(null)
  const [isLoading, setLoading] = React.useState(false)

  function getRandomArbitrary(min: number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function fetchAd() {
      fetch('http://localhost:7676/ads')
          .then((res) => res.json())
          .then((data) => {
              const index = getRandomArbitrary(0,data.length);
              setData(data[index])
          })
          .catch(e => console.error(e.message))
          .finally(() => {
              setLoading(false)
          })
  }

  React.useEffect(() => {
      setLoading(true)
      fetchAd()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return (
    <div className="flex flex-row justify-center h-10">
      AD HERE
    </div>
  )
  if (!data) return (
    <div className="flex flex-row justify-center h-10">
      AD HERE
    </div>
  ) 

  return (
    <div className="flex flex-row justify-center py-4">
      <picture>
        <source srcSet={`http://localhost:7676/banners/${data.path}`} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`http://localhost:7676/banners/${data.path}`} alt="Landscape picture" />
      </picture>
    </div>
  )
}

export default Ad