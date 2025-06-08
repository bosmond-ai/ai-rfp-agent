import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Define required and recommended fields
const REQUIRED_FIELDS = [
  'name', 'website', 'email', 'address', 'orgType', 'mission', 'ein', 'description'
];

interface Org {
  name?: string;
  website?: string;
  email?: string;
  address?: string;
  orgType?: string;
  mission?: string;
  ein?: string;
  description?: string;
  // add any other fields you use
  [key: string]: unknown;
}

function getCompletion(org: Org) {
  let filled = 0;
  const total = REQUIRED_FIELDS.length;
  const missing: string[] = [];
  for (const field of REQUIRED_FIELDS) {
    if (org[field]) filled++;
    else missing.push(field);
  }
  return { percent: Math.round((filled / total) * 100), missing };
}

const FIELD_LABELS: Record<string, string> = {
  name: 'Organization Name',
  website: 'Website',
  email: 'Email',
  address: 'Address',
  orgType: 'Organization Type',
  mission: 'Mission Statement',
  ein: 'EIN',
  description: 'Description',
  boardMembers: 'Board Members',
  keyPeople: 'Key People',
  financials: 'Financials',
  logoUrl: 'Logo',
  tags: 'Tags',
};

export default function ProfileCompletionBar({ org, onEdit }: { org: Org, onEdit?: () => void }) {
  const { percent, missing } = getCompletion(org);
  return (
    <Box sx={{ mb: 4, p: 3, bgcolor: '#f7fafc', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ mb: 1, color: '#2563eb', fontWeight: 700 }}>
        Profile Completion
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress variant="determinate" value={percent} sx={{ height: 12, borderRadius: 6, bgcolor: '#e0e7ef', '& .MuiLinearProgress-bar': { bgcolor: percent === 100 ? '#3bb273' : '#2563eb' } }} />
        </Box>
        <Typography sx={{ minWidth: 60, fontWeight: 600, color: percent === 100 ? '#3bb273' : '#2563eb' }}>{percent}%</Typography>
      </Box>
      {percent < 100 && (
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ color: '#e53e3e', fontWeight: 500, mb: 1 }}>
            Complete your profile to unlock more grant opportunities:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {missing.map(field => (
              <li key={field} style={{ color: '#183a4a', fontSize: 15, marginBottom: 2 }}>
                {FIELD_LABELS[field] || field}
              </li>
            ))}
          </ul>
          {onEdit && <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onEdit}>Edit Profile</Button>}
        </Box>
      )}
      {percent === 100 && (
        <Typography sx={{ color: '#3bb273', fontWeight: 600, mt: 1 }}>Your profile is complete!</Typography>
      )}
    </Box>
  );
} 