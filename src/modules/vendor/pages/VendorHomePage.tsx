import React, {useState} from 'react'
import { useSelector } from 'react-redux';

const VendorHomePage = () => {
  const [vendor, setVendor] = useState(null);
  const [productGroup, setProductGroup] = useState([]);

  const vendor_id = useSelector((state: any) => state.auth.user.vendor_id);
  console.log(vendor_id)

  return (
    <div>VendorHomePage</div>
  )
}

export default VendorHomePage