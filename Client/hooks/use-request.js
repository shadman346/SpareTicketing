import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
   const [errors, setErrors] = useState(null);

   const doRequest = async () => {
      try {
         const response = await axios[method](url, body);
         setErrors(null);
         if (onSuccess) {
            // whether onSuccess argument provided
            onSuccess(response.data);
         }
      } catch (err) {
         setErrors(
            <div className="alert alert-danger">
               <h4>Request failed..</h4>
               <ul className="my-0">
                  {err.response.data.errors.map((err) => (
                     <li key={err.message}> {err.message}</li>
                  ))}
               </ul>
            </div>
         );
      }
   };

   return { doRequest, errors };
};
