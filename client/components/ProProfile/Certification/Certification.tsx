import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// This component fetches the certification from DB
function Certification(props: { proId }) {
  const [certs, setCerts] = useState([]);

  const { query } = useRouter();
  query.id = props.proId;

  // fetch the cert from the db
  const fetchCert = () => {
    fetch(`/api/uploads/certification/${props.proId}`)
      .then((res) => res.json())
      .then((data) => setCerts(data));
  };

  useEffect(() => fetchCert(), []);

  // Loops through certs variable to find certImg in the DB
  const certImgOnly = certs.map((c) => c.certImg);

  // This variable will add quotes to the certImgOnly variable
  const addQuoteCertImg = "'" + certImgOnly.join("','") + "'";

  

  return (
    <div>
      <h4>Certificate</h4>
      <img src={certImgOnly} width="100%"></img>
    </div>
  );
}

export default Certification;
