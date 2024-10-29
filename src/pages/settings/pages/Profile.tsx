import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../../../features/modal/modalSlice';

const Profile = () => {
 const dispatch = useDispatch()
  useEffect(()=>{
 dispatch(setActivePage('profile-settings'))
  },[])
  return (
    <div>
      <h2>Profile Settings</h2>
      <p>Here you can manage your profile settings.</p>
    </div>
  );
};

export default Profile;
