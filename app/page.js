"use client";

import { useUser, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Notifications } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EmployeeCalendar from './components/Calendar';
import { supabase } from '../../lib/supabaseClient';

export default function EmployeePage() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('/images/default-avatar.png');
  const [userShifts, setUserShifts] = useState([]);

  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const fetchUserShifts = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('my_shifts')
        .select('*')
        .order('shift_start', { ascending: true });

      if (!error) setUserShifts(data || []);
    };

    fetchUserShifts();
  }, [user]);

  return (
    <div className="relative min-h-screen text-black">

      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url('/images/loginpagebackground.webp')` }}
      />

      <NavBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* ✅ FIXED HEADER (NO OVERLAP) */}
      <div className={`flex justify-end items-center gap-3 px-4 sm:px-8 pt-6 pb-4 ${menuOpen ? 'ml-20 sm:ml-64' : 'ml-20'}`}>

        <Notifications className="text-white text-3xl" />

        <Image
          className="rounded-full"
          src={profileImageUrl}
          alt="Profile"
          width={36}
          height={36}
        />

        <span className="text-white font-semibold max-w-[120px] sm:max-w-none truncate">
          {user?.emailAddresses?.[0]?.emailAddress}
        </span>

      </div>

      {/* ✅ MAIN CONTENT (SPACED PROPERLY) */}
      <div className={`px-4 sm:px-8 pb-8 ${menuOpen ? 'ml-20 sm:ml-64' : 'ml-20'}`}>

        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight break-words">
          Welcome to the Employee Dashboard
        </h1>

        <div className="mb-6 text-white">
          {user ? (
            <>
              <p className="text-lg font-semibold">
                Hello, {user.firstName} {user.lastName}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <EmployeeCalendar shifts={userShifts} />

      </div>
    </div>
  );
}