import { useAuth } from '../context/AuthContext';
import { HiMail, HiUser, HiCalendar, HiShieldCheck } from 'react-icons/hi';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  const joined = new Date(user.joinedDate || user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="page-fade-in page-container profile-page">
      <div className="profile-banner"></div>
      <div className="card profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">{initials}</div>
          <div>
            <div className="profile-name">{user.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Member since {joined}</div>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <div className="profile-info-label"><HiUser style={{ verticalAlign: 'middle', marginRight: 6 }} />Full Name</div>
            <div className="profile-info-value">{user.name}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label"><HiMail style={{ verticalAlign: 'middle', marginRight: 6 }} />Email Address</div>
            <div className="profile-info-value">{user.email}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label"><HiCalendar style={{ verticalAlign: 'middle', marginRight: 6 }} />Joined</div>
            <div className="profile-info-value">{joined}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label"><HiShieldCheck style={{ verticalAlign: 'middle', marginRight: 6 }} />Account Status</div>
            <div className="profile-info-value" style={{ color: 'var(--green)' }}>✓ Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
