import Barcode from './components/Barcode'
import Header from '../../components/header/Index'

const BarcodePage = () => {
  return (
    <div className='barcode_scanner_page_container'>
      <Header />
      <Barcode />
    </div>
  )
}

export default BarcodePage
