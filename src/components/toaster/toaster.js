import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToaster = () => {
    return (
        <ToastContainer position="bottom-center"
        autoClose={2000} hideProgressBar={true}/>
    )
}

export default CustomToaster;
