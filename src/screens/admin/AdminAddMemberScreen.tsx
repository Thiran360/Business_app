import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform, Image } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { useAppContext } from '../../context/AppContext';
import { Member, MemberType } from '../../data/mockData';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AdminAddMemberScreen = () => {
  const { addMember, login, categories } = useAppContext();
  const navigation = useNavigation();
  
  const [memberType, setMemberType] = useState<'Business' | 'Expert'>('Business');
  
  const [name, setName] = useState('');
  const type: MemberType = 'Business';
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessLogo, setBusinessLogo] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');
  const [providedServices, setProvidedServices] = useState<string[]>(['']);
  
  const addServicePoint = () => setProvidedServices([...providedServices, '']);
  const updateServicePoint = (text: string, index: number) => {
    const newServices = [...providedServices];
    newServices[index] = text;
    setProvidedServices(newServices);
  };
  const removeServicePoint = (index: number) => {
    const newServices = [...providedServices];
    newServices.splice(index, 1);
    if (newServices.length === 0) newServices.push('');
    setProvidedServices(newServices);
  };

  const [industry, setIndustry] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [location, setLocation] = useState('');
  const [ownerPhoto, setOwnerPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const handleSubmit = () => {
    if (!name || !designation || !companyName || !industry || !location || !email || !phone) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newId = Math.random().toString(36).substring(2, 10);
    const newMember: Member = {
      id: newId,
      name,
      type,
      designation,
      experience: '1 Year',
      achievements: ['New Member'],
      photo: ownerPhoto || '',
      industry,
      location,
      socialMedia: {
        website: website || undefined,
        instagram: instagram || undefined,
        facebook: facebook || undefined,
        whatsapp: whatsapp || undefined,
        phone: phone || undefined,
        email: email || undefined,
      },
      reviews: { rating: 5, count: 1 },
      company: {
        name: companyName,
        logo: businessLogo || `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&auto=format&fit=crop&q=80`,
        category: industry,
        services: providedServices.map(s => s.trim()).filter(Boolean),
        products: [],
        foundedYear: new Date().getFullYear().toString(),
        website: website || `www.${companyName.replace(/\s+/g, '').toLowerCase()}.com`,
        contactInfo: `${email} | ${phone}`,
        description: businessDetails,
      },
      isFeatured: false,
    };

    addMember(newMember);
    Alert.alert('Success', `Business profile created successfully!`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Header title="BSN Admin Portal" dark showBack onBackPress={() => login('user')} />
      <AdminTopNav />
      <KeyboardAwareScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
          <View style={styles.headerRow}>
            <Text style={styles.title}>Add Business</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name & Profile Photo</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
              <TouchableOpacity 
                style={styles.avatarUploadSmall}
                onPress={() => {
                  launchImageLibrary({ mediaType: 'photo' }, (response) => {
                    if (response.assets && response.assets.length > 0) {
                      setOwnerPhoto(response.assets[0].uri || '');
                    }
                  });
                }}
              >
                {ownerPhoto ? (
                  <Image source={{ uri: ownerPhoto }} style={styles.avatarPreviewSmall} />
                ) : (
                  <View style={styles.avatarPlaceholderSmall}>
                    <Icon name="camera" size={20} color={colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
              <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={name} onChangeText={setName} placeholder="Owner Full Name" placeholderTextColor="#666666" />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Designation</Text>
            <TextInput style={styles.input} value={designation} onChangeText={setDesignation} placeholder="e.g. CEO, Founder" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="Company or Business Name" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Logo</Text>
            <TouchableOpacity 
              style={styles.imageUploadBox}
              onPress={() => {
                launchImageLibrary({ mediaType: 'photo' }, (response) => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                  } else if (response.assets && response.assets.length > 0) {
                    setBusinessLogo(response.assets[0].uri || '');
                  }
                });
              }}
              activeOpacity={0.8}
            >
              {businessLogo ? (
                <View style={styles.uploadedImageContainer}>
                  <Image source={{ uri: businessLogo }} style={styles.uploadedImage} />
                  <View style={styles.changeImageOverlay}>
                    <Icon name="camera" size={20} color="#FFFFFF" />
                  </View>
                </View>
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <View style={styles.iconCircle}>
                    <Icon name="image" size={28} color={colors.primary} />
                  </View>
                  <Text style={styles.uploadText}>Tap to upload from Gallery</Text>
                  <Text style={styles.uploadSubtext}>JPG, PNG or GIF (Max 2MB)</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Details</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              value={businessDetails} 
              onChangeText={setBusinessDetails} 
              placeholder="Describe what the business does" 
              placeholderTextColor="#666666" 
              multiline 
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>What We Provide (Services/Products)</Text>
            {providedServices.map((service, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <TextInput 
                  style={[styles.input, { flex: 1, marginBottom: 0 }]} 
                  value={service} 
                  onChangeText={(text) => updateServicePoint(text, index)} 
                  placeholder={`Point ${index + 1}`} 
                  placeholderTextColor="#666666" 
                />
                <TouchableOpacity onPress={() => removeServicePoint(index)} style={{ padding: spacing.sm }}>
                  <Icon name="x" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addPointBtn} onPress={addServicePoint}>
              <Icon name="plus" size={16} color={colors.primary} />
              <Text style={styles.addPointText}>Add Point</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Industry Category</Text>
            <TouchableOpacity 
              style={[
                styles.input, 
                { justifyContent: 'center', flexDirection: 'row', alignItems: 'center' },
                showCategoryDropdown && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
              ]} 
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              activeOpacity={0.8}
            >
              <Text style={{ flex: 1, color: industry ? colors.text : '#666666' }}>
                {industry || "Select Industry Category"}
              </Text>
              <Icon name={showCategoryDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666666" />
            </TouchableOpacity>
            
            {showCategoryDropdown && (
              <View style={styles.dropdownContainer}>
                {categories.map(cat => (
                  <TouchableOpacity 
                    key={cat} 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setIndustry(cat);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, industry === cat && styles.dropdownItemTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.customCategoryInputContainer}>
                  <TextInput 
                    style={styles.customCategoryInput}
                    placeholder="Or type a custom category..."
                    placeholderTextColor="#999"
                    value={!categories.includes(industry) && industry ? industry : ''}
                    onChangeText={(text) => {
                      setIndustry(text);
                    }}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="City, State" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Gmail (Email)</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email Address" placeholderTextColor="#666666" keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>WhatsApp Number (Optional)</Text>
            <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} placeholder="WhatsApp Number" placeholderTextColor="#666666" keyboardType="phone-pad" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number (For Call)</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Direct Call Number" placeholderTextColor="#666666" keyboardType="phone-pad" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Website (Optional)</Text>
            <TextInput style={styles.input} value={website} onChangeText={setWebsite} placeholder="e.g. solutions.com" placeholderTextColor="#666666" autoCapitalize="none" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Instagram Link (Optional)</Text>
            <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} placeholder="Instagram Profile URL" placeholderTextColor="#666666" autoCapitalize="none" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Facebook Link (Optional)</Text>
            <TextInput style={styles.input} value={facebook} onChangeText={setFacebook} placeholder="Facebook Profile URL" placeholderTextColor="#666666" autoCapitalize="none" />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Add Business</Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: spacing.xs,
    marginRight: spacing.md,
  },
  topHeaderTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  logoutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  logoutBtnText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: typography.sizes.sm,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 50,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  imageUploadBox: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  uploadText: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  uploadedImageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changeImageOverlay: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    padding: 8,
    borderRadius: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  typeBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeBtnText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  avatarUploadSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  avatarPlaceholderSmall: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPreviewSmall: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addPointBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: 4,
  },
  addPointText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: '600',
  },
  categoryBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  categoryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryBtnText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryBtnTextActive: {
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.surface,
    marginTop: -8,
    paddingTop: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  dropdownItemTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  customCategoryInputContainer: {
    padding: spacing.sm,
    backgroundColor: '#F8FAFC',
  },
  customCategoryInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    height: 40,
    backgroundColor: '#FFFFFF',
    fontSize: typography.sizes.sm,
  },
});
