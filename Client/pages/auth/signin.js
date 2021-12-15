import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signUpForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { doRequest, errors } = useRequest({
      url: '/api/users/signin',
      method: 'post',
      body: {
         email,
         password,
      },
      onSuccess: () => Router.push('/'),
   });

   const onSubmit = async (e) => {
      e.preventDefault();

      doRequest();
   };
   return (
      <form onSubmit={onSubmit}>
         <h1>Sign In</h1>
         <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{ fontWeight: 'bold' }}>
               Email address
            </label>
            <input
               type="email"
               className="form-control"
               id="exampleInputEmail1"
               aria-describedby="emailHelp"
               placeholder="Enter email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
               We'll never share your email with anyone else.
            </small>
         </div>
         <div className="form-group">
            <label
               htmlFor="exampleInputPassword1"
               style={{ fontWeight: 'bold' }}
            >
               Password
            </label>
            <input
               type="password"
               className="form-control"
               id="exampleInputPassword1"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>
         <div className="form-group form-check">
            <input
               type="checkbox"
               className="form-check-input"
               id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
               Check me out
            </label>
         </div>
         {errors}
         <button type="submit" className="btn btn-primary">
            Submit
         </button>
      </form>
   );
};

export default signUpForm;
