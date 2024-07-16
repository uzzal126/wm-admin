import { useLocation } from "react-router-dom";
import ExpireAlert from "./expireAlert";

const RenderNotifications = () => {
    const location = useLocation()

    return (
        <>
            {
                !location.pathname.includes('/profile/renew') &&
                <ExpireAlert />
            }
        </>
    );
};

export default RenderNotifications;