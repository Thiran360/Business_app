import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { useAppContext } from '../../context/AppContext';

export const AdminAnnouncementsScreen = () => {
  const navigation = useNavigation();
  const { login, announcements, addAnnouncement, removeAnnouncement } = useAppContext();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handlePost = () => {
    if (!title || !message) {
      Alert.alert('Error', 'Please enter a title and message.');
      return;
    }
    
    addAnnouncement({ id: Date.now().toString(), title, content: message, date: 'Just now', image: imageUri || undefined });
    setTitle('');
    setMessage('');
    setImageUri('');
    Alert.alert('Success', 'Announcement posted successfully!');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Announcement', 'Are you sure you want to delete this announcement?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeAnnouncement(id) }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Header title="BSN Admin Portal" dark showBack onBackPress={() => login('user')} />
      <AdminTopNav />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.composeBox}>
          <Text style={styles.sectionTitle}>New Announcement</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Announcement Title"
            placeholderTextColor="#666666"
            value={title}
            onChangeText={setTitle}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Type your message here..."
            placeholderTextColor="#666666"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={styles.imageUploadBtn}
            onPress={() => {
              launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.assets && response.assets.length > 0) {
                  setImageUri(response.assets[0].uri || '');
                }
              });
            }}
          >
            <Icon name="image" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.imageUploadText}>{imageUri ? 'Change Image' : 'Upload Image (Optional)'}</Text>
          </TouchableOpacity>

          {imageUri ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeImageBtn} onPress={() => setImageUri('')}>
                <Icon name="x" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : null}
          
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Icon name="send" size={16} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.postBtnText}>Post Announcement</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Recent Announcements</Text>
        
        {announcements.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.date}>{item.date}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 4, marginLeft: 8 }}>
                  <Icon name="trash-2" size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.announcementImage} />
            )}
            <Text style={styles.content}>{item.content}</Text>
          </View>
        ))}

      </ScrollView>
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
    padding: spacing.lg,
  },
  composeBox: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 48,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.background,
    marginBottom: spacing.md,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.md,
  },
  postBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: typography.sizes.md,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  date: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  content: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  imageUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  imageUploadText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: typography.sizes.sm,
  },
  previewContainer: {
    position: 'relative',
    marginBottom: spacing.md,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 12,
  },
  announcementImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: spacing.sm,
    resizeMode: 'cover',
  },
});
