import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { useAppContext } from '../../context/AppContext';
import { Member, MemberType } from '../../data/mockData';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AdminCreateUserScreen = () => {
  const { addMember, login } = useAppContext();
  const navigation = useNavigation<any>();
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const handleSubmit = () => {
    if (!name || !password || !phone || !address) {
      Alert.alert('Error', 'Please fill in Full Name, Phone Number, Address, and Password.');
      return;
    }

    const newId = Math.random().toString(36).substring(2, 10);
    const newMember: Member = {
      id: newId,
      name,
      type: 'Startup',
      designation: 'User',
      experience: '0 Years',
      achievements: ['New User'],
      photo: '',
      industry: 'Various',
      location: address,
      socialMedia: {
        phone: phone,
      },
      reviews: { rating: 5, count: 1 },
      company: {
        name: 'Independent',
        logo: `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&auto=format&fit=crop&q=80`,
        category: 'Various',
        services: [],
        products: [],
        foundedYear: new Date().getFullYear().toString(),
        website: '',
        contactInfo: phone,
        description: '',
      },
      isFeatured: false,
    };

    addMember(newMember);
    Alert.alert('Success', `User account created successfully!`, [
      { text: 'OK', onPress: () => {
        setName('');
        setPassword('');
        setPhone('');
        setAddress('');
      } }
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
            <Text style={styles.title}>Create User Account</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="User's Full Name" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Primary Contact Number" placeholderTextColor="#666666" keyboardType="phone-pad" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="User's Address" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Secure Password" placeholderTextColor="#666666" secureTextEntry autoCapitalize="none" />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Create Account</Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
  },
});
