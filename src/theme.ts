// Tema warna untuk aplikasi
export const theme = {
  colors: {
    primary: {
      light: '#E6F0FF',
      DEFAULT: '#1E4C94',
      dark: '#0D2B4D',
    },
    secondary: {
      light: '#F5F7FF',
      DEFAULT: '#361F75',
      dark: '#1A0F3A',
    },
    success: {
      light: '#E6F7ED',
      DEFAULT: '#10B981',
      dark: '#065F46',
    },
    warning: {
      light: '#FEF3C7',
      DEFAULT: '#F59E0B',
      dark: '#92400E',
    },
    danger: {
      light: '#FEE2E2',
      DEFAULT: '#EF4444',
      dark: '#B91C1C',
    },
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

// Status warna untuk kontraksi
export const getStatusColors = (urgencyLevel: 'normal' | 'warning' | 'urgent') => {
  switch (urgencyLevel) {
    case 'urgent':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-100',
        button: 'from-red-500 to-red-600',
        shadow: 'shadow-red-200',
        ring: 'ring-red-200'
      };
    case 'warning':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-100',
        button: 'from-amber-500 to-amber-600',
        shadow: 'shadow-amber-200',
        ring: 'ring-amber-200'
      };
    default:
      return {
        bg: 'bg-blue-50',
        text: 'text-[#1E4C94]',
        border: 'border-blue-100',
        button: 'from-[#1E4C94] to-[#361F75]',
        shadow: 'shadow-blue-200',
        ring: 'ring-blue-200'
      };
  }
}; 