import axios from 'axios';
import { useEffect, useState } from 'react';
import { BoardingPassDto } from '../../types/types';
import { User } from '../../types/authentication';

const useMyBoardingPasses = (user: User | null) => {
    const [boardingPasses, setBoardingPasses] = useState<BoardingPassDto[]>([]);

    useEffect(() => {
        axios.get<BoardingPassDto[]>(`/api/boardingpasses/me`)
            .then((response) => setBoardingPasses(response.data))
            .catch(console.error);
    }, [user]);

    return boardingPasses;
}

export default useMyBoardingPasses;