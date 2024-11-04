import { Outlet } from 'react-router-dom'
import Header from '../../../components/header/Index'

const ReportsLayout = () => {
  return (
    <div style={{width:'100vw', display:'flex', flexDirection:"column", gap:"20px"}}>
        <Header />
      <Outlet />
    </div>
  )
}

export default ReportsLayout
