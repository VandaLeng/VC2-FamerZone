import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerSidebar from '../components/FarmerSidebar'

const FarmerLayout = ({ children, currentLanguage, setCurrentLanguage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    if (!user || user.role !== 'farmer') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <FarmerSidebar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
};

export default FarmerLayout;
