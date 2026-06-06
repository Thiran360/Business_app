import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { useAppContext } from '../../context/AppContext';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigation = useNavigation<any>();
  const { login } = useAppContext();

  const handleLogin = () => {
    if (isAdminMode) {
      login('admin');
    } else {
      login(email);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80' }}
      style={styles.bgImage}
    >
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            
            {/* Header Area */}
            <View style={styles.header}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>S</Text>
              </View>
              <Text style={styles.title}>BSN</Text>
              <Text style={styles.subtitle}>Business Excellence Network</Text>
            </View>

            {/* Form Area */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>{isAdminMode ? 'Admin Portal' : 'Welcome Back'}</Text>
              <Text style={styles.instructionText}>
                {isAdminMode ? 'Sign in to access admin dashboard' : 'Sign in to continue your journey'}
              </Text>

              <View style={styles.inputWrapper}>
                <Icon name="mail" size={20} color={colors.accent} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color={colors.accent} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
                <Text style={styles.loginBtnText}>{isAdminMode ? 'Sign In as Admin' : 'Sign In'}</Text>
                <Icon name="arrow-right" size={20} color={colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.adminToggleBtn} 
                onPress={() => setIsAdminMode(!isAdminMode)}
              >
                <Text style={styles.adminToggleText}>
                  {isAdminMode ? 'Switch to Member Login' : 'Admin Login'}
                </Text>
              </TouchableOpacity>


            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 15, 25, 0.85)', // Deep blue dark overlay
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl * 1.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.accent,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
  },
  welcomeText: {
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    height: '100%',
  },
  eyeBtn: {
    padding: spacing.xs,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xxl,
  },
  forgotText: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: colors.accent,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginBtnText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  adminToggleBtn: {
    alignSelf: 'center',
    marginBottom: spacing.xxl,
  },
  adminToggleText: {
    color: colors.accent,
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
  },

});
