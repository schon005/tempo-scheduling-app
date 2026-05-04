"use client";

import { useUser, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Notifications } from '@mui/icons-material';
import { CheckCircle } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EmployeeCalendar from './components/Calendar';
import { supabase } from '../../lib/supabaseClient';

export default function EmployeePage() {
  const { signOut, getToken } = useAuth();
  const { user } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('/images/default-avatar.png');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userShifts, setUserShifts] = useState([]);

  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  // PROFILE IMAGE
  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const token = await getToken();
        const response = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setProfileImageUrl(
          response.ok && data.profileImageUrl
            ? `${data.profileImageUrl}?t=${new Date().getTime()}`
            : '/images/default-avatar.png'
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (user) fetchUserProfileImage();
  }, [user, getToken]);

  // SHIFTS
  useEffect(() => {
    const fetchUserShifts = async () => {
      if (!user) return;

      const { data: userRecord } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_user_id', user.id)
        .single();

      if (!userRecord) return;

      const { data } = await supabase
        .from('my_shifts')
        .select('*')
        .eq('user_id', userRecord.id)
        .order('shift_start', { ascending: true });

      setUserShifts(data || []);
    };

    fetchUserShifts();
  }, [user]);

  // NOTIFICATIONS
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      const { data: userRecord } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_user_id', user.id)
        .single();

      if (!userRecord) return;

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.is_read).length || 0);
    };

    fetchNotifications();
  }, [user]);

  return (
    <div className="relative min-h-screen text-black flex">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url('/images/loginpagebackground.webp')` }}
      />

      {/* NAVBAR */}
      <NavBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col ${menuOpen ? 'ml-64' : 'ml-20'}`}>

        {/* 🔥 FIXED HEADER (NO MORE OVERLAP) */}
        <div className="flex justify-end items-center gap-4 p-4">

          {/* NOTIFICATIONS */}
          <button onClick={toggleNotifications} className="relative">
            <Notifications className="text-white text-3xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* USER */}
          <button onClick={toggleProfileMenu} className="flex items-center gap-2 max-w-[160px]">
            <Image
              className="rounded-full"
              src={profileImageUrl}
              alt="Profile"
              width={36}
              height={36}
            />
            <span className="text-white text-sm truncate">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </button>

        </div>

        {/* CONTENT */}
        <div className="px-4 sm:px-8 pb-8">

          {/* TITLE */}
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            Welcome to the Employee Dashboard
          </h1>

          {/* GREETING */}
          {user && (
            <p className="text-white mb-6 text-sm sm:text-base">
              Hello, {user.firstName} {user.lastName}
            </p>
          )}

          {/* CALENDAR */}
          <EmployeeCalendar shifts={userShifts} />

        </div>

      </div>
    </div>
  );
}