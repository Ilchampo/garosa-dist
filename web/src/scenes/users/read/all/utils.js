import { useEffect, useState } from 'react';
import { userApi } from '../../../../api/user';

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllUsers = async () => {
        const { data } = await userApi.get('/get/all');
        setUsers(data.payload);
        setIsLoading(false);    
    };
    
    useEffect(() => {
        getAllUsers();
    }, []);
    return { users, isLoading };
};
