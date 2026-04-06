import { useState , useEffect , useRef } from "react";
import {apiService} from "../services/api";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const[success , setSuccess] = useState('');
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        fetchUserProfile();
    },[]);

    const fetchUserProfile = async () =>{
        setLoading(true);
        setError('');
        try{
            const response = await apiService.getMyProfile();

            if(response.data.statusCode === 200){
                setUserData(response.data.data);
            }else{
                setError(response.data.message);
            }

        }catch(err){
            setError(error.response?.data?.message || 'An error occurred while fetching profile data.');
        }
        finally{
            setLoading(false);
        }
    }


}

export default Profile;