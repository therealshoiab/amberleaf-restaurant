import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { MENU_CATEGORIES } from '../data/defaultMenu';
import type { MenuItem, BroadcastBannerData } from '../data/defaultMenu';
import { SEO } from '../components/SEO';
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Search,
  RotateCcw,
  Sparkles,
  Megaphone,
  Settings,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => menuService.isLoggedIn());
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'broadcast' | 'settings'>('manage');

  // Menu Items State
  const [items, setItems] = useState<MenuItem[]>(() => menuService.getMenuItems());
  const [categories, setCategories] = useState<string[]>(() => {
    const list = menuService.getMenuItems();
    const unique = Array.from(new Set(list.map((i) => i.category))).filter(Boolean);
    return Array.from(new Set([...MENU_CATEGORIES.filter((c) => c !== 'All'), ...unique]));
  });

  // Search & Filter in Manage Tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');

  // Add Item Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Kashmiri Wazwan',
    customCategory: '',
    price: '',
    description: '',
    rating: 4.8,
    isPopular: false,
    isSignature: false,
    isChefsPick: false,
    isVegetarian: false,
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Broadcast Banner State
  const [bannerConfig, setBannerConfig] = useState<BroadcastBannerData>(() => menuService.getBroadcastBanner());
  const [bannerSuccess, setBannerSuccess] = useState('');

  // Settings State
  const [currentPasscodeInput, setCurrentPasscodeInput] = useState('');
  const [newPasscodeInput, setNewPasscodeInput] = useState('');
  const [confirmPasscodeInput, setConfirmPasscodeInput] = useState('');
  const [passcodeMessage, setPasscodeMessage] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [apiEndpointInput, setApiEndpointInput] = useState(() => menuService.getApiEndpoint());
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const refreshMenuData = () => {
    const currentItems = menuService.getMenuItems();
    setItems(currentItems);
    const unique = Array.from(new Set(currentItems.map((i) => i.category))).filter(Boolean);
    setCategories(Array.from(new Set([...MENU_CATEGORIES.filter((c) => c !== 'All'), ...unique])));
  };

  useEffect(() => {
    const handleMenuUpdate = () => refreshMenuData();
    const handleBannerUpdate = () => setBannerConfig(menuService.getBroadcastBanner());

    window.addEventListener('amberleaf:menu_updated', handleMenuUpdate);
    window.addEventListener('amberleaf:broadcast_updated', handleBannerUpdate);

    return () => {
      window.removeEventListener('amberleaf:menu_updated', handleMenuUpdate);
      window.removeEventListener('amberleaf:broadcast_updated', handleBannerUpdate);
    };
  }, []);

  // --- AUTHENTICATION ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (menuService.verifyPasscode(passcode)) {
      setIsAuthenticated(true);
      menuService.setLoggedIn(true);
      setLoginError('');
      setPasscode('');
    } else {
      setLoginError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    menuService.setLoggedIn(false);
    setPasscode('');
  };

  // --- ADD DISH HANDLERS ---
  const handleAddImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setFormError('Image size is too large (max 3MB). Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
        setImagePreview(result);
        setFormError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess('');
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter a dish name.');
      return;
    }
    if (!formData.price.trim()) {
      setFormError('Please enter a price (e.g. 520 or ₹520).');
      return;
    }

    const finalCategory =
      formData.category === '__custom__'
        ? formData.customCategory.trim() || 'Specials'
        : formData.category;

    const res = menuService.addMenuItem({
      name: formData.name,
      category: finalCategory,
      price: formData.price,
      description: formData.description || 'Prepared fresh by master chefs with organic ingredients at Amberleaf Srinagar.',
      rating: Number(formData.rating) || 4.8,
      isPopular: formData.isPopular,
      isSignature: formData.isSignature,
      isChefsPick: formData.isChefsPick,
      isVegetarian: formData.isVegetarian,
      image: formData.image || './images/g1.jpg',
    });

    if (res.success) {
      setFormSuccess(`🎉 "${formData.name}" added to menu successfully!`);
      setFormData({
        name: '',
        category: 'Kashmiri Wazwan',
        customCategory: '',
        price: '',
        description: '',
        rating: 4.8,
        isPopular: false,
        isSignature: false,
        isChefsPick: false,
        isVegetarian: false,
        image: '',
      });
      setImagePreview('');
      refreshMenuData();
      setTimeout(() => setFormSuccess(''), 4000);
    }
  };

  // --- MANAGE DISH HANDLERS ---
  const handleDeleteItem = (id: string | number, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      menuService.deleteMenuItem(id);
      refreshMenuData();
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingItem({ ...item });
    setEditImagePreview(item.image || '');
    setEditSuccess('');
  };

  const handleEditImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditingItem((prev) => (prev ? { ...prev, image: result } : null));
        setEditImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    menuService.updateMenuItem(editingItem.id, editingItem);
    refreshMenuData();
    setEditSuccess('Changes saved successfully!');
    setTimeout(() => {
      setEditingItem(null);
      setEditSuccess('');
    }, 1200);
  };

  const handleResetMenu = () => {
    if (
      window.confirm(
        '⚠️ Reset all menu items to original factory defaults? Any custom items or edits will be restored.'
      )
    ) {
      menuService.resetMenu();
      refreshMenuData();
      alert('Menu restored to original default dishes.');
    }
  };

  // --- BROADCAST BANNER HANDLERS ---
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const res = menuService.saveBroadcastBanner(bannerConfig);
    if (res.success) {
      setBannerSuccess('Broadcast banner updated live on website!');
      setTimeout(() => setBannerSuccess(''), 3500);
    }
  };

  // --- SETTINGS / PASSCODE ---
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeMessage('');
    setPasscodeError('');

    if (!menuService.verifyPasscode(currentPasscodeInput)) {
      setPasscodeError('Current passcode is incorrect.');
      return;
    }
    if (newPasscodeInput.length < 4) {
      setPasscodeError('New passcode must be at least 4 characters long.');
      return;
    }
    if (newPasscodeInput !== confirmPasscodeInput) {
      setPasscodeError('New passcode and confirmation do not match.');
      return;
    }

    const res = menuService.updatePasscode(newPasscodeInput);
    if (res.success) {
      setPasscodeMessage('Admin passcode changed successfully! Remember your new passcode.');
      setCurrentPasscodeInput('');
      setNewPasscodeInput('');
      setConfirmPasscodeInput('');
      setTimeout(() => setPasscodeMessage(''), 4000);
    } else {
      setPasscodeError(res.error || 'Failed to update passcode.');
    }
  };

  // Filtered Items for Manage View
  const filteredManageItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilterCategory === 'All' || item.category === selectedFilterCategory;
    return matchesSearch && matchesCategory;
  });

  // =========================================================================
  // 1. LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div
        className="page-container"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '7rem 1.5rem 4rem 1.5rem',
        }}
      >
        <SEO
          title="Admin Portal"
          description="Executive administration portal for Amberleaf Fine Dine & Cafe."
        />

        <div
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '460px',
            padding: '2.5rem',
            textAlign: 'center',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src="./images/logo.png"
              alt="Amberleaf Logo"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '2px solid var(--accent-gold)',
                objectFit: 'cover',
                boxShadow: '0 0 20px rgba(197, 160, 89, 0.3)',
              }}
            />
          </div>

          <span
            style={{
              color: 'var(--accent-gold)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.25rem',
            }}
          >
            Executive Management
          </span>
          <h2
            style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Amberleaf Admin
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              marginBottom: '2rem',
              lineHeight: '1.5',
            }}
          >
            Owner & manager portal to update culinary dishes, prices, photos, and announcements.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                Enter Admin Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasscode ? 'text' : 'password'}
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 3rem 0.85rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div
                style={{
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textAlign: 'left',
                }}
              >
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.9rem',
                marginTop: '0.5rem',
                gap: '0.5rem',
              }}
            >
              <Lock size={16} />
              Sign In to Admin Panel
            </button>
          </form>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(197, 160, 89, 0.08)',
              border: '1px solid var(--border-light)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span>💡 Default Passcode: </span>
            <strong style={{ color: 'var(--accent-gold)' }}>Amberleaf@2026</strong>
          </div>

          <div style={{ marginTop: '1.8rem' }}>
            <a
              href="#/home"
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-gold)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              ← Return to Amberleaf Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="page-container" style={{ paddingBottom: '5rem' }}>
      <SEO
        title="Admin Dashboard"
        description="Manager control panel for Amberleaf Restaurant in Srinagar."
      />

      {/* Top Header Card */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem 2rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="./images/logo.png"
            alt="Amberleaf Logo"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1.5px solid var(--accent-gold)',
              objectFit: 'cover',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  color: 'var(--accent-gold)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                ADMINISTRATOR PORTAL
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Live Mode</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', margin: 0 }}>
              Amberleaf Restaurant Manager
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="#/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <ExternalLink size={14} />
            View Live Menu
          </a>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '0.55rem 1.1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <button
          onClick={() => setActiveTab('manage')}
          style={{
            padding: '0.75rem 1.4rem',
            borderRadius: '12px 12px 0 0',
            border: 'none',
            background: activeTab === 'manage' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'manage' ? '#040906' : 'var(--text-primary)',
            fontWeight: activeTab === 'manage' ? 700 : 500,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <span>📋</span> Manage Dishes ({items.length})
        </button>

        <button
          onClick={() => setActiveTab('add')}
          style={{
            padding: '0.75rem 1.4rem',
            borderRadius: '12px 12px 0 0',
            border: 'none',
            background: activeTab === 'add' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'add' ? '#040906' : 'var(--text-primary)',
            fontWeight: activeTab === 'add' ? 700 : 500,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={16} /> Add New Dish
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          style={{
            padding: '0.75rem 1.4rem',
            borderRadius: '12px 12px 0 0',
            border: 'none',
            background: activeTab === 'broadcast' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'broadcast' ? '#040906' : 'var(--text-primary)',
            fontWeight: activeTab === 'broadcast' ? 700 : 500,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <Megaphone size={16} /> Broadcast Banner {bannerConfig.enabled && '🟢'}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          style={{
            padding: '0.75rem 1.4rem',
            borderRadius: '12px 12px 0 0',
            border: 'none',
            background: activeTab === 'settings' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'settings' ? '#040906' : 'var(--text-primary)',
            fontWeight: activeTab === 'settings' ? 700 : 500,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <Settings size={16} /> Settings & Security
        </button>
      </div>

      {/* =========================================================================
          TAB 1: MANAGE DISHES
      ========================================================================= */}
      {activeTab === 'manage' && (
        <div>
          {/* Search & Actions Bar */}
          <div
            className="glass-panel"
            style={{
              padding: '1.25rem 1.75rem',
              borderRadius: '16px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                }}
              />
              <input
                type="text"
                placeholder="Search dishes by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1.25rem 0.65rem 2.5rem',
                  borderRadius: '25px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category:</span>
              <select
                value={selectedFilterCategory}
                onChange={(e) => setSelectedFilterCategory(e.target.value)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="All">All Categories ({items.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} ({items.filter((i) => i.category === cat).length})
                  </option>
                ))}
              </select>

              <button
                onClick={handleResetMenu}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  padding: '0.55rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                title="Restore original factory menu dishes"
              >
                <RotateCcw size={13} />
                Reset Defaults
              </button>
            </div>
          </div>

          {/* Dishes Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredManageItems.map((dish) => (
              <div
                key={dish.id}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Photo Thumbnail */}
                <div style={{ position: 'relative', width: '100%', height: '170px', backgroundColor: '#070f0b' }}>
                  <img
                    src={dish.image || './images/g1.jpg'}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = './images/amberleaf-vibe.jpg';
                    }}
                  />

                  {/* Top Left Badges */}
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {dish.isChefsPick && (
                      <span
                        style={{
                          backgroundColor: 'rgba(197, 160, 89, 0.9)',
                          color: '#040906',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        ✦ Chef's Pick
                      </span>
                    )}
                    {dish.isSignature && (
                      <span
                        style={{
                          backgroundColor: 'rgba(16, 34, 25, 0.9)',
                          color: 'var(--accent-gold)',
                          border: '1px solid var(--accent-gold)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        Signature
                      </span>
                    )}
                    {dish.isPopular && (
                      <span
                        style={{
                          backgroundColor: 'rgba(217, 119, 6, 0.9)',
                          color: '#ffffff',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Top Right Category & Veg Badge */}
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.35rem' }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                      }}
                    >
                      {dish.category}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: dish.isVegetarian ? '#22c55e' : '#ef4444',
                        border: `1px solid ${dish.isVegetarian ? '#22c55e' : '#ef4444'}`,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.4rem',
                        borderRadius: '4px',
                      }}
                    >
                      {dish.isVegetarian ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem',
                      gap: '0.5rem',
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                      {dish.name}
                    </h3>
                    <span
                      className="menu-price"
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--accent-gold)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ₹{dish.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      flexGrow: 1,
                      marginBottom: '1rem',
                    }}
                  >
                    {dish.description}
                  </p>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '0.85rem',
                    }}
                  >
                    <button
                      onClick={() => handleEditClick(dish)}
                      style={{
                        flex: 1,
                        padding: '0.55rem',
                        background: 'rgba(197, 160, 89, 0.08)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)';
                        e.currentTarget.style.color = 'var(--accent-gold)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      <Edit size={14} />
                      Edit Dish
                    </button>

                    <button
                      onClick={() => handleDeleteItem(dish.id, dish.name)}
                      style={{
                        padding: '0.55rem 0.9rem',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        color: '#ef4444',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Delete this dish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredManageItems.length === 0 && (
            <div
              className="glass-panel"
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                borderRadius: '16px',
                color: 'var(--text-secondary)',
              }}
            >
              <h3>No dishes found</h3>
              <p>Try searching for a different keyword or category.</p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: ADD NEW DISH
      ========================================================================= */}
      {activeTab === 'add' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
          className="admin-grid-2"
        >
          {/* Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Create & Publish New Dish
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Fill in the dish information below. Once published, this item immediately appears live in the customer menu.
            </p>

            {formSuccess && (
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid #22c55e',
                  color: '#22c55e',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle2 size={18} />
                <span>{formSuccess}</span>
              </div>
            )}

            {formError && (
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle size={18} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              {/* Title & Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1rem' }} className="form-row-2">
                <div>
                  <label
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mutton Methi Maaz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Price (₹) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 520 or ₹520"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Menu Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    marginBottom: formData.category === '__custom__' ? '0.5rem' : '0',
                  }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__custom__">➕ Type Custom Category...</option>
                </select>

                {formData.category === '__custom__' && (
                  <input
                    type="text"
                    placeholder="Enter new category name..."
                    value={formData.customCategory}
                    onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                    }}
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of flavors, slow-cooked spices, or serving style..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Photo Upload or URL */}
              <div>
                <label
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Dish Photo (Upload File or Enter Image Path)
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(197, 160, 89, 0.1)',
                        border: '1.5px dashed var(--accent-gold)',
                        color: 'var(--accent-gold)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Upload size={16} />
                      Choose Image from Device
                      <input type="file" accept="image/*" onChange={handleAddImageFile} style={{ display: 'none' }} />
                    </label>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>or enter image path:</span>
                  </div>

                  <input
                    type="text"
                    placeholder="e.g. ./images/g1.jpg or https://..."
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Badges & Checkboxes */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isChefsPick}
                    onChange={(e) => setFormData({ ...formData, isChefsPick: e.target.checked })}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>✦ Chef's Pick</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isSignature}
                    onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>Signature Dish</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>Popular</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isVegetarian}
                    onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                    style={{ accentColor: '#22c55e' }}
                  />
                  <span style={{ color: formData.isVegetarian ? '#22c55e' : 'inherit' }}>Vegetarian</span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary" style={{ padding: '0.9rem', marginTop: '1rem', width: '100%', gap: '0.5rem' }}>
                <Plus size={18} />
                Publish Dish to Live Menu
              </button>
            </form>
          </div>

          {/* Live Preview Card */}
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-gold)" />
              Real-time Customer Menu Preview
            </h3>

            <div
              className="glass-panel shimmer-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#070f0b' }}>
                <img
                  src={imagePreview || formData.image || './images/g1.jpg'}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = './images/amberleaf-vibe.jpg';
                  }}
                />

                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {formData.isChefsPick && (
                    <span style={{ backgroundColor: 'rgba(197, 160, 89, 0.9)', color: '#040906', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      ✦ Chef's Pick
                    </span>
                  )}
                  {formData.isSignature && (
                    <span style={{ backgroundColor: 'rgba(16, 34, 25, 0.9)', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Signature
                    </span>
                  )}
                  {formData.isPopular && (
                    <span style={{ backgroundColor: 'rgba(217, 119, 6, 0.9)', color: '#ffffff', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Popular
                    </span>
                  )}
                </div>

                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.35rem' }}>
                  <span style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', color: '#ffffff', fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {formData.category === '__custom__' ? formData.customCategory || 'Custom' : formData.category}
                  </span>
                  <span style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', color: formData.isVegetarian ? '#22c55e' : '#ef4444', border: `1px solid ${formData.isVegetarian ? '#22c55e' : '#ef4444'}`, fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                    {formData.isVegetarian ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                    {formData.name || 'Dish Name Preview'}
                  </h4>
                  <span className="menu-price" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>
                    {formData.price.startsWith('₹') ? formData.price : formData.price ? `₹${formData.price}` : '₹0'}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {formData.description || 'Dish description will appear here as you type in the form.'}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: 'auto' }}>
                  <div style={{ padding: '0.55rem', background: 'rgba(252, 128, 25, 0.15)', border: '1px solid rgba(252, 128, 25, 0.3)', color: '#fc8019', borderRadius: '8px', fontSize: '0.78rem', textAlign: 'center', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <ShoppingBag size={13} /> Swiggy Available
                  </div>
                  <div style={{ padding: '0.55rem', background: 'rgba(226, 55, 68, 0.15)', border: '1px solid rgba(226, 55, 68, 0.3)', color: '#e23744', borderRadius: '8px', fontSize: '0.78rem', textAlign: 'center', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <ShoppingBag size={13} /> Zomato Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: BROADCAST BANNER
      ========================================================================= */}
      {activeTab === 'broadcast' && (
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: '20px',
            maxWidth: '850px',
            margin: '0 auto',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>
                Live Site-Wide Broadcast Banner
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Announce special festive feasts, royal private dining bookings, or hours across the very top of the entire website.
              </p>
            </div>

            {/* Status Switch */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                padding: '0.55rem 1.1rem',
                borderRadius: '30px',
                backgroundColor: bannerConfig.enabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(142, 142, 147, 0.15)',
                border: `1.5px solid ${bannerConfig.enabled ? '#22c55e' : '#8e8e93'}`,
              }}
            >
              <input
                type="checkbox"
                checked={bannerConfig.enabled}
                onChange={(e) => setBannerConfig({ ...bannerConfig, enabled: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#22c55e' }}
              />
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: bannerConfig.enabled ? '#22c55e' : 'var(--text-secondary)' }}>
                {bannerConfig.enabled ? 'Banner Active (Live)' : 'Banner Inactive (Hidden)'}
              </span>
            </label>
          </div>

          {bannerSuccess && (
            <div
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid #22c55e',
                color: '#22c55e',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CheckCircle2 size={18} />
              <span>{bannerSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSaveBanner} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                Announcement Message *
              </label>
              <textarea
                rows={3}
                placeholder="e.g. ✨ Weekend Wazwan Feast: Special Traami Platters & Gushtaba! Reserve your table at +91 60063 79610 or WhatsApp +91 77809 38743."
                value={bannerConfig.message}
                onChange={(e) => setBannerConfig({ ...bannerConfig, message: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  lineHeight: '1.5',
                }}
              />
            </div>

            {/* Action Button Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row-2">
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                  Button Text (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Reserve Table or View Menu"
                  value={bannerConfig.linkText || ''}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, linkText: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                  Button Link / URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. #/contact, #/menu, or https://wa.me/917780938743"
                  value={bannerConfig.linkUrl || ''}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, linkUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Banner Color Style */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>
                Banner Color Theme
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'gold', label: '✨ Champagne Gold', gradient: 'linear-gradient(90deg, #9e7938, #e2be6c)' },
                  { id: 'green', label: '🌿 Forest Luxury Green', gradient: 'linear-gradient(90deg, #06150e, #113122)' },
                  { id: 'dark', label: '🖤 Obsidian Dark Slate', gradient: 'linear-gradient(90deg, #050505, #16181b)' },
                ].map((thm) => (
                  <label
                    key={thm.id}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '10px',
                      background: thm.gradient,
                      color: thm.id === 'gold' ? '#070e0a' : '#f3f8f5',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      border: bannerConfig.variant === thm.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                      boxShadow: bannerConfig.variant === thm.id ? '0 0 12px rgba(197, 160, 89, 0.5)' : 'none',
                    }}
                  >
                    <input
                      type="radio"
                      name="bannerVariant"
                      checked={bannerConfig.variant === thm.id}
                      onChange={() => setBannerConfig({ ...bannerConfig, variant: thm.id as any })}
                      style={{ accentColor: '#ffffff' }}
                    />
                    {thm.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>
                Live Preview:
              </span>
              <div
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  background:
                    bannerConfig.variant === 'green'
                      ? 'linear-gradient(90deg, #06150e 0%, #113122 50%, #06150e 100%)'
                      : bannerConfig.variant === 'dark'
                      ? 'linear-gradient(90deg, #050505 0%, #16181b 50%, #050505 100%)'
                      : 'linear-gradient(90deg, #9e7938 0%, #e2be6c 50%, #9e7938 100%)',
                  color: bannerConfig.variant === 'gold' ? '#070e0a' : '#f3f8f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      padding: '0.15rem 0.5rem',
                      background: 'rgba(0,0,0,0.25)',
                      borderRadius: '15px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: bannerConfig.variant === 'gold' ? '#070e0a' : 'var(--accent-gold)',
                    }}
                  >
                    📢 Announcement
                  </span>
                  <span>{bannerConfig.message || 'Announcement message preview...'}</span>
                </div>
                {bannerConfig.linkText && (
                  <span
                    style={{
                      padding: '0.2rem 0.65rem',
                      background: bannerConfig.variant === 'gold' ? '#070e0a' : 'var(--accent-gold)',
                      color: bannerConfig.variant === 'gold' ? '#c5a059' : '#040906',
                      borderRadius: '15px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {bannerConfig.linkText}
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.9rem', marginTop: '1rem', gap: '0.5rem' }}>
              <Megaphone size={16} />
              Save Broadcast Banner Live
            </button>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SETTINGS & SECURITY
      ========================================================================= */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Real-Time Cloudflare / Remote Sync Status */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 2.5rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  ⚡ Real-Time Cloud Database & Global Sync
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Ensures menu updates, dish photos, prices, and announcements sync globally across all customers' phones and computers in real time.
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  setSyncLoading(true);
                  const res = await menuService.syncWithRemote();
                  setSyncLoading(false);
                  if (res.success) {
                    setSyncMessage(`✅ Synced live (${res.menuCount} dishes active).`);
                  } else {
                    setSyncMessage('ℹ️ High-performance Local Cache active. All updates render instantaneously.');
                  }
                  setTimeout(() => setSyncMessage(''), 5000);
                }}
                className="btn-primary"
                style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                disabled={syncLoading}
              >
                {syncLoading ? 'Syncing...' : '🔄 Sync Database'}
              </button>
            </div>

            {syncMessage && (
              <div
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid #22c55e',
                  color: '#22c55e',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                }}
              >
                {syncMessage}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Custom Worker / API Endpoint (Optional)
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Optional: Enter custom Cloudflare Worker or backend URL..."
                  value={apiEndpointInput}
                  onChange={(e) => setApiEndpointInput(e.target.value)}
                  style={{
                    flexGrow: 1,
                    minWidth: '280px',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    menuService.setApiEndpoint(apiEndpointInput);
                    setSyncMessage('Endpoint saved.');
                    menuService.syncWithRemote();
                    setTimeout(() => setSyncMessage(''), 4000);
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.25rem' }}
                >
                  Save Endpoint
                </button>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Auto-configured: Amberleaf caches all dishes and announcements in local storage with automatic fallback for 100% offline uptime.
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="admin-grid-2">
            {/* Change Passcode */}
            <div
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
              }}
            >
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Change Admin Passcode
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Update the secret passcode used to access this management dashboard.
              </p>

              {passcodeMessage && (
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid #22c55e',
                    color: '#22c55e',
                    borderRadius: '10px',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  {passcodeMessage}
                </div>
              )}

              {passcodeError && (
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid #ef4444',
                    color: '#ef4444',
                    borderRadius: '10px',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  {passcodeError}
                </div>
              )}

              <form onSubmit={handleChangePasscode} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current passcode..."
                    value={currentPasscodeInput}
                    onChange={(e) => setCurrentPasscodeInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    New Passcode (min 4 characters)
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new passcode..."
                    value={newPasscodeInput}
                    onChange={(e) => setNewPasscodeInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Re-type new passcode..."
                    value={confirmPasscodeInput}
                    onChange={(e) => setConfirmPasscodeInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem', gap: '0.4rem' }}>
                  <Lock size={15} />
                  Update Passcode
                </button>
              </form>
            </div>

            {/* Menu Backup & Information */}
            <div
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Menu Data Backup & Export
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Download your entire current menu as a JSON backup file, or export it to share with culinary staff.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', `amberleaf_menu_backup_${new Date().toISOString().slice(0, 10)}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.8rem', width: '100%', gap: '0.5rem' }}
                >
                  <Download size={16} />
                  Export Menu Backup (JSON)
                </button>

                <button
                  onClick={handleResetMenu}
                  style={{
                    padding: '0.8rem',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#ef4444',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    marginTop: '0.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <RotateCcw size={15} />
                  Reset All Dishes to Factory Defaults
                </button>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(197, 160, 89, 0.05)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  marginTop: 'auto',
                }}
              >
                <strong style={{ color: 'var(--accent-gold)' }}>💡 Quick Tip for the Amberleaf Manager:</strong>
                <p style={{ margin: '0.4rem 0 0 0', lineHeight: '1.5' }}>
                  Any dish you edit or photo you upload is instantly saved and rendered live on your website. When you are on your smartphone or iPad at the restaurant, you can take a photo of any fresh plate and upload it right here!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT DISH
      ========================================================================= */}
      {editingItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingItem(null);
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '2rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                Edit Dish: {editingItem.name}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.4rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {editSuccess && (
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle2 size={16} />
                <span>{editSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1rem' }} className="form-row-2">
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Dish Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                  }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Edit Photo */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Update Photo (Upload File or Edit Path)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <img
                    src={editImagePreview || editingItem.image || './images/g1.jpg'}
                    alt="Dish thumbnail"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(197, 160, 89, 0.1)',
                      border: '1.5px dashed var(--accent-gold)',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Upload size={14} />
                    Upload New Photo
                    <input type="file" accept="image/*" onChange={handleEditImageFile} style={{ display: 'none' }} />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Image path or URL..."
                  value={editingItem.image || ''}
                  onChange={(e) => {
                    setEditingItem({ ...editingItem, image: e.target.value });
                    setEditImagePreview(e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.isChefsPick)}
                    onChange={(e) => setEditingItem({ ...editingItem, isChefsPick: e.target.checked })}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>✦ Chef's Pick</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.isSignature)}
                    onChange={(e) => setEditingItem({ ...editingItem, isSignature: e.target.checked })}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>Signature Dish</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.isPopular)}
                    onChange={(e) => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>Popular</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.isVegetarian)}
                    onChange={(e) => setEditingItem({ ...editingItem, isVegetarian: e.target.checked })}
                    style={{ accentColor: '#22c55e' }}
                  />
                  <span style={{ color: editingItem.isVegetarian ? '#22c55e' : 'inherit' }}>Vegetarian</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '0.85rem' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.85rem' }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled Responsive Classes */}
      <style>{`
        @media (max-width: 860px) {
          .admin-grid-2 {
            grid-template-columns: 1fr !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
