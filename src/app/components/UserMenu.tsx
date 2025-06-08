import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar, ListItemIcon, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

export default function UserMenu({ user, isAdmin }: { user: any, isAdmin: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenu} size="large" sx={{ ml: 2 }}>
        <Avatar sx={{ bgcolor: '#2563eb' }}>{user?.name?.[0] || user?.email?.[0] || '?'}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <div style={{ fontWeight: 700 }}>{user?.name || user?.email}</div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { router.push('/dashboard/settings'); handleClose(); }}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => { router.push('/dashboard/company-profile'); handleClose(); }}>
          <ListItemIcon><BusinessIcon fontSize="small" /></ListItemIcon>
          Company Profile
        </MenuItem>
        {isAdmin && (
          <MenuItem onClick={() => { router.push('/dashboard/admin'); handleClose(); }}>
            <ListItemIcon><AdminPanelSettingsIcon fontSize="small" /></ListItemIcon>
            Admin
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => { window.location.href = '/api/auth/logout'; }}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
} 