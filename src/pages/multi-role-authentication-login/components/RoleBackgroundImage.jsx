import React from 'react';
import Image from '../../../components/AppImage';

const RoleBackgroundImage = ({ selectedRole }) => {
  const roleImages = {
    student: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    faculty: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?w=800&h=600&fit=crop',
    warden: 'https://images.pixabay.com/photo/2016/11/29/06/15/building-1867187_1280.jpg?w=800&h=600&fit=crop',
    hod: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop',
    admin: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=800&h=600&fit=crop'
  };

  if (!selectedRole) return null;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-10"></div>
      <Image
        src={roleImages?.[selectedRole]}
        alt={`${selectedRole} background`}
        className="w-full h-full object-cover opacity-20 role-transition"
      />
    </div>
  );
};

export default RoleBackgroundImage;