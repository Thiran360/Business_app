import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, Modal } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { useAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from 'react-native-calendars';

export const AdminAddEventScreen = () => {
  const { addEvent, login } = useAppContext();
  const navigation = useNavigation();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Networking');
  const [image, setImage] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = () => {
    if (!title || !date || !location) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newId = Math.random().toString(36).substring(2, 10);
    const newEvent = {
      id: newId,
      title,
      date,
      location,
      type,
      image: image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    };

    addEvent(newEvent);
    Alert.alert('Success', 'Event added successfully!', [
      { text: 'OK', onPress: () => {
          setTitle('');
          setDate('');
          setLocation('');
          setImage('');
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
            <Text style={styles.title}>Create Event</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Banner Image</Text>
            <TouchableOpacity 
              style={styles.imageUploadBox}
              onPress={() => {
                launchImageLibrary({ mediaType: 'photo' }, (response) => {
                  if (response.assets && response.assets.length > 0) {
                    setImage(response.assets[0].uri || '');
                  }
                });
              }}
              activeOpacity={0.8}
            >
              {image ? (
                <View style={styles.uploadedImageContainer}>
                  <Image source={{ uri: image }} style={styles.uploadedImage} />
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
            <Text style={styles.label}>Event Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Annual Tech Summit" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Date</Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <View pointerEvents="none">
                <TextInput style={styles.input} value={date} placeholder="e.g. 2026-11-15" placeholderTextColor="#666666" editable={false} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. Virtual or Chennai Trade Centre" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Type</Text>
            <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="e.g. Networking, Workshop" placeholderTextColor="#666666" />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Add Event</Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day: any) => {
                setDate(day.dateString);
                setShowCalendar(false);
              }}
              theme={{
                selectedDayBackgroundColor: colors.primary,
                todayTextColor: colors.primary,
                arrowColor: colors.primary,
              }}
            />
            <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: colors.primary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.md,
    overflow: 'hidden',
  },
  closeBtn: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  closeBtnText: {
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
});
