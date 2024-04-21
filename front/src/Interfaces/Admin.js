import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReadUser from '../Pages/Admin/User/ReadUser'

import AddUser from '../Pages/Admin/User/AddUser'
import EditUser from '../Pages/Admin/User/EditUser'
import Dashboard from '../Pages/Admin/Dashboard/Dashboard'
function Admin() {
    
  return (
    
    <>
    <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/readuser" element={<ReadUser />} />
        <Route path="/admin/adduser" element={<AddUser />} />
        <Route path="/admin/edituser/:id" element={<EditUser />} />
        <Route path="/admin/readcategorie" element={<ReadCategorie />} />
        <Route path="/admin/addcategorie" element={<AddCategorie />} />
        <Route path="/admin/editcategorie/:id" element={<EditCategorie />} />
        <Route path="/admin/readProduct" element={<ReadProduct />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/admin/editProduct/:id" element={<EditProduct />} />
        <Route path="/admin/readSeller" element={<ReadSeller />} />
        <Route path="/admin/addSeller" element={<AddSeller />} />
        <Route path="/admin/editSeller/:id" element={<EditSeller />} />
</>
  )
}

export default Admin