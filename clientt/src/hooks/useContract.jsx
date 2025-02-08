// import { useState, useEffect } from 'react';
// import { getContracts } from '../utils/web3Config';

// export const useContract = () => {
//     const [contracts, setContracts] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const initializeContracts = async () => {
//             try {
//                 const contractInstances = await getContracts();
//                 setContracts(contractInstances);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         initializeContracts();
//     }, []);

//     return { contracts, error, loading };
// };
