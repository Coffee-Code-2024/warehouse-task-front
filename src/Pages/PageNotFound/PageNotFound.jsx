import './pageNotFound.css'
import logo from './../../assets/img/logoCoffeeAndCode.jpg'
export const PageNotFound = () => {
    return (
        <div className="pagenotfund-container">
            <div className='pagenotfund-container-2'>
                <div>
                    <img src={logo} alt="Logo de coffee and code" />
                </div>
                <hr />
                Page Not Found
            </div>
        </div>
    )
}
