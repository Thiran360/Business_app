export const colors = {
  primary: '#0F2027', // Deep Navy
  secondary: '#203A43',
  accent: '#D4AF37', // Gold
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#121212',
  textSecondary: '#6C757D',
  border: '#E9ECEF',
  success: '#28A745',
  error: '#DC3545',
};

export const typography = {
  fontFamily: {
    regular: 'System', // React Native will map this to Roboto on Android, SF Pro on iOS
    medium: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export const getIndustryStyle = (industry: string) => {
  const normalized = industry.toLowerCase();
  
  if (normalized.includes('construct') || normalized.includes('engin') || normalized.includes('build')) 
    return { icon: 'pen-tool', color: '#FF9800', bg: '#FFF3E0' };
  if (normalized.includes('manufactur') || normalized.includes('industr') || normalized.includes('factory')) 
    return { icon: 'settings', color: '#607D8B', bg: '#ECEFF1' };
  if (normalized.includes('agricul') || normalized.includes('farm')) 
    return { icon: 'sun', color: '#4CAF50', bg: '#E8F5E9' };
  if (normalized.includes('auto') || normalized.includes('car') || normalized.includes('vehicle')) 
    return { icon: 'truck', color: '#F44336', bg: '#FFEBEE' };
  if (normalized.includes('transport') || normalized.includes('logistic') || normalized.includes('ship')) 
    return { icon: 'navigation', color: '#2196F3', bg: '#E3F2FD' };
  if (normalized.includes('tech') || normalized.includes('soft') || normalized.includes('it') || normalized.includes('solution')) 
    return { icon: 'cpu', color: '#9C27B0', bg: '#F3E5F5' };
  if (normalized.includes('trade') || normalized.includes('whole')) 
    return { icon: 'package', color: '#795548', bg: '#EFEBE9' };
  if (normalized.includes('fashion') || normalized.includes('beaut') || normalized.includes('salon') || normalized.includes('cloth')) 
    return { icon: 'scissors', color: '#E91E63', bg: '#FCE4EC' };
  if (normalized.includes('food') || normalized.includes('cater') || normalized.includes('restaurant') || normalized.includes('cafe')) 
    return { icon: 'coffee', color: '#FFB300', bg: '#FFF8E1' };
  if (normalized.includes('handicraft') || normalized.includes('art') || normalized.includes('craft')) 
    return { icon: 'feather', color: '#00BCD4', bg: '#E0F7FA' };
  if (normalized.includes('health') || normalized.includes('medic') || normalized.includes('clinic') || normalized.includes('hospital')) 
    return { icon: 'heart', color: '#F44336', bg: '#FFEBEE' };
  if (normalized.includes('edu') || normalized.includes('train') || normalized.includes('school') || normalized.includes('college')) 
    return { icon: 'book-open', color: '#3F51B5', bg: '#E8EAF6' };
  if (normalized.includes('e-comm') || normalized.includes('shop') || normalized.includes('store') || normalized.includes('retail')) 
    return { icon: 'shopping-cart', color: '#009688', bg: '#E0F2F1' };
  if (normalized.includes('finance') || normalized.includes('bank') || normalized.includes('invest') || normalized.includes('account')) 
    return { icon: 'dollar-sign', color: '#4CAF50', bg: '#E8F5E9' };
  if (normalized.includes('consult')) 
    return { icon: 'pie-chart', color: '#3F51B5', bg: '#E8EAF6' };
  if (normalized.includes('market') || normalized.includes('adver') || normalized.includes('pr')) 
    return { icon: 'trending-up', color: '#E91E63', bg: '#FCE4EC' };
  if (normalized.includes('real estate') || normalized.includes('property') || normalized.includes('home')) 
    return { icon: 'home', color: '#00BCD4', bg: '#E0F7FA' };
  if (normalized === 'all') 
    return { icon: 'grid', color: colors.primary, bg: '#F0F0F0' };

  // Fallback
  return { icon: 'briefcase', color: colors.primary, bg: '#E3F2FD' };
};
