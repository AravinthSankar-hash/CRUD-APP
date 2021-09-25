import { toast } from 'react-toastify';

const HelperService = {
    triggerToast: (toastMsg, isSuccess) => {
        toast(toastMsg, {
            className: isSuccess ? 'toaster-bg-succ' : 'toaster-bg-failed',
        });   
    }
}

export default HelperService;
