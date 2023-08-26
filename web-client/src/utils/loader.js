import React from 'react'
import { Dna, MutatingDots, TailSpin } from 'react-loader-spinner'

function Loader({size}) {
  return (
    <TailSpin
        height={size}
        width={size}
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
  )
}

export default Loader