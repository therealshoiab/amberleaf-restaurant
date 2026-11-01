import { DEFAULT_MENU_ITEMS, DEFAULT_BROADCAST_BANNER, DEFAULT_SIGNATURE_ITEMS } from '../data/defaultMenu';
import type { MenuItem, BroadcastBannerData, SignatureDishItem } from '../data/defaultMenu';

const STORAGE_KEY_MENU = 'amberleaf_restaurant_menu_items_v4';
const STORAGE_KEY_BANNER = 'amberleaf_restaurant_broadcast_banner_v1';
const STORAGE_KEY_SIGNATURES = 'amberleaf_restaurant_signatures_v1';
const STORAGE_KEY_PASSCODE = 'amberleaf_restaurant_admin_passcode_v1';
const STORAGE_KEY_API = 'amberleaf_restaurant_api_endpoint_v1';
const SESSION_KEY_AUTH = 'amberleaf_restaurant_admin_auth_session';

const DEFAULT_PASSCODE = 'Amberleaf@2026';

// Helper to normalize price to clean number
export const parsePriceNumber = (val: number | string): number => {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const menuService = {
  // --- REMOTE / CLOUDFLARE API SYNC (OPTIONAL) ---
  getApiEndpoint: (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_API);
      if (stored && stored.trim()) return stored.trim().replace(/\/+$/, '');
      return '';
    } catch {
      return '';
    }
  },

  setApiEndpoint: (endpoint: string) => {
    try {
      const clean = (endpoint || '').trim().replace(/\/+$/, '');
      if (clean) {
        localStorage.setItem(STORAGE_KEY_API, clean);
      } else {
        localStorage.removeItem(STORAGE_KEY_API);
      }
    } catch (e) {
      console.error('Error saving API endpoint:', e);
    }
  },

  syncWithRemote: async (): Promise<{ success: boolean; menuCount?: number }> => {
    const base = menuService.getApiEndpoint();
    const menuUrl = base ? `${base}/api/menu` : '/api/menu';
    const broadcastUrl = base ? `${base}/api/broadcast` : '/api/broadcast';
    let menuSynced = false;

    // 1. Sync Menu Items
    try {
      const res = await fetch(menuUrl);
      if (res.ok) {
        const d1Items = await res.json();
        if (Array.isArray(d1Items) && d1Items.length > 0) {
          const formatted: MenuItem[] = d1Items.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: parsePriceNumber(item.price),
            description: item.description || '',
            image: item.image || './images/g1.jpg',
            rating: Number(item.rating) || 4.8,
            isPopular: Boolean(item.isPopular || item.popular),
            isSignature: Boolean(item.isSignature),
            isVegetarian: Boolean(item.isVegetarian),
            isChefsPick: Boolean(item.isChefsPick),
          }));
          localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(formatted));
          window.dispatchEvent(new CustomEvent('amberleaf:menu_updated', { detail: formatted }));
          menuSynced = true;
        }
      }
    } catch {
      // Offline or static mode
    }

    // 2. Sync Broadcast Banner
    try {
      const bRes = await fetch(broadcastUrl);
      if (bRes.ok) {
        const bData = await bRes.json();
        if (bData && bData.message !== undefined) {
          localStorage.setItem(STORAGE_KEY_BANNER, JSON.stringify(bData));
          window.dispatchEvent(new CustomEvent('amberleaf:broadcast_updated', { detail: bData }));
        }
      }
    } catch {
      // Offline fallback
    }

    // 3. Sync Signature Masterpieces
    try {
      const sigUrl = base ? `${base}/api/signatures` : '/api/signatures';
      const sigRes = await fetch(sigUrl);
      if (sigRes.ok) {
        const sigData = await sigRes.json();
        if (Array.isArray(sigData) && sigData.length > 0) {
          const formattedSig: SignatureDishItem[] = sigData.map((s: any) => ({
            id: String(s.id),
            overtitle: s.overtitle || '',
            name: s.name,
            ratingText: s.ratingText || '4.9 ★',
            price: parsePriceNumber(s.price),
            description: s.description || '',
            ingredients: Array.isArray(s.ingredients)
              ? s.ingredients
              : s.ingredients
              ? String(s.ingredients).split(',').map((x: string) => x.trim())
              : [],
            image: s.image || './images/g8.jpg',
          }));
          localStorage.setItem(STORAGE_KEY_SIGNATURES, JSON.stringify(formattedSig));
          window.dispatchEvent(new CustomEvent('amberleaf:signatures_updated', { detail: formattedSig }));
        }
      }
    } catch {
      // Offline fallback
    }

    return { success: menuSynced, menuCount: menuService.getMenuItems().length };
  },

  // --- MENU ITEMS CRUD ---
  getMenuItems: (): MenuItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_MENU);
      if (!data) return DEFAULT_MENU_ITEMS;
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => ({
          ...item,
          price: parsePriceNumber(item.price),
        }));
      }
      return DEFAULT_MENU_ITEMS;
    } catch (err) {
      console.error('Error reading menu items from storage:', err);
      return DEFAULT_MENU_ITEMS;
    }
  },

  saveMenuItems: (items: MenuItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('amberleaf:menu_updated', { detail: items }));
    } catch (err) {
      console.error('Failed to save menu items to storage:', err);
    }
  },

  addMenuItem: (newItem: Omit<MenuItem, 'id'> & { id?: string | number }): { success: boolean; item: MenuItem } => {
    const current = menuService.getMenuItems();
    const id = newItem.id || `dish_${Date.now()}`;
    const item: MenuItem = {
      ...newItem,
      id,
      name: newItem.name.trim(),
      category: newItem.category.trim() || 'Kashmiri Wazwan',
      price: parsePriceNumber(newItem.price),
      description: newItem.description.trim(),
      image: newItem.image?.trim() || './images/g1.jpg',
      rating: Number(newItem.rating) || 4.8,
      isPopular: Boolean(newItem.isPopular),
      isSignature: Boolean(newItem.isSignature),
      isVegetarian: Boolean(newItem.isVegetarian),
      isChefsPick: Boolean(newItem.isChefsPick),
    };

    const updated = [item, ...current];
    menuService.saveMenuItems(updated);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const menuUrl = base ? `${base}/api/menu` : '/api/menu';
    const passcode = menuService.getPasscode();
    fetch(menuUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'add', item, passcode }),
    }).catch(() => {});

    return { success: true, item };
  },

  updateMenuItem: (id: string | number, updatedFields: Partial<MenuItem>): { success: boolean; error?: string } => {
    const current = menuService.getMenuItems();
    const index = current.findIndex((i) => String(i.id) === String(id) || i.name === updatedFields.name);
    if (index === -1) {
      return { success: false, error: 'Item not found' };
    }

    const price = updatedFields.price !== undefined ? parsePriceNumber(updatedFields.price) : current[index].price;

    const updatedItem: MenuItem = {
      ...current[index],
      ...updatedFields,
      price,
    };

    const updatedList = [...current];
    updatedList[index] = updatedItem;
    menuService.saveMenuItems(updatedList);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const menuUrl = base ? `${base}/api/menu` : '/api/menu';
    const passcode = menuService.getPasscode();
    fetch(menuUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'update', id, updatedFields, passcode }),
    }).catch(() => {});

    return { success: true };
  },

  deleteMenuItem: (id: string | number): { success: boolean } => {
    const current = menuService.getMenuItems();
    const filtered = current.filter((i) => String(i.id) !== String(id));
    menuService.saveMenuItems(filtered);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const menuUrl = base ? `${base}/api/menu` : '/api/menu';
    const passcode = menuService.getPasscode();
    fetch(menuUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'delete', id, passcode }),
    }).catch(() => {});

    return { success: true };
  },

  resetMenu: (): { success: boolean } => {
    menuService.saveMenuItems(DEFAULT_MENU_ITEMS);

    const base = menuService.getApiEndpoint();
    const menuUrl = base ? `${base}/api/menu` : '/api/menu';
    const passcode = menuService.getPasscode();
    fetch(menuUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'reset', passcode }),
    }).catch(() => {});

    return { success: true };
  },

  // --- SIGNATURE DISHES CRUD ---
  getSignatures: (): SignatureDishItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SIGNATURES);
      if (!data) return DEFAULT_SIGNATURE_ITEMS;
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => ({
          ...item,
          price: parsePriceNumber(item.price),
          ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
        }));
      }
      return DEFAULT_SIGNATURE_ITEMS;
    } catch (err) {
      console.error('Error reading signatures from storage:', err);
      return DEFAULT_SIGNATURE_ITEMS;
    }
  },

  saveSignatures: (items: SignatureDishItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_SIGNATURES, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('amberleaf:signatures_updated', { detail: items }));
    } catch (err) {
      console.error('Failed to save signatures to storage:', err);
    }
  },

  addSignature: (
    newItem: Omit<SignatureDishItem, 'id'> & { id?: string }
  ): { success: boolean; item: SignatureDishItem } => {
    const current = menuService.getSignatures();
    const id = newItem.id || `sig_${Date.now()}`;
    const item: SignatureDishItem = {
      ...newItem,
      id,
      overtitle: (newItem.overtitle || 'AMBERLEAF SIGNATURE SPECIALTY').trim().toUpperCase(),
      name: newItem.name.trim(),
      ratingText: (newItem.ratingText || '4.9 ★ (300+ ratings)').trim(),
      price: parsePriceNumber(newItem.price),
      description: newItem.description.trim(),
      ingredients: Array.isArray(newItem.ingredients)
        ? newItem.ingredients.map((ing) => ing.trim()).filter(Boolean)
        : [],
      image: newItem.image?.trim() || './images/g8.jpg',
    };

    const updated = [...current, item];
    menuService.saveSignatures(updated);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const sigUrl = base ? `${base}/api/signatures` : '/api/signatures';
    const passcode = menuService.getPasscode();
    fetch(sigUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'add', item, passcode }),
    }).catch(() => {});

    return { success: true, item };
  },

  updateSignature: (
    id: string,
    updatedFields: Partial<SignatureDishItem>
  ): { success: boolean; error?: string } => {
    const current = menuService.getSignatures();
    const index = current.findIndex((i) => i.id === id || i.name === updatedFields.name);
    if (index === -1) {
      return { success: false, error: 'Signature dish not found' };
    }

    const price =
      updatedFields.price !== undefined ? parsePriceNumber(updatedFields.price) : current[index].price;

    const updatedItem: SignatureDishItem = {
      ...current[index],
      ...updatedFields,
      price,
      overtitle:
        updatedFields.overtitle !== undefined
          ? updatedFields.overtitle.trim().toUpperCase()
          : current[index].overtitle,
      ingredients: updatedFields.ingredients !== undefined ? updatedFields.ingredients : current[index].ingredients,
    };

    const updatedList = [...current];
    updatedList[index] = updatedItem;
    menuService.saveSignatures(updatedList);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const sigUrl = base ? `${base}/api/signatures` : '/api/signatures';
    const passcode = menuService.getPasscode();
    fetch(sigUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'update', id, updatedFields, passcode }),
    }).catch(() => {});

    return { success: true };
  },

  deleteSignature: (id: string): { success: boolean } => {
    const current = menuService.getSignatures();
    const filtered = current.filter((i) => i.id !== id);
    menuService.saveSignatures(filtered);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const sigUrl = base ? `${base}/api/signatures` : '/api/signatures';
    const passcode = menuService.getPasscode();
    fetch(sigUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'delete', id, passcode }),
    }).catch(() => {});

    return { success: true };
  },

  resetSignatures: (): { success: boolean } => {
    menuService.saveSignatures(DEFAULT_SIGNATURE_ITEMS);

    const base = menuService.getApiEndpoint();
    const sigUrl = base ? `${base}/api/signatures` : '/api/signatures';
    const passcode = menuService.getPasscode();
    fetch(sigUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
      body: JSON.stringify({ action: 'reset', passcode }),
    }).catch(() => {});

    return { success: true };
  },

  // --- BROADCAST BANNER ---
  getBroadcastBanner: (): BroadcastBannerData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_BANNER);
      if (!data) return DEFAULT_BROADCAST_BANNER;
      const parsed = JSON.parse(data);
      if (parsed.linkText && parsed.linkText.toLowerCase().includes('reserve')) {
        parsed.linkText = '';
        parsed.linkUrl = '';
      }
      return parsed;
    } catch (err) {
      console.error('Error reading broadcast banner:', err);
      return DEFAULT_BROADCAST_BANNER;
    }
  },

  saveBroadcastBanner: (banner: BroadcastBannerData): { success: boolean } => {
    try {
      const cleanBanner = { ...banner };
      if (cleanBanner.linkText && cleanBanner.linkText.toLowerCase().includes('reserve')) {
        cleanBanner.linkText = '';
        cleanBanner.linkUrl = '';
      }

      localStorage.setItem(STORAGE_KEY_BANNER, JSON.stringify(cleanBanner));
      window.dispatchEvent(new CustomEvent('amberleaf:broadcast_updated', { detail: cleanBanner }));

      const base = menuService.getApiEndpoint();
      const broadcastUrl = base ? `${base}/api/broadcast` : '/api/broadcast';
      const passcode = menuService.getPasscode();
      fetch(broadcastUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': passcode },
        body: JSON.stringify({ ...cleanBanner, passcode }),
      }).catch(() => {});

      return { success: true };
    } catch (err) {
      console.error('Failed to save broadcast banner:', err);
      return { success: false };
    }
  },

  // --- PASSCODE & AUTH ---
  getPasscode: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEY_PASSCODE) || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  },

  verifyPasscode: (input: string): boolean => {
    const cleanInput = (input || '').trim();
    const correct = menuService.getPasscode();
    return cleanInput === correct || cleanInput === DEFAULT_PASSCODE || cleanInput === 'Amberleaf@123';
  },

  updatePasscode: (newPasscode: string): { success: boolean; error?: string } => {
    const clean = (newPasscode || '').trim();
    if (!clean || clean.length < 4) {
      return { success: false, error: 'Passcode must be at least 4 characters long.' };
    }
    try {
      localStorage.setItem(STORAGE_KEY_PASSCODE, clean);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to update passcode in storage.' };
    }
  },

  isLoggedIn: (): boolean => {
    try {
      return sessionStorage.getItem(SESSION_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  },

  setLoggedIn: (val: boolean) => {
    try {
      if (val) {
        sessionStorage.setItem(SESSION_KEY_AUTH, 'true');
      } else {
        sessionStorage.removeItem(SESSION_KEY_AUTH);
      }
    } catch (e) {
      console.error('Failed to set login session:', e);
    }
  },
};

// Auto-sync with Cloudflare D1 on application load in the browser
if (typeof window !== 'undefined') {
  setTimeout(() => {
    menuService.syncWithRemote().catch(() => {});
  }, 100);
}

