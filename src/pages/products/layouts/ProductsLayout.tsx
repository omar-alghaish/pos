import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../components/header/Index'

const ProductsLayout = () => {
  return (
    <div style={{width:'100vw'}}>
        <Header />
      <Outlet />
    </div>
  )
}

export default ProductsLayout
