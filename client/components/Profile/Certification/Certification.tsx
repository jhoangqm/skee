import { useEffect, useState } from 'react'

function Certification() {
const [certs, setCerts] = useState([])

// fetch the cert from the db
const fetchCert = () => {
  fetch(`/api/uploads/certification`)
  .then()
}

useEffect(() => {

})

  return (
    <div>Certification</div>
  )
}

export default Certification